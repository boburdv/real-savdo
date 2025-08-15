"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Hozirgi foydalanuvchini olish
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Barcha foydalanuvchilar ro'yxatini olish
    supabase
      .from("auth.users")
      .select("id,email")
      .then(({ data }) => setUsers(data));
  }, []);

  useEffect(() => {
    if (!currentChatUser) return;

    // Chatni olish
    const fetchMessages = async () => {
      const { data } = await supabase.from("messages").select("*").or(`from.eq.${user.id},to.eq.${user.id}`).order("created_at", { ascending: true });
      setMessages(data.filter((msg) => msg.from === currentChatUser.id || msg.to === currentChatUser.id));
    };
    fetchMessages();

    // Realtime listener
    const subscription = supabase
      .channel("public:messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const msg = payload.new;
        if (msg.from === currentChatUser.id || msg.to === currentChatUser.id) {
          setMessages((prev) => [...prev, msg]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentChatUser, user]);

  const sendMessage = async () => {
    if (!input || !currentChatUser) return;
    await supabase.from("messages").insert([{ from: user.id, to: currentChatUser.id, text: input }]);
    setInput("");
  };

  return (
    <div className="flex h-screen">
      {/* Foydalanuvchilar paneli */}
      <div className="w-1/4 border-r overflow-y-auto p-2">
        {users.map((u) => (
          <Card key={u.id} className={`mb-2 cursor-pointer p-2 ${currentChatUser?.id === u.id ? "bg-gray-200" : ""}`} onClick={() => setCurrentChatUser(u)}>
            <CardContent>{u.email}</CardContent>
          </Card>
        ))}
      </div>

      {/* Chat paneli */}
      <div className="flex-1 flex flex-col p-4">
        {currentChatUser ? (
          <>
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((msg, i) => (
                <div key={i} className={`my-1 p-2 rounded max-w-xs ${msg.from === user.id ? "bg-blue-400 text-white self-end" : "bg-gray-200 self-start"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Xabar yozing..." />
              <Button onClick={sendMessage}>Yuborish</Button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-20">Chapdan foydalanuvchi tanlang</p>
        )}
      </div>
    </div>
  );
}
