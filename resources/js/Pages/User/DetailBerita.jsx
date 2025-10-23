import React, { useEffect } from "react";
import { Calendar, User, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";
import ScrollTop from "@/Components/landing/ScrollTop";

export default function NewsWebsite({ mainNews, popularNews }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  // === Komponen Kartu Berita ===
  const NewsCard = ({ news }) => (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 duration-300"
      data-aos="fade-up"
    >
      {/* Gambar Berita */}
      {news.image && (
        <img
          src={`/storage/${news.image}`}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Konten Berita */}
      <div className="p-5">
        {/* Tanggal */}
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{news.published_at}</span>
        </div>

        {/* Judul */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">
          {news.title}
        </h3>

        {/* Deskripsi Singkat */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {news.description || news.excerpt}
        </p>

        {/* Lokasi & Tombol */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{news.author}</span>
          </div>

          <a
            href={`/berita/${news.id}`}
            className="text-orange-500 font-semibold inline-flex items-center hover:text-orange-600 transition"
          >
            Baca Selengkapnya
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  // === Halaman Utama ===
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Kolom Berita Utama */}
            <div className="md:col-span-2" data-aos="fade-right">
              {mainNews && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  {mainNews.image && (
                    <img
                      src={`/storage/${mainNews.image}`}
                      alt={mainNews.title}
                      className="w-full h-80 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar size={16} className="mr-1" />
                      <span>{mainNews.published_at}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                      {mainNews.title}
                    </h1>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <User size={14} className="mr-1" />
                      <span>{mainNews.author}</span>
                    </div>
                    <div
                      className="text-gray-700 leading-relaxed prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: mainNews.content }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Berita Populer */}
            <aside className="space-y-5" data-aos="fade-left">
              <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-extrabold text-orange-600 text-center tracking-tight"> 
                  Berita Terpopuler
              </h2>
              </div>
              <div className="grid gap-5">
                {popularNews?.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ScrollTop />
      <Footer />
    </div>
  );
}
