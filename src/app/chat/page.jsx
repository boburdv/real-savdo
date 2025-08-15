"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const searchParams = useSearchParams();
  const selectedUserId = searchParams.get("user2"); // URL: /chat?user2=<receiver_id>

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (!user || !selectedUserId) return;

      // Avvalgi xabarlarni olish
      const { data } = await supabase.from("rlmessages").select("*").or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).order("created_at", { ascending: true });
      setMessages(data || []);

      // Realtime subscription
      const channel = supabase
        .channel("chat_room")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "rlmessages" }, (payload) => {
          const msg = payload.new;
          if (msg.sender_id === user.id || msg.receiver_id === user.id) {
            setMessages((prev) => [...prev, msg]);
          }
        })
        .subscribe();

      return () => supabase.removeChannel(channel);
    })();
  }, [selectedUserId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !selectedUserId) return;

    const { data, error } = await supabase.from("rlmessages").insert([
      {
        sender_id: user.id,
        receiver_id: selectedUserId,
        content: newMessage,
      },
    ]);

    if (!error && data?.[0]) {
      setMessages((prev) => [...prev, data[0]]);
      setNewMessage("");
    } else if (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <div className="border h-96 p-2 overflow-y-scroll">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.sender_id === user?.id ? "text-right" : "text-left"}>
            <strong>{msg.sender_id === user?.id ? "Siz" : "U"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Xabar yozing..." />
        <Button onClick={handleSendMessage}>Yuborish</Button>
      </div>
    </div>
  );
}
