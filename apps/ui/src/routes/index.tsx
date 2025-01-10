import { useMobileNavigation } from "@/hooks/mobileNavigation";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="">
      <div className="hero bg-gradient-to-br from-slate-100 to-70% to-white sm:h-[calc(100dvh-3.5rem)] flex sm:flex-row flex-col-reverse px-4 sm:px-16 py-8 gap-4 sm:gap-16 items-center">
        <div className="sm:w-7/12 flex flex-col items-center sm:items-start">
          <h1 className="text-3xl sm:text-5xl font-semibold text-center sm:text-start">
            Makanan Terbaik untuk Sahabat Tersayang
          </h1>
          <p className="mt-3 text-center sm:text-start">Berikan nutrisi terbaik untuk hewan peliharaan Anda dengan pilihan makanan sehat dan berkualitas tinggi. Temukan produk favorit yang dibuat khusus untuk kebutuhan mereka!</p>
          <Link to="/shop" className="px-3 w-fit mt-6 shadow bg-amber-400 font-semibold rounded-md py-1">Belanja Sekarang</Link>
        </div>
        <div className="sm:w-5/12 w-6/12 aspect-square bg-pink-200 rounded-3xl overflow-hidden ">
          <img src="/img/hero.png" alt="" />
        </div>
      </div>

      <div className="px-4 sm:px-16 py-8 pb-32 bg-gradient-to-tr to-70% to-white from-slate-100">
        <h2 className="text-xl sm:text-3xl font-semibold text-center">Pilih Category</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4">
          <Link
            to="/shop"
            search={{ category: "makanan_anjing" }}
            className="bg-gradient-to-br to-orange-100 hover:from-50% from-100% from-white border text-center py-4 rounded-md"
          >
            Makanan Anjing
          </Link>
          <Link
            to="/shop"
            search={{ category: "makanan_kucing" }}
            className="bg-gradient-to-br to-orange-100 hover:from-50% from-100% from-white border text-center py-4 rounded-md"
          >
            Makanan Kucing
          </Link>
          <Link
            to="/shop"
            search={{ category: "makanan_burung" }}
            className="bg-gradient-to-br to-orange-100 hover:from-50% from-100% from-white border text-center py-4 rounded-md"
          >
            Makanan Burung
          </Link>
        </div>
      </div>
    </div>
  );
}
