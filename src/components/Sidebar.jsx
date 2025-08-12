"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Header from "./Header";
import Link from "next/link";

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Bosh sahifa", href: "/" },
    { name: "Hisobimni to'ldirish", href: "/" },
    { name: "E'lonlarim", href: "/my-ads" },
    { name: "Xabarlar", href: "/chat" },
    { name: "Admin aloqa", href: "/admin" },
    { name: "Haqida", href: "/haqida" },
  ];

  const MenuList = ({ onClick }) => (
    <nav className="flex flex-col gap-4">
      {menu.map((item) => (
        <Link key={item.name} href={item.href} className="hover:bg-gray-200 rounded px-3 py-2 block" onClick={onClick}>
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-white border-r flex-col p-3 z-50">
        <h2 className="text-2xl font-bold mb-6 ml-3">real savdo</h2>
        <MenuList />
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <aside className="w-64 bg-white border-r p-6">
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

      {/* Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <Header onMenuClick={() => setOpen(true)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
