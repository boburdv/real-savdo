"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Statistic() {
  const [stats, setStats] = useState({ users: 0, listings: 0 });

  useEffect(function () {
    async function fetchStats() {
      const { count: usersCount } = await supabase.from("users").select("*", { count: "exact", head: true });
      const { count: listingsCount } = await supabase.from("listings").select("*", { count: "exact", head: true });

      var step = 10;
      setStats({
        users: Math.floor((usersCount || 0) / step) * step,
        listings: Math.floor((listingsCount || 0) / step) * step,
      });
    }

    fetchStats();
  }, []);

  var statItems = [
    { title: "Foydalanuvchilar", value: stats.users },
    { title: "E'lonlar", value: stats.listings },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl mb-6 font-medium">Statistika</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        {statItems.map(function (item) {
          return (
            <Card key={item.title} className="shadow-none">
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <h3 className="text-3xl font-semibold opacity-70 mt-4">+{item.value}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
