"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Menu, MessageCircle, User } from "lucide-react";

export default function Header({ onMenuClick }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="w-full py-3 px-4 bg-white border-b flex justify-between md:justify-end items-center">
      <button onClick={onMenuClick} className="md:hidden" aria-label="Open menu">
        <Menu size={24} />
      </button>

      {user ? (
        <div className="flex items-center gap-4">
          <button aria-label="Chat">
            <MessageCircle size={24} />
          </button>
          <button aria-label="User">
            <User size={24} />
          </button>
        </div>
      ) : (
        <Button onClick={() => route.push("/auth")} variant="outline">
          Kirish
        </Button>
      )}
    </header>
  );
}
