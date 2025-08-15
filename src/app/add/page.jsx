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

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase.from("listings").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
        setAds(data || []);
      }
      setLoadingAds(false);
    })();
  }, []);

  const fetchAds = async () => {
    if (!user) return;
    const { data } = await supabase.from("listings").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setAds(data || []);
  };

  const fillForm = (ad) => {
    setForm({ title: ad.title, description: ad.description, price: ad.price, category: ad.category, phone: ad.phone });
    setEditAd(ad);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Avval tizimga kiring.");

    setLoadingSubmit(true);
    const payload = { ...form, price: +form.price, image_url: "https://via.placeholder.com/150.jpg", user_id: user.id };

    const { error } = editAd
      ? await supabase.from("listings").update(payload).eq("id", editAd.id).eq("user_id", user.id)
      : await supabase.from("listings").insert([payload]);

    if (error) alert(error.message);
    else {
      alert(editAd ? "E'lon yangilandi!" : "E'lon joylandi!");
      setForm({ title: "", description: "", price: "", category: "", phone: "" });
      setEditAd(null);
      fetchAds();
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
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })} required>
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
    </div>
  );
}
