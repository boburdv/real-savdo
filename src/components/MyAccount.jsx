"use client";

import { supabase } from "@/lib/supabase";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function UserDropdown({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Chiqishda xatolik yuz berdi");
    } else {
      toast.success("Hisobdan chiqdingiz");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
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
