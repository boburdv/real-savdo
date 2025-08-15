"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function CategorySection({ category, openChat }) {
  const [listings, setListings] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase.from("listings").select("*").eq("category", category).order("created_at", { ascending: false });
      if (error) alert(error.message);
      else setListings(data);
    }
    fetchListings();
  }, [category]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl mb-4">{category} bo‘yicha e’lonlar</h1>

      {listings.length === 0 ? (
        <p>Hozircha e’lonlar yo‘q.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {listings.map((item) => (
            <li key={item.id}>
              <Card onClick={() => setSelectedAd(item)} className="cursor-pointer hover:bg-gray-100 transition-colors">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold">Narx: {item.price} so’m</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={!!selectedAd} onOpenChange={() => setSelectedAd(null)}>
        <DialogContent>
          {selectedAd && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAd.title}</DialogTitle>
                <DialogDescription>{selectedAd.description}</DialogDescription>
              </DialogHeader>
              <p className="font-bold mt-2">Narx: {selectedAd.price} so’m</p>
              {selectedAd.phone && <p>Telefon: {selectedAd.phone}</p>}
              <DialogFooter>
                <Button
                  onClick={() => {
                    router.push(`/chat?adId=${selectedAd.id}`);
                    setSelectedAd(null);
                  }}
                >
                  Olmoqchiman
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
