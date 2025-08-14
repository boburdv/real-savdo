"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const userId = "user1";

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      const { data } = await supabase.from("users").select("*");
      if (data) setUsers(data.filter((u) => u.id !== userId));
    };
    loadUsers();
    const userChannel = supabase
      .channel("online-status")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "users" }, (payload) => {
        const u = payload.new;
        setUsers((prev) => prev.map((p) => (p.id === u.id ? u : p)));
      })
      .subscribe();
    return () => supabase.removeChannel(userChannel);
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
    const loadMessages = async () => {
      const { data } = await supabase
        .from("rlmessages")
        .select("*")
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${selectedUser.id}),and(sender_id.eq.${selectedUser.id},receiver_id.eq.${userId})`)
        .order("created_at", { ascending: true });
      if (data) setMessages(data);
    };
    loadMessages();
    const msgChannel = supabase
      .channel("chat-room")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "rlmessages" }, (payload) => {
        const msg = payload.new;
        if ((msg.sender_id === userId && msg.receiver_id === selectedUser.id) || (msg.sender_id === selectedUser.id && msg.receiver_id === userId)) {
          setMessages((prev) => [...prev, msg]);
        }
      })
      .subscribe();
    return () => supabase.removeChannel(msgChannel);
  }, [selectedUser]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    await supabase.from("rlmessages").insert([{ sender_id: userId, receiver_id: selectedUser.id, content: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen max-w-6xl mx-auto border rounded-2xl overflow-hidden">
      <div className="hidden md:flex w-1/3 bg-gray-50 border-r overflow-y-auto flex-col">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user.id ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <div className={`w-10 h-10 rounded-full mr-3 ${user.online ? "bg-green-400" : "bg-gray-300"}`} />
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-gray-500">{user.online ? "Online" : "Offline"}</div>
            </div>
          </div>
        ))}
      </div>
      {!selectedUser && (
        <div className="flex flex-col w-full md:hidden bg-gray-50 overflow-y-auto">
          {users.map((user) => (
            <div key={user.id} className="flex items-center p-3 cursor-pointer hover:bg-gray-200" onClick={() => setSelectedUser(user)}>
              <div className={`w-10 h-10 rounded-full mr-3 ${user.online ? "bg-green-400" : "bg-gray-300"}`} />
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-gray-500">{user.online ? "Online" : "Offline"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedUser && (
        <div className="flex-1 flex flex-col bg-white">
          <div className="flex items-center p-3 border-b">
            <button className="md:hidden mr-3 font-semibold" onClick={() => setSelectedUser(null)}>
              ← Back
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
            <span className="font-semibold">{selectedUser.name}</span>
            <span className={`ml-2 w-2 h-2 rounded-full ${selectedUser.online ? "bg-green-400" : "bg-gray-400"}`} />
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3" ref={scrollRef}>
            {messages.map((msg) => {
              const isUser = msg.sender_id === userId;
              return (
                <div
                  key={msg.id}
                  className={`p-3 rounded-2xl max-w-[60%] text-sm break-words ${isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black mr-auto"}`}
                >
                  {msg.content}
                  <div className="text-[10px] text-gray-300 mt-1 text-right">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex p-3 border-t space-x-2">
            <Textarea
              className="flex-1 resize-none rounded-2xl border border-gray-300 focus:ring-1 focus:ring-blue-400 text-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={1}
              placeholder="Xabar yozing..."
            />
            <Button className="rounded-2xl px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold" onClick={sendMessage}>
              Yuborish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
