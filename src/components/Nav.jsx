"use client";

import Link from "next/link";

export default function Nav() {
  const menu = [
    { name: "Balans", href: "/balance" },
    { name: "E'lon joylash", href: "/add" },
    { name: "Yordam", href: "/support" },
    { name: "Haqida", href: "/about" },
  ];

  return (
    <nav className="flex items-center gap-1">
      <h1 className="font-bold text-2xl italic mr-3">RS</h1>
      {menu.map(({ name, href }) => (
        <Link key={name} href={href} className="text-gray-700 hover:text-black text-sm px-3 py-1 rounded-md transition-colors">
          {name}
        </Link>
      ))}
    </nav>
  );
}
