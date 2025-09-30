import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Eye, Download, LogIn } from "lucide-react";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import "../../css/LandingPage.css";
import "../../css/Navbar.css";

export default function LandingPage() {
  const { props } = usePage();
  const COLORS = ["#ffffff", "#fed7aa", "#fdba74"];

  // --- Data dari props (backend)
  const summary = props.summary || {};
  const terbaruData = props.terbaruData || [];
  const populerData = props.populerData || [];
  const beritaTerkini = props.beritaTerkini || [];
  const yearlyData = props.yearlyData || [];
  const monthlyData = props.monthlyData || [];
  const pieData = props.pieData || [];

  // --- Tabs Produk Hukum ---
  const [activeTab, setActiveTab] = useState("terbaru");
  const displayedData = activeTab === "terbaru" ? terbaruData : populerData;

  // --- Slider Berita Terkini ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxSlides = Math.max(0, beritaTerkini.length - itemsPerView);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const goToSlide = (index) => setCurrentSlide(Math.min(index, maxSlides));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxSlides]);

  return (
    <div className="landing-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo-container">
            <img
              src="https://jdih.perpusnas.go.id/public/style/img/LOGO-JDIHN-PHN.png"
              alt="Logo jdih"
              className="logo"
            />
            <Link href="/">
              <img
                src="https://agribisnis.unja.ac.id/wp-content/uploads/2019/11/cropped-Logo-UNJA.png"
                alt="Logo unja"
                className="logo cursor-pointer"
              />
            </Link>
          </div>

          {/* Menu */}
          <nav className="navigation">
            <a href="/" className="nav-link">Beranda</a>
            <a href="#" className="nav-link">Tentang Kami</a>
            <a href={route("produkhukum.index")} className="nav-link">Dokumen Hukum</a>
            <Link href={route("login")} className="login-button flex items-center gap-2">
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Daftar Produk Hukum */}
      <section className="section-gradient">
        <div className="section-container">
          <h2 className="section-title">Daftar Produk Hukum</h2>

          {/* Tabs */}
          <div className="tabs-container">
            <button
              type="button"
              onClick={() => setActiveTab("terbaru")}
              className={activeTab === "terbaru" ? "tab-active" : "tab-inactive"}
            >
              Peraturan Terbaru
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("populer")}
              className={activeTab === "populer" ? "tab-active" : "tab-inactive"}
            >
              Peraturan Terpopuler
            </button>
          </div>

          {/* Grid Cards */}
          <div className="grid-3-cols">
            {displayedData.map((item) => (
              <Link
                key={item.id}
                href={route("produkhukum.show", item.id)}
                className="product-card block cursor-pointer hover:shadow-lg transition"
              >
                <span className="product-tag">{item.kategori}</span>
                <h3 className="product-title">{item.judul}</h3>
                <p className="product-desc">{item.deskripsi}</p>
                <div className="product-stats">
                  <div className="stat-item">
                    <Eye size={16} /> <span>{item.views}</span>
                  </div>
                  <div className="stat-item">
                    <Download size={16} /> <span>{item.downloads}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Berita Terkini */}
      <section className="section-gradient">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-orange-600 line">
            Berita Terkini
          </h2>

          <div className="slider-container">
            <div className="slider-wrapper">
              <div
                className="slider-track"
                style={{ transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)` }}
              >
                {beritaTerkini.map((news, index) => (
                  <div
                    key={`${news.id}-${index}`}
                    className="slide"
                    style={{
                      flex: `0 0 ${100 / itemsPerView}%`,
                      maxWidth: `${100 / itemsPerView}%`,
                    }}
                  >
                    <div className="card">
                      <div className="card-image">
                        <img src={news.image} alt={news.title} />
                        <div className="card-overlay"></div>
                      </div>
                      <div className="card-content">
                        <div className="card-date">
                          <p>{news.date}</p>
                        </div>
                        <h3 className="card-title">{news.title}</h3>
                        <p className="card-desc">{news.description}</p>
                        <a href={`/berita/${news.id}`} className="card-link">
                          Baca Selengkapnya →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators */}
            {maxSlides > 0 && (
              <div className="indicators">
                {Array.from({ length: maxSlides + 1 }, (_, index) => (
                  <button
                    key={index}
                    className={`dot ${currentSlide === index ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            )}

            {/* Navigation */}
            <button className="nav-btn left" onClick={prevSlide} disabled={currentSlide === 0}>
              ←
            </button>
            <button className="nav-btn right" onClick={nextSlide} disabled={currentSlide >= maxSlides}>
              →
            </button>
          </div>
        </div>
      </section>

      {/* Statistik Section */}
      <section className="section-statistik">
        <div className="stats-container">
          <h2 className="section-title">Statistik JDIH</h2>
          <p className="stats-subtitle">
            Data visualisasi dokumentasi dan informasi hukum yang tersedia di sistem kami
          </p>

          <div className="charts-grid">
            {/* Pie Chart */}
            <div className="chart-card">
              <h3 className="chart-title">Distribusi Jenis Dokumen</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={30}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color || COLORS[index % COLORS.length]}
                        stroke="rgba(51, 47, 47, 0.562)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="chart-card">
              <h3 className="chart-title">Dokumen per Tahun</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="grey" />
                  <XAxis dataKey="tahun" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="documents" fill="orange" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart */}
          <div className="single-chart">
            <h3 className="chart-title">Trend Dokumen 6 Bulan Terakhir</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="orange"
                  strokeWidth={3}
                  dot={{ fill: "white", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="stats-summary">
            <div className="summary-item">
              <div className="summary-number">{summary.total}</div>
              <div className="summary-label">Total Dokumen</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{summary.active}</div>
              <div className="summary-label">Dokumen Aktif</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{summary.monthly}</div>
              <div className="summary-label">Dokumen Bulan Ini</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{summary.year}</div>
              <div className="summary-label">Tahun Terbaru</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900">
        <img
          src="/assets/heheh.png"
          alt="Footer Universitas Jambi"
          className="w-full object-cover"
        />
        <div className="bg-orange-200 text-dark-300 py-4 flex flex-col md:flex-row items-center justify-between px-6">
          <p className="text-sm">
            <span className="text-orange-500 font-semibold">UPATIK</span> © 2025 - All rights reserved
          </p>
          <div className="flex space-x-4 mt-3 md:mt-0 text-dark-300">
            <a href="#"><Youtube size={24} /></a>
            <a href="#"><Facebook size={24} /></a>
            <a href="#"><Twitter size={24} /></a>
            <a href="#"><Instagram size={24} /></a>
            <a href="#"><Linkedin size={24} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
