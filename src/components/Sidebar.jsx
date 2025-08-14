"use client";

import { useState } from "react";
import { X, PlusCircle, MessageCircle, Info, DollarSign, House, ShieldUser, Wallet } from "lucide-react";
import Header from "./Header";
import Link from "next/link";

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Bosh sahifa", href: "/", icon: House },
    { name: "Hisobimni to'ldirish", href: "/", icon: Wallet },
    { name: "E'lon joylash", href: "/add", icon: PlusCircle },
    { name: "Xabarlar", href: "/chat", icon: MessageCircle },
    { name: "Admin aloqa", href: "/admin", icon: ShieldUser },
    { name: "Haqida", href: "/haqida", icon: Info },
  ];

  const MenuList = ({ onClick }) => (
    <nav className="flex flex-col gap-3">
      {menu.map(({ name, href, icon: Icon }) => (
        <Link key={name} href={href} onClick={onClick} className="flex items-center gap-3 rounded-md px-3 py-3 hover:bg-gray-100 transition-colors">
          <Icon size={20} />
          {name}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex fixed h-full w-64 border-r flex-col p-3">
        <h2 className="text-2xl mb-6 ml-3">real savdo</h2>
        <MenuList />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <aside className="w-64 border-r p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">real savdo</h2>
              <button onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <MenuList onClick={() => setOpen(false)} />
          </aside>
          <div className="flex-1 bg-black/20" onClick={() => setOpen(false)} />
        </div>
      )}

      <div className="flex-1 md:ml-64 flex flex-col">
        <Header onMenuClick={() => setOpen(true)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
