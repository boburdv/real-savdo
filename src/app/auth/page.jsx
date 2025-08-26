"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateAuth } from "@/components/Validation";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let response;
    if (mode === "login") {
      response = await supabase.auth.signInWithPassword({ email, password });
    } else {
      response = await supabase.auth.signUp({ email, password });
      if (response.data?.user) {
        await supabase.from("users").insert([{ id: response.data.user.id, email: response.data.user.email }]);
      }
    }

    setLoading(false);

    if (!validateAuth({ email, password, response, mode })) return;

    toast.success(mode === "login" ? "Hisobingizga muvaffaqiyatli kirdingiz" : "Ro'yxatdan muvaffaqiyatli o'tdingiz");
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Hisobga kirish" : "Ro'yxatdan o'tish"}</CardTitle>
          <CardDescription>{mode === "login" ? "Hisobga kirish uchun ma'lumotlarni to'ldiring" : "Ro'yxatdan o'tish uchun ma'lumotlarni to'ldiring"}</CardDescription>
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
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="test@gmail.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Parol</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <CardFooter className="flex-col gap-2 p-0">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2Icon className="animate-spin mr-2 h-4 w-4" />}
                {mode === "login" ? "Hisobga kirish" : "Ro'yxatdan o'tish"}
              </Button>
              <Button variant="outline" className="w-full">
                {mode === "login" ? "Google bilan kirish" : "Google bilan ro'yxatdan o'tish"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
