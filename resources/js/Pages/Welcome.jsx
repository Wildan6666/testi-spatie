import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
  PieChart,Pie,Cell,BarChart,Bar,XAxis,YAxis,
  CartesianGrid,Tooltip,Legend,ResponsiveContainer,LineChart,Line,
} from "recharts";
import { Eye, Download, LogIn, ChevronDown, Search, RotateCcw } from "lucide-react";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import "../../css/LandingPage.css";

import NavbarLogin from "@/Components/landing/NavbarLogin";
import Footer from "@/Components/landing/Footer";
import ScrollTop from "@/Components/landing/ScrollTop";


export default function LandingPage() {
  const { props } = usePage();
  const COLORS = ["#ffffff", "#fed7aa", "#fdba74"];

    // filter states
    const [search, setSearch] = useState("");
    const [nomor, setNomor] = useState("");
    const [tahun, setTahun] = useState("");
    const [jenis, setJenis] = useState("");
    const [tipe, setTipe] = useState("");
  
    const handleSearch = (e) => {
      if (e) e.preventDefault();
      router.visit(
        `/produkhukum?search=${encodeURIComponent(search)}&nomor=${encodeURIComponent(
          nomor
        )}&tahun=${encodeURIComponent(tahun)}&jenis=${encodeURIComponent(
          jenis
        )}&tipe=${encodeURIComponent(tipe)}`
      );
    };
  
    const handleReset = (e) => {
      if (e) e.preventDefault();
      setSearch("");
      setNomor("");
      setTahun("");
      setJenis("");
      setTipe("");
    };
  
    const enterToSearch = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    };
  

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
      <NavbarLogin/>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">Selamat Datang di JDIH Universitas Jambi</h1>
          <p className="hero-description">
            Menjamin terciptanya pengelolaan dokumentasi dan informasi hukum bidang pendidikan,
            penelitian dan pengabdian kepada masyarakat yang terpadu dan terintegrasi di lingkungan
            Universitas Jambi
          </p>

          {/* Filter */}
          <form
            className="search-container"
            onSubmit={handleSearch}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
            role="search"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={enterToSearch}
              placeholder="Cari Dokumen Hukum atau Peraturan Rektor"
              className="main-search"
            />

            <div className="filters-container">
              <div className="filter-input">
                <input
                  type="text"
                  value={nomor}
                  onChange={(e) => setNomor(e.target.value)}
                  onKeyDown={enterToSearch}
                  placeholder="Nomor Peraturan"
                />
              </div>

              <div className="filter-input">
                <select
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  onKeyDown={enterToSearch}
                  className="custom-select"
                >
                  <option value="">Pilih Tahun</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
                <ChevronDown className="icon-dropdown" />
              </div>

              <div className="filter-input">
                <select
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  onKeyDown={enterToSearch}
                  className="custom-select"
                >
                  <option value="">Pilih Jenis Dokumen</option>
                  <option value="Keputusan Rektor">Keputusan Rektor</option>
                  <option value="Keputusan Senat">Keputusan Senat</option>
                  <option value="Peraturan Rektor">Peraturan Rektor</option>
                  <option value="Peraturan Senat">Peraturan Senat</option>
                  <option value="Jurnal">Jurnal</option>
                  <option value="Buku Hukum">Buku Hukum</option>
                </select>
              </div>

              <div className="filter-input">
                <select
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                  onKeyDown={enterToSearch}
                  className="custom-select"
                >
                  <option value="">Pilih Tipe Dokumen</option>
                  <option value="Kepegawaian">Kepegawaian</option>
                  <option value="Tata Laksana">Tata Laksana</option>
                  <option value="Keuangan">Keuangan</option>
                  <option value="Perencanaan">Perencanaan</option>
                  <option value="Kemahasiswaan">Kemahasiswaan</option>
                  <option value="Akademik">Akademik</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-3">
              <button
                type="submit"
                className="search-button flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium focus:ring-2 focus:ring-orange-300 transition"
              >
                <Search size={18} /> Cari
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium focus:ring-2 focus:ring-gray-300 transition"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Daftar Produk Hukum */}
      <section className="section-gradient py-10" data-aos="fade-up">
        <div className="section-container max-w-7xl mx-auto px-6">
          {/* judul */}
          <h2 className="font-inter font-bold 
  text-[28px] leading-[36px]
  sm:text-[36px] sm:leading-[44px]
  md:text-[42px] md:leading-[52px]
  lg:text-[48px] lg:leading-[58px]
  xl:text-[56px] xl:leading-[66px]
  text-center text-orange-500"
              data-aos="fade-up"
          >
            Daftar Produk Hukum</h2>

          {/* Tabs */}
          <div className="tabs-container" data-aos="fade-up" data-aos-delay="100">
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

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {displayedData.map((item) => (
              <Link
                key={item.id}
                href={route("produkhukum.show", item.id)}
              className="product-card block bg-white rounded-xl border border-orange-400 
                        shadow-sm hover:shadow-lg transition overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="100"
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

      <ScrollTop/>
      <Footer/>
    </div>
  );
}
