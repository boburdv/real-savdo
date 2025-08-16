import Link from "next/link";
import Image from "next/image"; // next/image ishlatish tavsiya qilinadi
import { Card, CardContent } from "@/components/ui/card";

export default function Categories() {
  const items = [
    { name: "Instagram", href: "/instagram", img: "/instagram.png", desc: "Instagram akkauntlari" },
    { name: "YouTube", href: "/youtube", img: "/youtube.png", desc: "YouTube kanallari" },
    { name: "PUBG", href: "/pubg", img: "/pubg.png", desc: "PUBG akkauntlari" },
    { name: "TikTok", href: "/tiktok", img: "/tiktok.png", desc: "TikTok akkauntlari" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map(({ name, href, img, desc }) => (
        <Link key={name} href={href}>
          <Card className="cursor-pointer rounded-xl hover:bg-gray-100 py-0 transition-colors">
            <CardContent className="flex items-center gap-5 p-4">
              <Image src={img} alt={name} width={100} height={100} />
              <div>
                <h3 className="font-semibold text-2xl">{name}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
