"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";
import Nav from "./Nav";

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
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/60">
      <div className="mx-auto max-w-7xl w-full flex justify-between items-center py-3">
        <div className="flex items-center gap-6">
          <Nav />
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <UserDropdown user={user} />
          </div>
        ) : (
          <Button onClick={() => router.push("/auth")} size="sm">
            Kirish
          </Button>
        )}
      </div>
    </header>
  );
}
