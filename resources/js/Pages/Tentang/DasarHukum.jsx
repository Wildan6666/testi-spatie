import React, { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";
import { BookText, ScrollText, Landmark, FileText } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const legalBasisData = [
  {
    icon: Landmark,
    type: "Peraturan Presiden",
    number: "Perpres Nomor 33 Tahun 2012",
    about: "Jaringan Dokumentasi dan Informasi Hukum Nasional",
    description:
      "Landasan utama pembentukan JDIHN untuk menjamin ketersediaan dokumentasi dan informasi hukum yang lengkap, akurat, serta dapat diakses secara cepat dan mudah.",
    link: "/dokumen/perpres-33-2012",
  },
  {
    icon: BookText,
    type: "Peraturan Menteri",
    number: "Permenkumham Nomor 8 Tahun 2019",
    about: "Standar Pengelolaan Dokumen dan Informasi Hukum",
    description:
      "Peraturan teknis yang menetapkan standar bagi anggota JDIHN dalam mengelola dokumen dan informasi hukum, mulai dari pengumpulan, pengolahan, hingga penyajian kepada publik.",
    link: "/dokumen/permenkumham-8-2019",
  },
  {
    icon: ScrollText,
    type: "Undang-Undang",
    number: "UU Nomor 14 Tahun 2008",
    about: "Keterbukaan Informasi Publik",
    description:
      "Payung hukum luas yang menjamin hak setiap warga negara untuk memperoleh informasi publik, termasuk produk hukum yang dihasilkan oleh badan publik.",
    link: "/dokumen/uu-14-2008",
  },
  {
    icon: FileText,
    type: "Peraturan Rektor",
    number: "Peraturan Rektor Nomor 10 Tahun 2023",
    about: "Pedoman Jaringan Dokumentasi dan Informasi Hukum UNJA",
    description:
      "Peraturan internal Universitas Jambi yang merinci struktur, tugas, dan fungsi JDIH di lingkungan Universitas Jambi serta pedoman operasionalnya.",
    link: "/dokumen/perrektor-10-2023",
  },
  {
    icon: Landmark,
    type: "Peraturan Pemerintah",
    number: "PP Nomor 2 Tahun 2018",
    about: "Standar Pelayanan Minimum Dokumen Hukum",
    description:
      "Mengatur standar minimum pelayanan dokumen hukum di setiap instansi pemerintah, termasuk kecepatan dan kemudahan akses bagi masyarakat.",
    link: "/dokumen/pp-2-2018",
  },
  {
    icon: BookText,
    type: "Keputusan Rektor",
    number: "Keputusan Rektor Nomor 123/UN21/HK/2024",
    about: "Pembentukan Tim Pengelola JDIH UNJA",
    description:
      "Keputusan rektor tentang susunan dan tugas tim yang bertanggung jawab penuh atas pengelolaan JDIH di Universitas Jambi.",
    link: "/dokumen/keputusan-rektor-123-2024",
  },
];

export default function DasarHukum() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Head title="Dasar Hukum JDIH" />
      <Navbar />

      <main className="font-sans min-h-screen pt-28 transition-all duration-700">
        {/* === HERO SECTION (PUTIH BERSIH) === */}
        <section className="bg-white py-20 px-6 text-center border-b border-orange-100">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <FileText
              size={48}
              className="mx-auto text-orange-600 mb-4 animate-bounce-slow"
            />
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-4">
              Landasan Hukum
            </h1>
            <p
              className="text-lg text-slate-700 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Dasar hukum yang menjadi fondasi operasional Jaringan Dokumentasi
              dan Informasi Hukum (JDIH) Universitas Jambi dalam menyediakan
              layanan informasi hukum yang terpercaya.
            </p>
          </div>
        </section>

        {/* === GRID SECTION (DENGAN GRADIENT MENUJU FOOTER) === */}
        <section
          className="py-16 lg:py-20 px-6"
          style={{
            background:
              "linear-gradient(to bottom, #fffaf7 0%, #fff0e6 35%, #ffe3d0 70%, #e89876 100%)",
          }}
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalBasisData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 shadow-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:border-orange-400 border-t-8 border-orange-600 cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                  data-aos-duration="800"
                >
                  <div className="p-6 bg-orange-50/50 flex justify-between items-start">
                    <Icon size={40} className="text-orange-500 animate-fade-in" />
                    <span className="bg-orange-600 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                      {item.type}
                    </span>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                      {item.number}
                    </h2>
                    <p className="text-md font-medium text-slate-500 mb-4 italic">
                      tentang {item.about}
                    </p>
                    <p className="text-base text-slate-600 leading-relaxed flex-grow">
                      {item.description}
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 mt-auto border-t border-slate-100">
                    <Link
                      href={item.link}
                      className="block w-full text-center bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg shadow-orange-500/20 transition-all duration-300 ease-in-out hover:from-orange-700 hover:to-orange-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-600/30"
                    >
                      Lihat Dokumen
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
