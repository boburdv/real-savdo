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
          <CardContent className="flex items-center justify-between">
            <div>
              <h1 className="text-[46px] font-semibold w-[520px] leading-12">Xavfsiz, onlayn akkaunt savdo platformasi</h1>
              <p className="w-md text-lg mt-6 opacity-70">
                Bu yerda turli ijtimoiy tarmoqlar akkauntlarini sotib olishingiz, e’loningizni bepul joylashtirib, boshqa foydalanuvchilar bilan xavfsiz savdo qilishingiz
                mumkin. Batafsilni videoda tomosha qiling.
              </p>
            </div>

            <iframe
              width="540"
              height="303"
              src="https://www.youtube.com/embed/AjWfY7SnMBI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </CardContent>
        </Card>
      </div>
      <Statistic />
      <Categories />
      <Footer />
    </div>
  );
}
