"use client";

import { supabase } from "@/lib/supabase";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function UserDropdown({ user }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <User size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Hisobim</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{user.email}</DropdownMenuItem>
        <DropdownMenuItem>Balans: 100.000 so'm</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogout}>Chiqish</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
