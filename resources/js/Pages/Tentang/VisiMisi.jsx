import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";

export default function TentangKami() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className="landing-container">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative py-20 overflow-hidden bg-[#fff9f5]">

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div data-aos="fade-down">
            <h2 className="text-5xl md:text-6xl font-extrabold text-orange-700 mb-6">
              Tentang Kami
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Jaringan Dokumentasi dan Informasi Hukum (JDIH) Universitas Jambi
              menyediakan akses cepat, akurat, dan transparan terhadap informasi
              hukum bagi civitas akademika maupun masyarakat umum.
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-orange-400 rounded-full opacity-10 blur-xl animate-pulse" />
        <div className="absolute top-32 right-20 w-20 h-20 bg-amber-400 rounded-full opacity-10 blur-xl animate-bounce" />

        {/* Fade halus ke warna footer */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-[#e89876]" /> */}
      </section>

      {/* Content */}
      <main
        className="relative z-10 py-16"
        style={{
          background:
            "linear-gradient(to bottom, #fff9f5, #ffe3d0, #f7b792,  #ebb191, #e89876)",
        }}
      >
        <div className="container mx-auto px-6">
          {/* Visi & Misi */}
          <section
            className="grid md:grid-cols-2 gap-12 mb-24"
            data-aos="fade-up"
          >
            {/* Visi */}
            <div
              className="relative bg-white rounded-2xl shadow-lg p-8 border border-orange-100 hover:shadow-xl transition-transform transform hover:-translate-y-1"
              data-aos="fade-right"
            >
              <h3 className="text-3xl font-bold text-orange-700 mb-4">Visi</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Menjadi pusat informasi hukum Universitas Jambi yang modern,
                transparan, dan mudah diakses untuk mendukung pembangunan hukum
                dan akademik.
              </p>
            </div>

            {/* Misi */}
            <div
              className="relative bg-white rounded-2xl shadow-lg p-8 border border-amber-100 hover:shadow-xl transition-transform transform hover:-translate-y-1"
              data-aos="fade-left"
            >
              <h3 className="text-3xl font-bold text-amber-700 mb-4">Misi</h3>
              <ul className="space-y-3">
                {[
                  "Mengumpulkan dan mengelola produk hukum Universitas Jambi.",
                  "Menyediakan akses informasi hukum yang mudah dan cepat.",
                  "Mendukung penelitian dan pengembangan di bidang hukum.",
                  "Meningkatkan kesadaran hukum di lingkungan kampus.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
