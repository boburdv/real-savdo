"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const menu = [
    { name: "Balans", href: "/balance" },
    { name: "E'lonlar", href: "/" },
    { name: "E'lon joylash", href: "/add" },
    { name: "Yordam", href: "/support" },
    { name: "Haqida", href: "/about" },
  ];

  const logoSrc = theme === "dark" ? "/light-logo.png" : "/dark-logo.png";

  return (
    <nav className="flex items-center justify-between">
      <a href="/" className="hidden md:block mr-3.5">
        <img src={logoSrc} alt="logo" className="w-8 h-7" />
      </a>
      <div className="hidden md:flex gap-2">
        {menu.map(({ name, href }) => (
          <Button key={name} variant="ghost" size="sm" className="text-[15px]" asChild>
            <a href={href}>{name}</a>
          </Button>
        ))}
      </div>
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {open && (
        <div className="absolute top-13 left-0 w-full bg-white dark:bg-[#171717] shadow-md flex flex-col items-start p-5 gap-7 md:hidden">
          <a href="/">
            <img src={logoSrc} alt="logo" className="w-8 h-7" />
          </a>
          {menu.map(({ name, href }) => (
            <div key={name} onClick={() => setOpen(false)}>
              <a href={href}>{name}</a>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
