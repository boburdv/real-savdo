import Categories from "@/components/Categories";
import Header from "@/components/Header";
import Statistic from "@/components/Statistic";

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-between max-w-6xl mx-auto my-20 p-2.5">
        <div>
          <h1 className="text-[46px] font-semibold w-[520px] leading-12">Xavfsiz, onlayn akkaunt savdo platformasi</h1>
          <p className="w-md text-lg mt-6 opacity-80">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente culpa alias dolores consequuntur perferendis praesentium eius Lorem, ipsum dolor. accusamus
            totam iste.
          </p>
        </div>

        <iframe
          width="540"
          height="300"
          src="https://www.youtube.com/embed/fHBM7S7SnnU"
          title="SEENSMS.UZ SAYTIDAN TO&#39;LIQ RO&#39;YXATDAN O&#39;TISH"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <Statistic />
      <Categories />
    </>
  );
}
