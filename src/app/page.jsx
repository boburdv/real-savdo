"use client";

import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Statistic from "@/components/Statistics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 my-8 md:my-16">
        <Card className="shadow-none">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-[46px] font-semibold leading-snug md:leading-[3.2rem] max-w-md">Xavfsiz, onlayn, tezkor savdo</h1>
              <p className="text-base md:text-lg mt-4 md:mt-6 opacity-70 max-w-sm mx-auto md:mx-0 mb-10">
                Ro'yxatdan o'tish, turli ijtimoiy tarmoqlar akkauntlarini sotib olish, e’lon berish va xavfsiz savdo qilish. Batafsil videoda
              </p>
              <div className="flex justify-center md:justify-start items-center gap-4">
                <Button onClick={() => router.push("add")} size="sm">
                  E'lon joylash
                </Button>
                <Button onClick={() => router.push("auth")} size="sm" variant="secondary">
                  E'lonlar
                </Button>
              </div>
            </div>

            <div className="w-full md:w-auto flex justify-center">
              <iframe
                className="sm:w-[420px] md:w-[540px] h-[200px] sm:h-[240px] md:h-[303px] rounded-md"
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
