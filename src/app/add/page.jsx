"use client";

import { useState, useEffect, useRef } from "react";
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
  const titleRef = useRef(null);
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "", phone: "", telegram: "" });
  const [editAd, setEditAd] = useState(null);

  useEffect(function () {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) fetchAds(user.id);
    }
    loadUser();
  }, []);

  function fetchAds(uid) {
    if (!uid) return;
    supabase
      .from("listings")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .then(function (res) {
        if (!res.error) setAds(res.data || []);
      });
  }

  function fillForm(ad) {
    setForm({ title: ad.title, description: ad.description, price: ad.price, category: ad.category, phone: ad.phone, telegram: ad.telegram || "" });
    setEditAd(ad);
    if (titleRef.current) titleRef.current.focus();
  }

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value.replace(/\D/g, "");
    if (name === "phone" && !value.startsWith("998")) value = "998" + value;
    setForm(Object.assign({}, form, { [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return toast.error("Iltimos, avval tizimga kiring");
    if (!validateForm(form)) return;
    setLoadingSubmit(true);

    var payload = Object.assign({}, form, { user_id: user.id });
    var error;
    if (editAd) {
      ({ error } = await supabase.from("listings").update(payload).eq("id", editAd.id).eq("user_id", user.id));
    } else {
      ({ error } = await supabase.from("listings").insert([payload]));
    }

    if (error) toast.error("Xato: " + error.message);
    else {
      toast.success(editAd ? "E'lon muvaffaqiyatli yangilandi!" : "E'lon muvaffaqiyatli joylandi!");
      setForm({ title: "", description: "", price: "", category: "", phone: "", telegram: "" });
      setEditAd(null);
      fetchAds(user.id);
    }
    setLoadingSubmit(false);
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-4 p-4">
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
              <Input id="title" name="title" value={form.title} onChange={handleChange} ref={titleRef} placeholder="misol: Instagram 10k obunachi " />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2">
                Tavsif
              </Label>
              <Textarea id="description" name="description" value={form.description} onChange={handleChange} rows={4} placeholder="misol: Story soni, (охват) soni..." />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Label htmlFor="category" className="mb-2">
                  Kategoriya
                </Label>
                <Select
                  id="category"
                  value={form.category || ""}
                  onValueChange={function (v) {
                    setForm(Object.assign({}, form, { category: v }));
                  }}
                >
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
      {ads.length > 0 && <MyEditAd ads={ads} fillForm={fillForm} />}
    </div>
  );
}
