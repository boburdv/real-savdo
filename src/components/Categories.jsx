import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Categories() {
  const items = [
    {
      name: "Instagram",
      href: "/instagram",
      img: "/instagram.png",
      imgDark: "/instagram-dark.png",
      desc: "Foydalanuvchi akkauntlari",
    },
    {
      name: "YouTube",
      href: "/youtube",
      img: "/youtube.png",
      imgDark: "/youtube-dark.png",
      desc: "Video kanallar",
    },
    {
      name: "PUBG",
      href: "/pubg",
      img: "/pubg.png",
      imgDark: "/pubg-dark.png",
      desc: "O'yin profillari",
    },
    {
      name: "TikTok",
      href: "/tiktok",
      img: "/tiktok.png",
      imgDark: "/tiktok-dark.png",
      desc: "Ijodkorlar",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-2.5 my-16">
      <h2 className="text-2xl mb-6 font-semibold">Kategoriya</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <Link key={item.name} href={item.href}>
            <Card>
              <CardContent className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="dark:hidden w-24" />
                <img src={item.imgDark} alt={item.name} className="hidden dark:inline w-24" />
                <div className="flex-col">
                  <h3 className="text-3xl font-medium">{item.name}</h3>
                  <p className="opacity-70">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
