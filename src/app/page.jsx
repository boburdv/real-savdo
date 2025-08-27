import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Statistic from "@/components/Statistic";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 my-16">
        <Card>
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-[46px] font-semibold leading-snug md:leading-[3.2rem] max-w-xl">Xavfsiz, onlayn akkaunt savdo platformasi</h1>
              <p className="text-base md:text-lg mt-4 md:mt-6 opacity-70 max-w-md mx-auto md:mx-0">
                Bu yerda turli ijtimoiy tarmoqlar akkauntlarini sotib olishingiz, e’loningizni bepul joylashtirib, boshqa foydalanuvchilar bilan xavfsiz savdo qilishingiz
                mumkin. Batafsilni videoda tomosha qiling.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <iframe
                className="w-full md:w-[540px] md:h-[303px] rounded-xl"
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
