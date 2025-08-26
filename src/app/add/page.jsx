"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MyEditAd from "@/components/EditAd";
import { validateForm } from "@/components/Validation";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

export default function Add() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    phone: "",
    telegram: "",
  });
  const [editAd, setEditAd] = useState(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) fetchAds(user.id);
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
      telegram: ad.telegram || "",
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
    if (!user) return toast.error("Iltimos, avval tizimga kiringa");
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
        telegram: "",
      });
      setEditAd(null);
      fetchAds();
    }

    setLoadingSubmit(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-4 p-4">
      {/* Forma */}
      <Card className="w-full max-w-md flex-shrink-0">
        <CardHeader>
          <CardTitle>{editAd ? "E'lonni tahrirlash" : "Yangi e'lon qo'shish"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="title" className="mb-2">
                Sarlavha
              </Label>
              <Input id="title" name="title" value={form.title} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="description" className="mb-2">
                Tavsif (Batafsil)
              </Label>
              <Textarea id="description" name="description" value={form.description} onChange={handleChange} rows={4} />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Label htmlFor="category" className="mb-2">
                  Kategoriya
                </Label>
                <Select id="category" value={form.category || ""} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlash uchun bosing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="pubg">PUBG</SelectItem>
                      <SelectItem value="brawlstars">BrawlStars</SelectItem>
                      <SelectItem value="obmen" disabled>
                        Ayirboshlash
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Label htmlFor="price" className="mb-2">
                  Narxi
                </Label>
                <Input id="price" name="price" value={form.price} onChange={handleChange} placeholder="misol: 380.000" />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="mb-2">
                Telefon raqam
              </Label>
              <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="misol: 901234567" />
            </div>

            <div>
              <Label htmlFor="telegram" className="mb-2">
                Telegram username
              </Label>
              <Input id="telegram" name="telegram" value={form.telegram} onChange={handleChange} placeholder="misol: @real-savdo" />
            </div>

            <Button type="submit" disabled={loadingSubmit} className="w-full mt-4">
              {loadingSubmit ? "Yuklanmoqda..." : editAd ? "O'zgartirishni saqlash" : "E'lonni joylashtirish"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* E’lonlar */}
      {ads.length > 0 && (
        <div className="w-full md:w-auto mt-4 md:mt-0 md:max-h-[524px] md:overflow-y-auto rounded-xl">
          <MyEditAd ads={ads} fillForm={fillForm} />
        </div>
      )}
    </div>
  );
}
