import Link from "next/link";

export default function Categories() {
  const items = [
    { name: "Instagram", href: "/instagram" },
    { name: "YouTube", href: "/youtube" },
    { name: "PUBG", href: "/pubg" },
    { name: "TikTok", href: "/tiktok" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <Link key={item.name} href={item.href} className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer">
          {item.name}
        </Link>
      ))}
    </div>
  );
}
