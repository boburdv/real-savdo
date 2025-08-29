"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

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

  const statItems = [
    { title: "Foydalanuvchilar", value: stats.users },
    { title: "E'lonlar", value: stats.listings },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl mb-6 font-medium">Statistika</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        {statItems.map(({ title, value }) => (
          <Card key={title} className="shadow-none">
            <CardContent>
              <CardTitle>{title}</CardTitle>
              <h3 className="text-3xl font-semibold opacity-70 mt-4">+{value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
