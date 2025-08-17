"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fn = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password });
    if (error) alert(error.message);
    else router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Hisobga kirish" : "Ro'yxatdan o'tish"}</CardTitle>
          <CardDescription>
            {mode === "login" ? "Hisobingizga kirish uchun ma'lumotlarni to'ldiring." : "Yangi hisob yaratish uchun ma'lumotlarni to'ldiring."}
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Ro'yxatdan o'tish" : "Hisobga kirish"}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Elektron pochta</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Parol</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <CardFooter className="mt-6 p-0">
              <Button type="submit" className="w-full">
                {mode === "login" ? "Hisobga kirish" : "Ro'yxatdan o'tish"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
