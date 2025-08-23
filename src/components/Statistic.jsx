"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardTitle } from "@/components/ui/card";

export default function Statistic() {
  const [stats, setStats] = useState({ users: 0, listings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: usersCount } = await supabase.from("users").select("*", { count: "exact", head: true });
      const { count: listingsCount } = await supabase.from("listings").select("*", { count: "exact", head: true });

      const step = 10;
      setStats({
        users: Math.floor((usersCount || 0) / step) * step,
        listings: Math.floor((listingsCount || 0) / step) * step,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-2.5">
      <h2 className="text-2xl mb-6 font-semibold">Statistika</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        <Card className="shadow-none">
          <CardTitle>Foydalanuvchilar</CardTitle>
          <h3 className="text-3xl font-semibold opacity-60">+{stats.users}</h3>
        </Card>

        <Card className="shadow-none">
          <CardTitle>E'lonlar</CardTitle>
          <h3 className="text-3xl font-semibold opacity-60">+{stats.listings}</h3>
        </Card>
      </div>
    </div>
  );
}
