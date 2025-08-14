"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Menu, MessageCircle } from "lucide-react";
import UserDropdown from "./UserDropdown";

export default function Header({ onMenuClick }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false); // client-only flag

  useEffect(() => {
    setMounted(true); // component mounted, SSRdan keyin
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: authListener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  if (!mounted) return null; // SSRda hech narsa render qilinmaydi

  return (
    <header className="sticky top-0 z-50 w-full py-3 px-4 bg-white border-b flex justify-between md:justify-end items-center">
      <button onClick={onMenuClick} className="md:hidden" aria-label="Open menu">
        <Menu size={24} />
      </button>
      {user ? (
        <div className="flex">
          <Button variant="ghost" aria-label="Chat">
            <MessageCircle />
          </Button>
          <UserDropdown user={user} />
        </div>
      ) : (
        <Button onClick={() => router.push("/auth")} variant="outline">
          Kirish
        </Button>
      )}
    </header>
  );
}
