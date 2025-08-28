import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Categories() {
  const items = [
    { name: "Instagram", href: "/instagram", img: "/instagram.png", imgDark: "/instagram-dark.png", desc: "Akkauntlar" },
    { name: "YouTube", href: "/youtube", img: "/youtube.png", imgDark: "/youtube-dark.png", desc: "Video kanallar" },
    { name: "TikTok", href: "/tiktok", img: "/tiktok.png", imgDark: "/tiktok-dark.png", desc: "Ijodkorlar" },
    { name: "PUBG", href: "/pubg", img: "/pubg.png", imgDark: "/pubg-dark.png", desc: "O'yin profillari" },
    { name: "BrawlStars", href: "/brawl", img: "/brawl.png", imgDark: "/brawl-dark.png", desc: "O'yin profillari" },
    { name: "Ayirboshlash", href: "/obmen", img: "/obmen.png", imgDark: "/obmen-dark.png", desc: "Hisob almashinuv" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h2 className="text-2xl mb-6 font-medium">Kategoriya</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link key={item.name} href={item.href}>
            <Card className="p-4 hover:shadow-sm shadow-none transition hover:-translate-y-0.5 cursor-pointer rounded-xl">
              <CardContent className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="dark:hidden w-20" />
                <img src={item.imgDark} alt={item.name} className="hidden dark:inline w-20" />
                <div className="flex flex-col">
                  <h3 className="text-2xl font-medium">{item.name}</h3>
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
