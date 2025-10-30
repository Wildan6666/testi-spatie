import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Newspaper, Clock } from "lucide-react";
import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PengumumanDokumenPage() {
  const { props } = usePage();
  const pengumuman = props.pengumuman || [];

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  // 🔹 Pisahkan berdasarkan tipe
  const dokumenTerbaru = pengumuman.filter((item) => item.type === "dokumen");
  const beritaTerbaru = pengumuman.filter((item) => item.type === "berita");

  // 🔹 Komponen Section
  const Section = ({ title, icon: Icon, data, isDokumen }) => (
    <section className="mb-10" data-aos="fade-up">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 text-sm italic">Belum ada data terbaru.</p>
      ) : (
        <div className="space-y-5">
          {data.map((item) => (
            <motion.a
              key={item.id}
              href={item.link || "#"}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 bg-white hover:bg-orange-50 transition rounded-xl p-4 border border-gray-100 shadow-sm"
            >
              {/* Gambar placeholder untuk dokumen */}
              {isDokumen ? (
                <div className="w-[90px] h-[120px] flex-shrink-0 bg-gray-50 border border-orange-100 rounded overflow-hidden flex items-center justify-center">
                  <FileText className="w-8 h-8 text-orange-500" />
                </div>
              ) : (
                <div className="w-full sm:w-44 h-24 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                  <Newspaper className="w-8 h-8 text-orange-500" />
                </div>
              )}

              {/* Isi */}
              <div className="flex-1 space-y-1">
                <h3 className="text-[15px] font-semibold text-gray-800 hover:text-orange-600 transition">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 text-[11px] mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-500" />{" "}
                    {new Date(item.published_at).toLocaleDateString("id-ID")}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div
      className="landing-container min-h-screen flex flex-col 
      bg-gradient-to-b from-[#fff9f5] via-[#f6bc96] via-[#f2a87e] to-[#d97b52]
      dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#111827] dark:to-[#0a0a0a] 
      text-gray-900 dark:text-gray-200 transition-colors duration-500 ease-in-out"
    >
      <Navbar />

      {/* Header */}
      <header className="pt-24 pb-6 text-center">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">
            Informasi Terbaru JDIH Universitas Jambi
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Pembaruan dokumen hukum yang telah diverifikasi dan berita kegiatan
            terkini di lingkungan UNJA.
          </p>
        </div>
      </header>

      {/* Konten */}
      <main className="max-w-5xl mx-auto px-5 md:px-8 py-8">
        <Section
          title="Dokumen Hukum Terverifikasi"
          icon={FileText}
          data={dokumenTerbaru}
          isDokumen
        />
        <Section
          title="Berita Terbaru"
          icon={Newspaper}
          data={beritaTerbaru}
        />
      </main>

      <Footer />
    </div>
  );
}
