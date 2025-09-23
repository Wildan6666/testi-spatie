import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Inertia } from '@inertiajs/inertia';
import '../../css/LandingPage.css';
import '../../css/header.css';
import { ChevronDown } from "lucide-react";
import { Eye, Download, LogIn } from "lucide-react";
import { terbaruData, populerData, beritaTerkini, yearlyData, monthlyData, pieData } from "./dummy";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";


export default function LandingPage() {

  const COLORS = ['#ffffff', '#fed7aa', '#fdba74'];

// --- Tabs Produk Hukum ---
const [activeTab, setActiveTab] = useState("terbaru");
const displayedData = activeTab === "terbaru" ? terbaruData : populerData;

// --- Slider Berita Terkini ---
const [currentSlide, setCurrentSlide] = useState(0);
const [itemsPerView, setItemsPerView] = useState(3);

  // Update items per view berdasarkan ukuran layar
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
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxSlides = Math.max(0, beritaTerkini.length - itemsPerView);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlides));
  };


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
    src="https://th.bing.com/th/id/R.86dce44d0b6ed1a54adf1f31f0670e91?rik=2DeJsiiVWkapnA&riu=http%3a%2f%2fagribisnis.unja.ac.id%2fwp-content%2fuploads%2f2019%2f11%2fcropped-Logo-UNJA.png&ehk=DYTHw8EoXNZdJLcttayfQVg0mX13Cu37ohMIJRTg8gw%3d&risl=&pid=ImgRaw&r=0" 
    alt="Logo unja" 
    className="logo cursor-pointer"
/>
</Link>
          </div>

          {/* Menu */}
          <nav className="navigation">
            <a href="/" className="nav-link">Beranda</a>
            <a href="#" className="nav-link">Tentang Kami</a>
            <a href="#" className="nav-link">Dokumen Hukum</a>
    <Link
      href={route("login")}
      className="login-button flex items-center gap-2"
    >
      <LogIn size={18} />
      <span>Login</span>
    </Link>
          </nav>
        </div>
  </header>

    {/* Hero Section */}
    <section className="hero-section">
        {/* Overlay putih transparan */}
        <div className="hero-overlay"></div>

        {/* Konten */}
        <div className="hero-content">
          <h1 className="hero-title">
            Selamat Datang di JDIH Universitas Jambi
          </h1>
          <p className="hero-description">
            Menjamin terciptanya pengelolaan dokumentasi dan informasi hukum bidang pendidikan,
            penelitian dan pengabdian kepada masyarakat yang terpadu dan terintegrasi di lingkungan
            Universitas Jambi
          </p>

          <div className="search-container">
            {/* Input utama */}
            <input
              type="text"
              placeholder="Cari Dokumen Hukum atau Peraturan Rektor"
              className="main-search"
            />

            {/* Input & dropdown filter */}
            <div className="filters-container">
              {/* Input Nomor Peraturan */}
              <div className="filter-input">
                <input
                  type="text"
                  placeholder="Nomor Peraturan"
                />
              </div>

  <div className="filter-input">
      <select defaultValue="" className="custom-select">
        <option value="" hidden>
          Pilih Tahun
        </option>
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

              {/* Dropdown Status */}
              <div className="filter-input">
                <select className="custom-select">
                  <option value="">Status</option>
                  <option value="berlaku">Berlaku</option>
                  <option value="dicabut">Dicabut</option>
                  <option value="dicabut">Revisi</option>
                </select>
              </div>

              {/* Dropdown Jenis Dokumen */}
              <div className="filter-input">
                <select className="custom-select">
                  <option value="">Pilih Jenis Dokumen</option>
                  <option value="peraturan">Peraturan Rektor</option>
                  <option value="keputusan">Keputusan Rektor</option>
                  <option value="surat-edaran">Surat Edaran</option>
                </select>
              </div>

              {/* Dropdown Tipe Dokumen */}
              <div className="filter-input">
                <select className="custom-select">
                  <option value="">Pilih Tipe Dokumen</option>
                  <option value="akademik">Akademik</option>
                  <option value="keuangan">Keuangan</option>
                  <option value="kepegawaian">Kepegawaian</option>
                </select>
              </div>
            </div>

            {/* Tombol cari */}
            <button className="search-button">
              Cari
            </button>
          </div>
        </div>
    </section>

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
    {/* Grid Cards */}
    <div className="grid-3-cols">
      {displayedData.map((item) => (
        <Link
          key={item.id}
          href={route("detailDokumen", { id: item.id })} 
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



{/*Berita terkini*/}
    <section className="section-gradient">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-200 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-orange-600 line">
          Berita Terkini
        </h2>

<div className="slider-container">
  <div className="slider-wrapper">
    <div 
      className="slider-track"
      style={{
        transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`
      }}
    >
      {beritaTerkini.map((news, index) => (
        <div 
          key={`${news.id}-${index}`} 
          className="slide"
          style={{ 
            flex: `0 0 ${100 / itemsPerView}%`,
            maxWidth: `${100 / itemsPerView}%`
          }}
        >
          <div className="card">
            {/* Image */}
            <div className="card-image">
              <img src={news.image} alt={news.title} />
              <div className="card-overlay"></div>
            </div>

            {/* Content */}
            <div className="card-content">
              <div className="card-date">
                <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 0 0-1 1v18l7-3 7 3V3a1 1 0 0 0-1-1H6z " clipRule="evenodd" />
                </svg>
                <p>{news.date}</p>
              </div>

              <h3 className="card-title">{news.title}</h3>
              <p className="card-desc">{news.description}</p>

              <a href="/Berita" className="card-link">
                Baca Selengkapnya
                <svg className="icon ml" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
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
          className={`dot ${currentSlide === index ? 'active' : ''}`}
          onClick={() => goToSlide(index)}
        />
      ))}
    </div>
  )}
</div>
  {/* Navigation Buttons */}
  <button 
    className="nav-btn left" 
    onClick={prevSlide} 
    disabled={currentSlide === 0}
  >
    <svg className="icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button 
    className="nav-btn right" 
    onClick={nextSlide} 
    disabled={currentSlide >= maxSlides}
  >
    <svg className="icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
</section>

    {/* Statistik Section dengan Charts */}
    <section className="section-statistik">
        <div className="stats-container">
          <h2 className="section-title">Statistik JDIH</h2>
          <p className="stats-subtitle">
            Data visualisasi dokumentasi dan informasi hukum yang tersedia di sistem kami
          </p>
          
{/* Charts Grid */}
          <div className="charts-grid">
{/*paichart*/}
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
        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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
      <Tooltip 
        contentStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #ea580c',
          borderRadius: '8px',
          color: '#333',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        formatter={(value, name) => [`${value} dokumen`, name]}
      />
      <Legend 
        verticalAlign="bottom" 
        height={36}
        iconType="circle"
        wrapperStyle={{
          paddingTop: '20px',
          fontSize: '14px'
        }}
      />
    </PieChart>
  </ResponsiveContainer>
</div>

{/* Bar Chart - Dokumen per Tahun */}
            <div className="chart-card">
              <h3 className="chart-title">Dokumen per Tahun</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="grey" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fill: 'grey' }}
                    axisLine={{ stroke: 'grey' }}
                  />
                  <YAxis 
                    tick={{ fill: 'grey' }}
                    axisLine={{ stroke: 'grey' }}
                  />
                  <Tooltip 
        contentStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #ea580c',
          borderRadius: '8px',
          color: '#333',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
                  />
                  <Bar dataKey="documents" fill="orange" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

{/* Line Chart - Trend 6 Bulan Terakhir */}
          <div className="single-chart">
            <h3 className="chart-title">Trend Dokumen 6 Bulan Terakhir</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="grey" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'black' }}
                  axisLine={{ stroke: 'gray' }}
                />
                <YAxis 
                  tick={{ fill: 'black' }}
                  axisLine={{ stroke: 'grey' }}
                />
        <Tooltip 
        contentStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #ea580c',
          borderRadius: '8px',
          color: '#333',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="orange" 
                  strokeWidth={3}
                  dot={{ fill: 'white', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

{/* Summary Stats */}
          <div className="stats-summary">
            <div className="summary-item">
              <div className="summary-number">1,371</div>
              <div className="summary-label">Total Dokumen</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">89%</div>
              <div className="summary-label">Dokumen Aktif</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">42</div>
              <div className="summary-label">Dokumen Bulan Ini</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">2025</div>
              <div className="summary-label">Tahun Terbaru</div>
            </div>
          </div>
        </div>
    </section>

{/*Footer*/}
    <footer className="w-full bg-gray-900">
      {/* Gambar Footer */}
    
    <img 
    src="/assets/heheh.png" 
    alt="Footer Universitas Jambi" 
    className="w-full object-cover" 
    />

      {/* Copyright + Sosial Media */}
    <div className="bg-orange-200 text-dark-300 py-4 flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-sm">
        <span className="text-orange-500 font-semibold">UPATIK</span> © 2025 - All rights reserved
        </p>
<div className="flex space-x-4 mt-3 md:mt-0 text-dark-300">
    <a href="#" className="hover:text-red-500"><Youtube size={24} /></a>
    <a href="#" className="hover:text-blue-600"><Facebook size={24} /></a>
    <a href="#" className="hover:text-sky-400"><Twitter size={24} /></a>
    <a href="#" className="hover:text-pink-500"><Instagram size={24} /></a>
    <a href="#" className="hover:text-blue-500"><Linkedin size={24} /></a>
</div>
    </div>
    </footer>

    </div>
  );
}