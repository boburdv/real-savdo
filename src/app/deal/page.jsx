"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DealPage() {
  const [user, setUser] = useState(null);
  const [deals, setDeals] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchDeals = async () => {
      const { data: listingsData } = await supabase.from("listings").select("id").eq("seller_id", user.id);
      const userListingsIds = listingsData.map((l) => l.id);

      const { data, error } = await supabase
        .from("deals")
        .select("id, listing_id, buyer_id, status, created_at, listings(title, seller_id), users(email)")
        .or(`buyer_id.eq.${user.id},listing_id.in.(${userListingsIds.join(",")})`);

      if (error) console.error(error);
      else {
        setDeals(data);
        const anyAsSeller = data.some((d) => userListingsIds.includes(d.listing_id));
        setRole(anyAsSeller ? "seller" : "buyer");
      }
    };

    fetchDeals();
  }, [user]);

  const handleStatus = async (dealId, newStatus) => {
    const { error, data } = await supabase.from("deals").update({ status: newStatus }).eq("id", dealId).select(); // select() kerak, state’ni yangilash uchun

    if (error) return console.error(error);

    setDeals((prev) => prev.map((d) => (d.id === dealId ? { ...d, status: newStatus } : d)));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Bitimlar sahifasi</h1>

      {role === "buyer" && (
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Men yaratgan bitimlar</h2>
          {deals.map((deal) => (
            <Card key={deal.id}>
              <CardHeader>
                <CardTitle>{deal.listings.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div>
                  Status: <strong>{deal.status}</strong>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleStatus(deal.id, "cancelled")}>
                  Bekor qilish
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {role === "seller" && (
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Mening listinglarimga kelgan bitimlar</h2>
          {deals.map((deal) => (
            <Card key={deal.id}>
              <CardHeader>
                <CardTitle>{deal.listings.title}</CardTitle>
                <CardDescription>Xaridor: {deal.users.email}</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2 items-center">
                <div>
                  Status: <strong>{deal.status}</strong>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleStatus(deal.id, "accepted")}>
                  Accept
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleStatus(deal.id, "rejected")}>
                  Reject
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
