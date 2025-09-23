import React, { useState, useEffect } from "react";
import { Calendar, User, ChevronRight } from "lucide-react";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { mainNews, popularNews } from "./dummy";
import "../../css/berita.css";
import "../../css/header.css";
import { Link } from "@inertiajs/react";
import Footer from "@/Components/landing/footer";
import Navbar from "@/Components/landing/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsWebsite = () => {
  const [activeTab, setActiveTab] = useState("beranda");

  // AOS untuk animasi scroll
  useEffect(() => {
    AOS.init({
      duration: 1000, // durasi animasi dalam ms
      once: true, // kalau true animasi hanya jalan sekali
      easing: "ease-in-out", // gaya transisi
    });
  }, []);

  // Komponen Kartu Berita
  const NewsCard = ({ news, isSmall = false }) => (
    <div className={`card ${isSmall ? "sidebar-item" : ""}`} data-aos="fade-up">
      <img
        src={news.image}
        alt={news.title}
        className={`card-image ${isSmall ? "card-image-small" : "card-image-medium"}`}
      />
      <div className="card-content">
        <div className="card-meta">
          <Calendar size={12} />
          <span>{news.date}</span>
          {news.category && (
            <>
              <span className="card-meta-separator">•</span>
              <span className="card-category">{news.category}</span>
            </>
          )}
        </div>
        <h3 className={`card-title ${isSmall ? "card-title-small" : "card-title-medium"}`}>
          {news.title}
        </h3>
        <div className="card-footer">
          <User size={12} />
          <span>Admin</span>
          <span className="card-read-more">Baca Selengkapnya →</span>
        </div>
      </div>
    </div>
  );

  // Return utama
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar dipanggil di sini */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hero-grid">
            {/* Main Article */}
            <div className="main-article-scroll" data-aos="fade-right">
              <div className="main-article-header">
                <img
                  src={mainNews.image}
                  alt={mainNews.title}
                  className="card-image card-image-large"
                />
                <div className="card-content card-content-large">
                  <h1 className="card-title card-title-large">{mainNews.title}</h1>
                  <div className="main-article-meta">
                    <User size={16} />
                    <span>{mainNews.author}</span>
                    <Calendar size={16} />
                    <span>{mainNews.date}</span>
                  </div>
                  <div className="main-article-body">
                    {mainNews.content.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sidebar" data-aos="fade-left">
                <div className="sidebar-header">
                  <h2 className="sidebar-title">Berita Terpopuler</h2>
                  <ChevronRight size={20} style={{ color: "#9ca3af" }} />
                </div>
                <div className="sidebar-content">
                  {popularNews.map((news) => (
                    <NewsCard key={news.id} news={news} isSmall={true} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default NewsWebsite;
