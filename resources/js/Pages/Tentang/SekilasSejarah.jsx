import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";
import {
  History,
  Landmark,
  FileCheck,
  Award,
  Flag,
  GitBranch,
  Lightbulb,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// ============================
// DATA SEJARAH
// ============================
const timelineData = [
  {
    year: "1974",
    title: "Awal Mula: Seminar Hukum Nasional III",
    icon: <Lightbulb size={24} />,
    content: (
      <>
        <p>
          Pembentukan JDIHN direkomendasikan dari Seminar Hukum Nasional III di
          Surabaya, yang menyoroti lemahnya dokumentasi hukum nasional.
        </p>
        <h4 className="font-semibold mt-4 mb-2 text-slate-700">
          Faktor penyebab utama:
        </h4>
        <ul className="list-decimal list-inside space-y-2 text-slate-600">
          <li>Dokumen hukum tersebar di berbagai instansi.</li>
          <li>Belum ada sistem pengelolaan terpadu.</li>
          <li>Kurangnya tenaga pengelola yang kompeten.</li>
          <li>Kurangnya perhatian terhadap dokumentasi hukum.</li>
        </ul>
      </>
    ),
  },
  {
    year: "1978",
    title: "Penunjukan BPHN sebagai Pusat Jaringan",
    icon: <Landmark size={24} />,
    content: (
      <p>
        Lokakarya di Jakarta menunjuk Badan Pembinaan Hukum Nasional (BPHN)
        sebagai Pusat Jaringan dan koordinator seluruh unit JDIHN di Indonesia.
      </p>
    ),
  },
  {
    year: "1988",
    title: "Penerbitan Manual Unit JDIH",
    icon: <FileCheck size={24} />,
    content: (
      <p>
        BPHN menerbitkan "Manual Unit JDIH" berisi 5 modul standar operasional
        sebagai panduan kerja bagi seluruh unit jaringan dokumentasi hukum.
      </p>
    ),
  },
  {
    year: "1999 & 2012",
    title: "Penguatan Kebijakan Nasional",
    icon: <Flag size={24} />,
    content: (
      <>
        <p>
          Keppres No. 91 Tahun 1999 kemudian diganti dengan{" "}
          <strong>Perpres No. 33 Tahun 2012</strong> yang memperkuat JDIHN
          sebagai jaringan dokumentasi hukum nasional.
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 mt-4">
          <li>Pengelolaan dokumen hukum terpadu dan terintegrasi.</li>
          <li>Ketersediaan informasi hukum yang akurat dan mudah diakses.</li>
          <li>Kolaborasi antar anggota jaringan hukum nasional.</li>
          <li>Peningkatan mutu pelayanan publik berbasis hukum.</li>
        </ul>
      </>
    ),
  },
  {
    year: "2019",
    title: "Standarisasi Pengelolaan Modern",
    icon: <Award size={24} />,
    content: (
      <p>
        Terbitnya <strong>Permenkumham No. 8 Tahun 2019</strong> memperbarui
        standar pengelolaan JDIH agar sejalan dengan perkembangan teknologi dan
        digitalisasi informasi hukum.
      </p>
    ),
  },
];

export default function SekilasSejarah() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Head title="Sekilas Sejarah JDIH" />
      <Navbar />

      <main className="font-sans pt-28">
        {/* ===========================
            HERO SECTION
        =========================== */}
        <section className="bg-white  py-20 px-6 text-center border-b ">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <History
              size={48}
              className="mx-auto text-orange-600 mb-4 animate-bounce-slow"
            />
            <h1 className="text-4xl lg:text-5xl font-extrabold text-orange-700 mb-4">
              Sekilas Sejarah JDIHN
            </h1>
            <p
              className="text-lg text-slate-600 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Menelusuri perjalanan pembentukan Jaringan Dokumentasi dan
              Informasi Hukum Nasional — dari gagasan awal hingga menjadi
              sistem hukum digital yang transparan dan terintegrasi.
            </p>
          </div>
        </section>

        {/* ===========================
            TIMELINE SECTION
        =========================== */}
        <section
          className="relative py-16 lg:py-20 px-6 overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, #fffaf7 0%, #fff0e6 30%, #ffe3d0 70%, #f2af82 90%, #e89876 100%)",
          }}
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Garis Vertikal */}
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-orange-200 transform md:-translate-x-1/2"></div>

            {timelineData.map((item, index) => (
              <div key={index} className="relative mb-12">
                {/* Titik Ikon */}
                <div className="absolute left-4 md:left-1/2 top-0 z-10 transform -translate-x-1/2">
                  <div className="bg-orange-600 text-white rounded-full p-3 shadow-lg ring-8 ring-orange-100">
                    {item.icon}
                  </div>
                </div>

                {/* Kartu Konten */}
                <div
                  className={`w-[calc(100%-4rem)] ml-auto md:w-5/12 p-6 bg-white rounded-xl shadow-lg border border-orange-100
                    ${
                      index % 2 === 0
                        ? "md:mr-[calc(50%+2rem)] md:ml-0"
                        : "md:ml-[calc(50%+2rem)]"
                    }`}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                >
                  <h2 className="text-2xl font-bold text-orange-600 mb-2">
                    {item.year}
                  </h2>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {item.title}
                  </h3>
                  <div className="text-slate-600 leading-relaxed space-y-3">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Blok Kesimpulan */}
          <div
            className="max-w-4xl mx-auto mt-16"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="bg-white/70 backdrop-blur-sm border-l-4 border-orange-500 p-6 rounded-r-xl shadow-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-2 flex items-center">
                <GitBranch className="mr-3" />
                Membangun Akses Informasi Terintegrasi
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Sejarah pembentukan JDIHN menjadi bukti pentingnya kolaborasi
                lintas instansi dalam menyediakan dokumentasi hukum yang
                terintegrasi dan mudah diakses. Digitalisasi menjadi kunci untuk
                memperkuat transparansi hukum di Indonesia.
              </p>
            </div>
          </div>

          {/* Gradasi halus menuju footer */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-[#e89876]" />
        </section>
      </main>

      <Footer />
    </>
  );
}
