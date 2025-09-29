import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronDown, Search, RotateCcw } from "lucide-react"
import "../../css/LandingPage.css";

import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";
import Statistik from "@/Components/landing/Statistik";
import ProdukHukum from "@/Components/landing/ProdukHukum";
import BeritaLanding from "@/Components/landing/BeritaLanding";
import ScrollTop from "@/Components/landing/ScrollTop";
import AccessibilityMenu from "@/Components/landing/AccessibilityMenu";

export default function LandingPage() {
  // filter states
  const [search, setSearch] = useState("");
  const [nomor, setNomor] = useState("");
  const [tahun, setTahun] = useState("");
  const [jenis, setJenis] = useState("");
  const [tipe, setTipe] = useState("");

  // submit pencarian -> redirect ke /dokumen dengan query
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    Inertia.visit(
      `/dokumen?search=${encodeURIComponent(search)}&nomor=${encodeURIComponent(
        nomor
      )}&tahun=${encodeURIComponent(tahun)}&jenis=${encodeURIComponent(
        jenis
      )}&tipe=${encodeURIComponent(tipe)}`
    );
  };

  // reset filter -> HANYA kosongkan state, tetap di LandingPage
  const handleReset = (e) => {
    if (e) e.preventDefault();
    setSearch("");
    setNomor("");
    setTahun("");
    setJenis("");
    setTipe("");
    // Tidak ada Inertia.visit di sini, supaya tetap di Landing
  };

  // enter = cari
  const enterToSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: "ease-in-out" });
  }, []);

  return (
    <div className="landing-container">
  <Navbar/>

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
            {/* Kata kunci */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={enterToSearch}
              placeholder="Cari Dokumen Hukum atau Peraturan Rektor"
              className="main-search"
            />

            <div className="filters-container">
              {/* Nomor Peraturan */}
              <div className="filter-input">
                <input
                  type="text"
                  value={nomor}
                  onChange={(e) => setNomor(e.target.value)}
                  onKeyDown={enterToSearch}
                  placeholder="Nomor Peraturan"
                />
              </div>

              {/* Tahun */}
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

              {/* Jenis Dokumen */}
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

              {/* Tipe Dokumen */}
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

            {/* Tombol aksi */}
<div className="flex gap-3 mt-3">
  {/* Tombol Cari */}
  <button
    type="submit"
    className="search-button flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium focus:ring-2 focus:ring-orange-300 transition"
  >
    <Search size={18} />
    Cari
  </button>

  {/* Tombol Reset */}
  <button
    type="button"
    onClick={handleReset}
    className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium focus:ring-2 focus:ring-gray-300 transition"
  >
    <RotateCcw size={16} />
    Reset
  </button>
</div>

          </form>
        </div>
      </section>

      {/* Komponen lain */}
      <AccessibilityMenu/>
      <ProdukHukum />
      <BeritaLanding />
      <Statistik />
      <ScrollTop/>
      <Footer />
    </div>
  );
}
