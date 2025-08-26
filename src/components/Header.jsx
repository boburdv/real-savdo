"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import MyAccount from "./MyAccount";
import Navbar from "./Navbar";
import { ModeToggle } from "./ModeToggle";
import { LogIn } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-white/50 dark:bg-[rgba(10,10,10,0.4)] py-2.5 border-b border-dashed backdrop-blur-lg">
      <div className="flex items-center justify-between max-w-6xl px-4 mx-auto">
        <div>
          <Navbar />
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <Button variant="destructive" size="sm">
              Bitimlar
            </Button>
          )}
          {user ? (
            <>
              <MyAccount user={user} />
              <span className="border-r h-4 bg-gray-900"></span>
            </>
          ) : (
            <Button size="sm" onClick={() => router.push("/auth")} className="gap-0.5">
              Kirish
              <LogIn />
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
