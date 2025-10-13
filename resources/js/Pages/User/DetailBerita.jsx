import React, { useEffect } from "react";
import { Calendar, User, ChevronRight } from "lucide-react";
import "../../../css/berita.css";
import Footer from "@/Components/landing/footer";
import Navbar from "@/Components/landing/Navbar";
import ScrollTop from "@/Components/landing/ScrollTop";
// import AccessibilityMenu from "@/Components/landing/AccessibilityMenu";
import AOS from "aos";
import "aos/dist/aos.css";

export default function NewsWebsite({ mainNews, popularNews }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  // Komponen Kartu Berita
  const NewsCard = ({ news, isSmall = false }) => (
    <div className={`card ${isSmall ? "sidebar-item" : ""}`} data-aos="fade-up">
      {news.image && (
        <img
          src={`/storage/${news.image}`} // ✅ ambil gambar dari storage
          alt={news.title}
          className={`card-image ${isSmall ? "card-image-small" : "card-image-medium"}`}
        />
      )}
      <div className="card-content">
        <div className="card-meta">
          <Calendar size={12} />
          <span>{news.published_at}</span>
        </div>
        <h3 className={`card-title ${isSmall ? "card-title-small" : "card-title-medium"}`}>
          {news.title}
        </h3>
        <div className="card-footer">
          <User size={12} />
          <span>{news.author}</span>
          <span className="card-read-more">Baca Selengkapnya →</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hero-grid">
            {/* Main Article */}
            {mainNews && (
              <div className="main-article-scroll" data-aos="fade-right">
                <div className="main-article-header">
                  {mainNews.image && (
                    <img
                      src={`/storage/${mainNews.image}`}
                      alt={mainNews.title}
                      className="card-image card-image-large"
                    />
                  )}
                  <div className="card-content card-content-large">
                    <h1 className="card-title card-title-large">{mainNews.title}</h1>
                    <div className="main-article-meta">
                      <User size={16} />
                      <span>{mainNews.author}</span>
                      <Calendar size={16} />
                      <span>{mainNews.published_at}</span>
                    </div>
                    <div
                      className="main-article-body"
                      dangerouslySetInnerHTML={{ __html: mainNews.content }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar */}
            <div>
              <div className="sidebar" data-aos="fade-left">
                <div className="sidebar-header">
                  <h2 className="sidebar-title">Berita Terpopuler</h2>
                  <ChevronRight size={20} style={{ color: "#9ca3af" }} />
                </div>
                <div className="sidebar-content">
                  {popularNews?.map((news) => (
                    <NewsCard key={news.id} news={news} isSmall={true} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AccessibilityMenu/> */}
      <ScrollTop />
      <Footer />
    </div>
  );
}
