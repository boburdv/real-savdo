"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";
import Nav from "./Nav";
import { ModeToggle } from "./ModeToggle";

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
    <header>
      <div>
        <div>
          <Nav />
        </div>

        {user ? (
          <div>
            <ModeToggle />
            <UserDropdown user={user} />
          </div>
        ) : (
          <div>
            <ModeToggle />
            <Button onClick={() => router.push("/auth")}>Kirish</Button>
          </div>
        )}
      </div>
    </header>
  );
}
