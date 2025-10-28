import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Newspaper, Clock } from "lucide-react";
import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PengumumanDokumenPage() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const dokumenTerbaru = [
    {
      id: 1,
      title: "Peraturan Rektor No. 05 Tahun 2025",
      subtitle: "Tata Kelola Sistem Informasi di Universitas Jambi",
      author: "Biro Hukum UNJA",
      time: "3 jam yang lalu",
      image: "/storage/dokumen-hukum.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Keputusan Dekan Fakultas Hukum No. 12 Tahun 2025",
      subtitle: "Penyusunan Pedoman Penelitian dan Pengabdian Masyarakat",
      author: "Fakultas Hukum UNJA",
      time: "1 hari yang lalu",
      image: "/storage/peraturan-fh.jpg",
      link: "#",
    },
  ];

  const beritaTerbaru = [
    {
      id: 1,
      title: "Sosialisasi Digitalisasi Produk Hukum",
      subtitle: "Kegiatan Biro Hukum dan UPT TIK Universitas Jambi",
      author: "Humas UNJA",
      time: "2 hari yang lalu",
      image: "/storage/berita-jdih.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Pelatihan Pengelolaan Dokumen Elektronik JDIH",
      subtitle: "Kegiatan rutin penguatan kapasitas admin unit kerja di UNJA",
      author: "UPT TIK UNJA",
      time: "5 hari yang lalu",
      image: "/storage/berita-pelatihan.jpg",
      link: "#",
    },
  ];

  const Section = ({ title, icon: Icon, data, isDokumen }) => (
    <section className="mb-10" data-aos="fade-up">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      <div className="space-y-5">
        {data.map((item) => (
          <motion.a
            key={item.id}
            href={item.link}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 bg-white hover:bg-orange-50 transition rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            {/* Gambar */}
            {isDokumen ? (
              <div className="w-[90px] h-[120px] flex-shrink-0 bg-gray-50 border border-orange-100 rounded overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain w-full h-full hover:scale-105 transition duration-300"
                />
              </div>
            ) : (
              <div className="w-full sm:w-44 h-24 bg-gray-200 rounded overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full hover:scale-105 transition duration-300"
                />
              </div>
            )}

            {/* Isi */}
            <div className="flex-1 space-y-1">
              <h3 className="text-[15px] font-semibold text-gray-800 hover:text-orange-600 transition">
                {item.title}
              </h3>
              <p className="text-gray-600 text-[13px] leading-relaxed">
                {item.subtitle}
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-[11px] mt-1">
                <span>{item.author}</span>•
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-500" /> {item.time}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );

  return (
    <div className="landing-container min-h-screen flex flex-col 
      bg-gradient-to-b from-[#fff9f5] via-[#f6bc96] via-[#f2a87e] to-[#d97b52]
      dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#111827] dark:to-[#0a0a0a] 
      text-gray-900 dark:text-gray-200 transition-colors duration-500 ease-in-out">
      <Navbar />

      {/* Header */}
      <header className="pt-24 pb-6 text-center">
        <div className="max-w-3xl mx-auto px-5">  
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">
            Informasi Terbaru JDIH Universitas Jambi
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Pembaruan dokumen hukum dan berita kegiatan terkini di JDIH UNJA.
          </p>
        </div>
      </header>

      {/* Konten */}
      <main className="max-w-5xl mx-auto px-5 md:px-8 py-8">
        <Section
          title="Dokumen Hukum Terbaru"
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
