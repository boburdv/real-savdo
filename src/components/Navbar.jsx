"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Balans", href: "/balance" },
    { name: "E'lonlar", href: "/" },
    { name: "E'lon joylash", href: "/add" },
    { name: "Yordam", href: "/support" },
    { name: "Haqida", href: "/about" },
  ];

  return (
    <nav className="flex items-center justify-between">
      {/* Desktop logo */}
      <a className="text-2xl font-semibold hidden md:block mr-3.5" href="/">
        RS
      </a>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-2">
        {menu.map(({ name, href }) => (
          <Button key={name} variant="link" className="text-[15px]" asChild>
            <a href={href}>{name}</a>
          </Button>
        ))}
      </div>

      {/* Mobile icon */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-13 left-0 w-full bg-white dark:bg-black backdrop-blur-2xl shadow-md flex flex-col items-start p-5 gap-7 md:hidden">
          {/* Mobile logo */}
          <a className="text-2xl font-semibold mb-" href="/" onClick={() => setOpen(false)}>
            RS
          </a>
          {menu.map(({ name, href }) => (
            <div key={name} className="justify-start" onClick={() => setOpen(false)}>
              <a href={href}>{name}</a>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
