"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function CategorySection({ category }) {
  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("listings").select("*").eq("category", category).order("created_at", { ascending: false });
      setListings(data || []);
    })();
  }, [category]);

  const openModal = (ad) => {
    setSelected(ad);
    setOpen(true);
  };

  const goToChat = async () => {
    if (!selected) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Avval tizimga kiring!");
    router.push(`/chat?receiver=${selected.user_id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl mb-4">{category} e’lonlari</h1>
      <div className="flex flex-col gap-4">
        {listings.map((ad) => (
          <div key={ad.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{ad.title}</h2>
            <p>{ad.description}</p>
            <p className="font-bold mt-1">{Number(ad.price)} so’m</p>
            {ad.image_url && <img src={ad.image_url} alt={ad.title} className="max-w-xs mt-2 rounded" />}
            <Button className="mt-3" onClick={() => openModal(ad)}>
              Xabar yozish
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={goToChat}>Chatga o‘tish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
