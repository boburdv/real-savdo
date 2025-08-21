"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MyEditAd from "@/components/EditAd";
import { validateForm } from "@/components/Validation";
import toast from "react-hot-toast";

export default function Add() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    phone: "",
  });
  const [editAd, setEditAd] = useState(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) fetchAds(user.id);
      setLoadingAds(false);
    })();
  }, []);

  const fetchAds = async (uid = user?.id) => {
    if (!uid) return;
    const { data, error } = await supabase.from("listings").select("*").eq("user_id", uid).order("created_at", { ascending: false });

    if (!error) setAds(data || []);
  };

  const fillForm = (ad) => {
    setForm({
      title: ad.title,
      description: ad.description,
      price: ad.price,
      category: ad.category,
      phone: ad.phone,
    });
    setEditAd(ad);
    toast.success("E'lonni tahrirlash mumkin");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "");
      if (!value.startsWith("998")) value = "998" + value;

      if (value.length === 12) {
        const match = value.match(/^(\d{3})(\d{2})(\d{3})(\d{2})$/);
        if (match) value = `+${match[1]} ${match[2]} ${match[3]}-${match[4]}`;
      } else {
        value = "+" + value;
      }
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Iltimos avval tizimga kiring");
    if (!validateForm(form)) return;

    setLoadingSubmit(true);

    const payload = {
      ...form,
      user_id: user.id,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEqQ5KP18ra5tjApi2aC5dXEhGYXUDRetKIA&s",
    };

    let error;

    if (editAd) {
      ({ error } = await supabase.from("listings").update(payload).eq("id", editAd.id).eq("user_id", user.id));
    } else {
      ({ error } = await supabase.from("listings").insert([payload]));
    }

    if (error) {
      toast.error("Xato: " + error.message);
    } else {
      toast.success(editAd ? "E'lon muvaffaqiyatli yangilandi!" : "E'lon muvaffaqiyatli joylandi!");
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        phone: "",
      });
      setEditAd(null);
      fetchAds();
    }

    setLoadingSubmit(false);
  };

  if (loadingAds) return <p>Yuklanmoqda...</p>;

  return (
    <div>
      <section>
        <h1>{editAd ? "E'lonni tahrirlash" : "Yangi e'lon qo'shish"}</h1>
        <form onSubmit={handleSubmit}>
          <Input name="title" value={form.title} onChange={handleChange} placeholder="Sarlavha" />
          <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Tavsif" rows={4} />
          <Input name="price" value={form.price} onChange={handleChange} placeholder="Narx" />
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
          <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefon raqam" />
          <Button type="submit" disabled={loadingSubmit}>
            {loadingSubmit ? "Yuklanmoqda..." : editAd ? "O'zgartirishni saqlash" : "E'lonni joylash"}
          </Button>
        </form>
      </section>

      <section>
        <MyEditAd ads={ads} fillForm={fillForm} />
      </section>
    </div>
  );
}
