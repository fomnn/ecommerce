import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tl border-t to-30% from-green-100 via-orange-100 px-10 sm:px-16 py-8">
      <div className="flex flex-col sm:flex-row gap-8 pb-16">
        <p className="w-full">Logo</p>
        <div className="w-5/12">
          <h3 className="text-xl font-semibold mb-2">Navigasi</h3>
          <div className="flex flex-col">
            <a>Home</a>
            <a>Shop</a>
            <a>About Us</a>
          </div>
        </div>
        <div className="w-5/12">
          <h3 className="text-xl font-semibold mb-2">Bantuan dan Dukungan</h3>
          <div className="flex flex-col">
            <p>Email: support@contoh.com</p>
            <p>Telepon: +62 812 3456 7890</p>
            <p>Alamat: Jalan Contoh No. 123, Kota, Negara</p>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-sm">© 2024 Nama Perusahaan. Semua hak dilindungi.</p>
      </div>
    </footer>
  );
}
