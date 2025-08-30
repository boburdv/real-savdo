"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Header from "./Header";

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
    <>
      <Header />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 max-w-6xl mx-auto sm:p-4 p-2">
        {listings.map((ad) => (
          <Card key={ad.id} className="w-full">
            <CardContent className="px-3.5">
              <img src={defaultImages[ad.category] || "/default-card/default.png"} alt={ad.title} className="w-full object-cover rounded-t-xl" />
            </CardContent>
            <CardFooter className="flex flex-col justify-between flex-grow px-4">
              <CardTitle className="line-clamp-1 w-full">{ad.title}</CardTitle>
              <CardDescription className="line-clamp-1 mt-1 w-full">{ad.description}</CardDescription>
              <div className="text-primary font-bold mt-2 w-full">{Number(ad.price)}.000 so’m</div>
            </CardFooter>
          </Card>
        ))}
      </div>
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
    </>
  );
}
