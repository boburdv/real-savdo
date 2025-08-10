"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function CategorySection({ category }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase.from("listings").select("*").eq("category", category).order("created_at", { ascending: false });

      if (!error) setListings(data);
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
            <li key={item.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.description}</p>
              <p className="font-bold">Narx: {item.price} so’m</p>
              {item.image_url && <img src={item.image_url} alt={item.title} className="max-w-xs mt-2 rounded" />}
              <p>Kategoriya: {item.category}</p>
              {item.phone && <p>Telefon: {item.phone}</p>}
              <p className="text-sm text-gray-500">Joylangan vaqti: {new Date(item.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
