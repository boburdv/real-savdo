import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Statistic from "@/components/Statistic";

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-between max-w-6xl mx-auto my-16 p-2.5">
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
          title="24 hours + of pure black screen in HD!"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <Statistic />
      <Categories />
      <Footer />
    </>
  );
}
