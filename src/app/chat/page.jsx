"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

export default function ChatPage({ user }) {
  const searchParams = useSearchParams();
  const adId = searchParams.get("adId");

  const [ad, setAd] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // E'lon ma'lumotini olish
  useEffect(() => {
    if (!adId) return;

    async function fetchAd() {
      const { data, error } = await supabase.from("listings").select("*").eq("id", adId).single();
      if (!error && data) setAd(data);
    }
    fetchAd();
  }, [adId]);

  // Xabarlarni olish va real-time subscription
  useEffect(() => {
    if (!ad) return;

    async function fetchMessages() {
      const { data, error } = await supabase.from("messages").select("*").eq("ad_id", ad.id).order("created_at", { ascending: true });

      setMessages(data || []);
    }
    fetchMessages();

    const subscription = supabase
      .channel(`messages-ad-${ad.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: `ad_id=eq.${ad.id}` }, (payload) =>
        setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [ad]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !ad || !user?.id) return;

    await supabase.from("messages").insert([
      {
        ad_id: ad.id,
        user_id: user.id,
        content: newMessage,
      },
    ]);
    setNewMessage("");
  };

  if (!adId) return <p>Ma'lumot topilmadi.</p>;
  if (!ad) return <p>Yuklanmoqda...</p>;

  return (
    <div className="flex h-screen">
      {/* Chap: e'lon ma'lumotlari */}
      <div className="w-1/4 border-r p-2">
        <h2 className="font-bold">{ad.title}</h2>
        <p>{ad.description}</p>
        <p className="font-bold mt-2">Narx: {ad.price} so’m</p>
        {ad.phone && <p>Telefon: {ad.phone}</p>}
      </div>

      {/* O'ng: chat */}
      <div className="flex-1 flex flex-col p-2">
        <div className="flex-1 overflow-y-auto border p-2 flex flex-col gap-1">
          {messages?.map((msg) => (
            <div key={msg.id} className={`p-2 rounded max-w-xs ${msg.user_id === user.id ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
              {msg.content}
            </div>
          )) || null}
        </div>

        <div className="flex mt-2">
          <input className="flex-1 border rounded p-2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Xabar yozing..." />
          <button className="ml-2 bg-blue-500 text-white px-4 rounded" onClick={sendMessage}>
            Yuborish
          </button>
        </div>
      </div>
    </div>
  );
}
