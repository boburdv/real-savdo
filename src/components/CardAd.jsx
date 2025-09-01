"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "./Header";

export default function CategorySection({ category }) {
  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(
    function () {
      async function fetchData() {
        var { data } = await supabase.from("listings").select("*").eq("category", category).order("created_at", { ascending: false });
        setListings(data || []);
      }
      fetchData();
    },
    [category]
  );

  function openModal(ad) {
    setSelected(ad);
    setOpen(true);
  }

  var defaultImages = {
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
        {listings.map(function (ad) {
          return (
            <Card
              key={ad.id}
              onClick={function () {
                openModal(ad);
              }}
              className="w-full hover:shadow-sm shadow-none transition hover:-translate-y-0.5 cursor-pointer"
            >
              <CardContent className="px-3.5">
                <img src={defaultImages[ad.category] || "/default-card/default.png"} alt={ad.title} className="w-full object-cover rounded-t-xl" />
              </CardContent>
              <CardFooter className="flex flex-col justify-between flex-grow px-4">
                <CardTitle className="line-clamp-1 w-full">{ad.title}</CardTitle>
                <CardDescription className="line-clamp-1 mt-1 w-full">{ad.description}</CardDescription>
                <div className="text-primary font-bold mt-2 w-full">{Number(ad.price)}.000 so’m</div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-1">
              <span className="font-semibold text-sm text-muted-foreground">📌 Tavsif:</span>
              <p className="text-base">{selected?.description}</p>
            </div>
            <div className="grid gap-1">
              <span className="font-semibold text-sm text-muted-foreground">💰 Narxi:</span>
              <p className="text-primary">{selected?.price}.000 so’m</p>
            </div>
            <div className="grid gap-1">
              <span className="font-semibold text-sm text-muted-foreground">💬 Telegram:</span>
              <p>{selected?.telegram}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
