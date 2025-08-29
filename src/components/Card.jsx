"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div>
      <h1>{category} e'lonlari</h1>

      {listings.map((ad) => (
        <Card key={ad.id}>
          <CardHeader>
            <CardTitle>{ad.title}</CardTitle>
            <CardDescription>{ad.description}</CardDescription>
            <CardAction>{Number(ad.price)} so’m</CardAction>
          </CardHeader>
          <CardContent>{ad.image_url && <img src={ad.image_url} alt={ad.title} />}</CardContent>
          <CardFooter>
            <Button onClick={() => openModal(ad)}>Xabar yozish</Button>
          </CardFooter>
        </Card>
      ))}

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
