"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MyEditAd from "@/components/EditAd";

export default function Add() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "", phone: "" });
  const [editAd, setEditAd] = useState(null);

  // 🔹 user va ads olish
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) await fetchAds(user.id);
      setLoadingAds(false);
    })();
  }, []);

  const fetchAds = async (uid = user?.id) => {
    if (!uid) return;
    const { data, error } = await supabase.from("listings").select("*").eq("user_id", uid).order("created_at", { ascending: false });
    if (!error) setAds(data || []);
  };

  const fillForm = (ad) => {
    setForm({ title: ad.title, description: ad.description, price: ad.price, category: ad.category, phone: ad.phone });
    setEditAd(ad);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // 🔹 E’lon qo‘shish / yangilash
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Avval tizimga kiring.");

    setLoadingSubmit(true);

    const payload = {
      ...form,
      price: +form.price,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEqQ5KP18ra5tjApi2aC5dXEhGYXUDRetKIA&s",
      user_id: user.id,
    };

    let error;
    if (editAd) {
      ({ error } = await supabase.from("listings").update(payload).eq("id", editAd.id).eq("user_id", user.id));
    } else {
      ({ error } = await supabase.from("listings").insert([payload]));
    }

    if (error) {
      alert("Xato: " + error.message);
    } else {
      alert(editAd ? "E'lon yangilandi!" : "E'lon joylandi!");
      setForm({ title: "", description: "", price: "", category: "", phone: "" });
      setEditAd(null);
      await fetchAds();
    }

    setLoadingSubmit(false);
  };

  if (loadingAds) return <p>Yuklanmoqda...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-10">
      <section>
        <h1 className="text-2xl mb-4">{editAd ? "E'lonni tahrirlash" : "Yangi e'lon qo'shish"}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input name="title" value={form.title} onChange={handleChange} placeholder="Sarlavha" required />
          <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Tavsif" rows={4} required />
          <Input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Narx" min={1} required />
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Kategoriya tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="pubg">PUBG</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefon raqam" required />
          <Button type="submit" disabled={loadingSubmit}>
            {loadingSubmit ? "Yuklanmoqda..." : editAd ? "O'zgartirishni saqlash" : "E'lonni joylash"}
          </Button>
        </form>
      </section>

      <MyEditAd ads={ads} fillForm={fillForm} />
    </div>
  );
}
