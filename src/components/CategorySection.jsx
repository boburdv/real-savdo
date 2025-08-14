"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function CategorySection({ category }) {
  const [listings, setListings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase.from("listings").select("*").eq("category", category).order("created_at", { ascending: false });
      if (!error) setListings(data);
    }
    fetchListings();
  }, [category]);

  const handleModal = (ad) => {
    setSelectedAd(ad);
    setOpenModal(true);
  };

  const goToChat = async () => {
    if (!selectedAd) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Avval tizimga kiring!");

    const user1 = user.id;
    const user2 = selectedAd.user_id;

    // Chatga birinchi xabar yuborish (optional, bo‘sh xabar ham bo‘lishi mumkin)
    await supabase.from("rlmessages").insert([
      {
        sender_id: user1,
        receiver_id: user2,
        content: `Salom, ${selectedAd.title} e'loniga qiziqaman!`,
      },
    ]);

    setOpenModal(false);
    router.push(`/chat?user2=${user2}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl mb-4">{category} bo‘yicha e’lonlar</h1>
      {listings.length === 0 ? (
        <p>Hozircha e’lonlar yo‘q.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {listings.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.description}</p>
              <p className="font-bold">Narx: {item.price} so’m</p>
              {item.image_url && <img src={item.image_url} alt={item.title} className="max-w-xs mt-2 rounded" />}
              <Button onClick={() => handleModal(item)}>Olmoqchiman</Button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAd?.title}</DialogTitle>
          </DialogHeader>
          <p>{selectedAd?.description}</p>
          <p className="font-bold">Narx: {selectedAd?.price} so’m</p>
          <p>Kategoriya: {selectedAd?.category}</p>
          {selectedAd?.phone && <p>Telefon: {selectedAd.phone}</p>}
          <DialogFooter>
            <Button onClick={goToChat}>Xabar yozish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
