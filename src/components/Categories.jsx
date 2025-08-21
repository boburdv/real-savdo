import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Categories() {
  const items = [
    { name: "Instagram", href: "/instagram", img: "/instagram.png", desc: "Instagram akkauntlari" },
    { name: "YouTube", href: "/youtube", img: "/youtube.png", desc: "YouTube kanallari" },
    { name: "PUBG", href: "/pubg", img: "/pubg.png", desc: "PUBG akkauntlari" },
    { name: "TikTok", href: "/tiktok", img: "/tiktok.png", desc: "TikTok akkauntlari" },
  ];

  return (
    <div>
      {items.map((item) => (
        <Link key={item.name} href={item.href}>
          <Card>
            <CardContent>
              <Image src={item.img} alt={item.name} width={100} height={100} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
