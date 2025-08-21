"use client";

import { Button } from "./ui/button";

export default function Nav() {
  const menu = [
    { name: "Balans", href: "/balance" },
    { name: "E'lon joylash", href: "/add" },
    { name: "Yordam", href: "/support" },
    { name: "Haqida", href: "/about" },
  ];

  return (
    <nav>
      <Button>
        <img src="./logo.png" alt="Logo realsavdo" width={25} />
      </Button>
      {menu.map(({ name, href }) => (
        <Button key={name} href={href}>
          {name}
        </Button>
      ))}
    </nav>
  );
}
