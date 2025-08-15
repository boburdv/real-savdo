"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatPage({ adId }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel("public:messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: `ad_id=eq.${adId}` }, (payload) => setMessages((prev) => [...prev, payload.new]))
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [adId]);

  async function fetchMessages() {
    const { data } = await supabase.from("messages").select("*").eq("ad_id", adId).order("created_at", { ascending: true });
    setMessages(data || []);
  }

  async function sendMessage() {
    if (!newMsg) return;
    await supabase.from("messages").insert([{ ad_id: adId, user_id: supabase.auth.getUser().then((r) => r.data.user.id), content: newMsg }]);
    setNewMsg("");
  }

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2 overflow-y-auto h-96 border p-2 rounded">
        {messages.map((m) => (
          <p key={m.id}>
            <strong>{m.user_id}</strong>: {m.content}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <Input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} placeholder="Xabar yozing..." />
        <Button onClick={sendMessage}>Yuborish</Button>
      </div>
    </div>
  );
}
