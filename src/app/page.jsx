"use client";

import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Statistic from "@/components/Statistic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 my-16">
        <Card className="shadow-none">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-[46px] font-semibold leading-snug md:leading-[3.2rem] max-w-md">Xavfsiz, onlayn, tezkor savdo</h1>
              <p className="text-base md:text-lg mt-4 md:mt-6 opacity-70 max-w-sm mx-auto md:mx-0">
                Ro'yxatdan o'tish, turli ijtimoiy tarmoqlar akkauntlarini sotib olish, e’lon berish va xavfsiz savdo qilish. Batafsil videoda.
              </p>
              <div className="flex items-center gap-2 mt-6">
                <Button onClick={() => router.push("auth")} size="sm">
                  Kirish
                  <LogIn />
                </Button>
                <Button onClick={() => router.push("add")} size="sm" variant="ghost">
                  E'lon joylash
                </Button>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <iframe
                className="w-full md:w-[540px] md:h-[303px] rounded-md"
                src="https://www.youtube.com/embed/AjWfY7SnMBI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Statistic />
      <Categories />
      <Footer />
    </div>
  );
}
