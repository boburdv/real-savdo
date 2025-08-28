"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Kategoriya", href: "/" },
    { name: "Balans", href: "/balance" },
    { name: "E'lon joylash", href: "/add" },
    { name: "Yordam", href: "/support" },
    { name: "Haqida", href: "/about" },
  ];

  return (
    <nav className="flex items-center justify-between">
      {/* Desktop logo */}
      <a className="text-2xl font-semibold hidden md:block" href="/">
        RS
      </a>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-2">
        {menu.map(({ name, href }) => (
          <Button key={name} variant="ghost" className="text-[15px]" asChild>
            <a href={href}>{name}</a>
          </Button>
        ))}
      </div>

      {/* Mobile icon */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>{open ? <X size={28} /> : <Menu size={28} />}</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-black backdrop-blur-2xl shadow-md flex flex-col items-start p-4 gap-2 md:hidden">
          {/* Mobile logo */}
          <a className="text-2xl font-semibold mb-2" href="/" onClick={() => setOpen(false)}>
            RS
          </a>
          {menu.map(({ name, href }) => (
            <Button key={name} variant="ghost" className="w-full justify-start text-[16px]" asChild onClick={() => setOpen(false)}>
              <a href={href}>{name}</a>
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
}
