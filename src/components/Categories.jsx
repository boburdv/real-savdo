import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Categories() {
  const items = [
    { name: "Instagram", href: "/instagram" },
    { name: "YouTube", href: "/youtube" },
    { name: "PUBG", href: "/pubg" },
    { name: "TikTok", href: "/tiktok" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map(({ name, href }) => (
        <Link key={name} href={href}>
          <Card className="cursor-pointer hover:bg-gray-100 transition-colors">
            <CardContent className="font-semibold">{name}</CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
