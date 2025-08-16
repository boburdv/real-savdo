"use client";

import { useState, useRef } from "react";
import { X, Menu, PlusCircle, MessageCircle, Info, House, ShieldUser, Wallet } from "lucide-react";
import Link from "next/link";
import Header from "./Header";

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(false);
  const hoverTimeout = useRef(null);

  const menu = [
    { name: "Bosh sahifa", href: "/", icon: House },
    { name: "Hisobimni to'ldirish", href: "/", icon: Wallet },
    { name: "E'lon joylash", href: "/add", icon: PlusCircle },
    { name: "Xabarlar", href: "/chat", icon: MessageCircle },
    { name: "Admin aloqa", href: "/admin", icon: ShieldUser },
    { name: "Haqida", href: "/haqida", icon: Info },
  ];

  const MenuList = ({ showText, onClick }) => (
    <nav className="flex flex-col mt-8 gap-3">
      {menu.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          onClick={onClick}
          className={`flex items-center rounded-md hover:bg-gray-100 transition-all duration-300 ${showText ? "px-3 justify-start" : "justify-center"}`}
        >
          <div className="flex-shrink-0 flex justify-center py-3 flex-col">
            <Icon size={20} />
          </div>
          {showText && <span className="ml-3 whitespace-nowrap transition-all">{name}</span>}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex fixed h-full border-r flex-col p-1.5 bg-white transition-all duration-300 ${open ? "w-64" : "w-14"}`}
        onMouseEnter={() => {
          hoverTimeout.current = setTimeout(() => setOpen(true), 800);
        }}
        onMouseLeave={() => {
          clearTimeout(hoverTimeout.current);
          setOpen(false);
        }}
      >
        <div className="flex justify-end items-center mb-4">
          <button onClick={() => setOpen(!open)} className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <MenuList showText={open} />
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <aside className="w-64 border-r bg-white">
            <div className="flex justify-end items-center mb-6">
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded">
                <X size={22} />
              </button>
            </div>
            <MenuList showText={true} onClick={() => setOpen(false)} />
          </aside>
          <div className="flex-1 bg-black/20" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${open ? "md:ml-64" : "md:ml-14"}`}>
        <Header />
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
