import Categories from "@/components/Categories";
import Header from "@/components/Header";

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <Header />
      <div className="text-center mt-10 mb-16 max-w-2xl mx-auto">
        <h1 className="text-5xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-500 to-gray-300">
          Ilk onlayn, xavfsiz akkaunt savdo platformasi.
        </h1>
        <p className="text-gray-500 text-lg">real-savdo, real odamlar uchun.</p>
      </div>
      <Categories />
    </div>
  );
}
