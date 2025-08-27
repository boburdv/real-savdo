"use client";

import { Button } from "./ui/button";

export default function Nav() {
  const menu = [
    { name: "Kategoriya", href: "/" },
    { name: "Balans", href: "/balance" },
    { name: "E'lon joylash", href: "/add" },
    { name: "Yordam", href: "/support" },
    { name: "Haqida", href: "/about" },
  ];

  return (
    <nav className="flex items-center">
      {/* <img src="./logo.png" alt="Logo realsavdo" width={30} className="mr-3" /> */}
      <a className="text-2xl font-semibold mr-2.5" href="/">
        RS
      </a>
      {menu.map(({ name, href }) => (
        <Button variant="link" className="cursor-pointer text-[15px]" key={name} href={href}>
          {name}
        </Button>
      ))}
    </nav>
  );
}
