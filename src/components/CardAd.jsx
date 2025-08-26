"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function CategorySection({ category }) {
  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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

  const handleTransaction = () => {
    setOpen(false);
  };

  const defaultImages = {
    instagram: "/default-card/card-instagram.png",
    youtube: "/default-card/card-youtube.png",
    tiktok: "/default-card/card-tiktok.png",
    pubg: "/default-card/card-pubg.png",
    brawlstars: "/default-card/card-brawlstars.png",
    obmen: "/default-card/card-obmen.png",
  };

  return (
    <div className="max-w-6xl mx-auto md:px-4 px-2">
      <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">{category} e'lonlari</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {listings.map((ad) => (
          <div key={ad.id} className=" shadow p-2 rounded-xl cursor-pointer" onClick={() => openModal(ad)}>
            <div className="">
              <img src={defaultImages[ad.category] || "/default-card/default.png"} alt={ad.title} className="w-full rounded-lg mb-4" />
            </div>
            <div className="line-clamp-2">{ad.title}</div>
            <div className="font-bold text-lg text-primary">{Number(ad.price)} so’m</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
          </DialogHeader>

          <div>
            <h3>Tavsif:</h3>
            <p>{selected?.description}</p>

            <h3>Narxi:</h3>
            <p>{selected?.price} so’m</p>

            <h3>Telefon raqam:</h3>
            <p>{selected?.phone}</p>

            <h3>Telegram username:</h3>
            <p>{selected?.telegram}</p>

            <h3>Kategoriya:</h3>
            <p>{selected?.category}</p>

            {selected?.image_url && (
              <>
                <h3>Rasm:</h3>
                <img src={selected.image_url} alt={selected.title} />
              </>
            )}

            <h3>Qo‘shilgan vaqti:</h3>
            <p>{new Date(selected?.created_at).toLocaleString()}</p>
          </div>

          <DialogFooter>
            <Button onClick={handleTransaction}>Bitim boshlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
