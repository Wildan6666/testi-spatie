import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Berita({ mainNews, popularNews }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main News */}
        {mainNews && (
          <div className="mb-10" data-aos="fade-right">
            <img
              src={`/storage/${mainNews.image}`}
              alt={mainNews.title}
              className="w-full h-96 object-cover rounded-xl mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">{mainNews.title}</h1>
            <p className="text-gray-600 mb-4">{mainNews.author} • {mainNews.published_at}</p>
            <Link
              href={route("berita.public.show", mainNews.id)}
              className="text-orange-600 font-semibold"
            >
              Baca Selengkapnya →
            </Link>
          </div>
        )}

        {/* Sidebar Popular */}
        <div className="bg-white rounded-xl shadow p-6" data-aos="fade-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Berita Terpopuler</h2>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {popularNews?.map((news) => (
              <div key={news.id} className="border-b pb-2">
                <Link href={route("berita.public.show", news.id)}>
                  <h3 className="text-lg font-medium text-orange-600 hover:underline">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-500">{news.published_at}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
