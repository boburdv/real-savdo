"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: authListener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/60 mx-5">
      <div className="mx-auto max-w-4xl w-full flex justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <MessageCircle size={22} className="text-gray-500 hover:text-black cursor-pointer" onClick={() => router.push("/chat")} />
            <UserDropdown user={user} />
          </div>
        ) : (
          <Button onClick={() => router.push("/auth")} className="h-8">
            Kirish
          </Button>
        )}
      </div>
    </header>
  );
}
