import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { pdfjs } from "react-pdf";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Footer from "@/Components/landing/Footer";
import Navbar from "@/Components/landing/Navbar";
import ScrollTop from "@/Components/landing/ScrollTop";
// import AccessibilityMenu from "@/Components/landing/AccessibilityMenu";
import SidebarFilter from "@/Components/Dokumen/SidebarFilter";
import Pagination from "@/Components/Dokumen/Pagination";
import MainDoc from "@/Components/Dokumen/MainDoc";

// --- Konfigurasi Worker PDFJS ---
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Dokumen() {
  const { props } = usePage();
  const dokumen = props.dokumen ?? {};
  const filters = props.filters ?? {};

  // --- State Filter ---
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [filterState, setFilterState] = useState({
    jenis: filters.jenis || "",
    tipe: filters.tipe || "",
    tahun: filters.tahun || "",
    nomor: filters.nomor || "",
  });

  // --- Data Pagination dari Server ---
  const rows = dokumen.data || [];
  const currentPage = dokumen.current_page || 1;
  const totalPages = dokumen.last_page || 1;
  const perPage = dokumen.per_page || 10;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + rows.length;

  // --- Fungsi Perubahan Filter ---
  const handleFilterChange = (field, value) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  // --- Trigger Pencarian ---
  const performSearch = () => {
    router.get(
      route("produkhukum.index"),
      {
        search: searchTerm,
        nomor: filterState.nomor,
        tahun: filterState.tahun,
        jenis: filterState.jenis,
        tipe: filterState.tipe,
        page: 1,
      },
      { preserveState: true, replace: true }
    );
  };

  // --- Debounce: tunggu 1.5 detik setelah user berhenti mengetik ---
  useEffect(() => {
    const timeout = setTimeout(() => {
      performSearch();
    }, 1500);
    return () => clearTimeout(timeout);
  }, [searchTerm, filterState]);

  // --- Reset Semua Filter ---
  const resetFilters = () => {
    setSearchTerm("");
    setFilterState({ jenis: "", tipe: "", tahun: "", nomor: "" });
    router.get(route("produkhukum.index"), { page: 1 }, { preserveState: true, replace: true });
  };

  // --- Pagination Handler ---
  const handlePageChange = (page) => {
    router.get(
      route("produkhukum.index"),
      {
        search: searchTerm,
        nomor: filterState.nomor,
        tahun: filterState.tahun,
        jenis: filterState.jenis,
        tipe: filterState.tipe,
        page,
      },
      { preserveState: true, replace: true }
    );
  };

  // --- Download Dokumen ---
  const handleDownload = (file, title) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = title || "dokumen.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Init Animasi AOS ---
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div
      className="landing-container min-h-screen flex flex-col 
      bg-gradient-to-b from-[#fff9f5] via-[#f6bc96] via-[#f2a87e] to-[#d97b52]
      dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#111827] dark:to-[#0a0a0a] 
      text-gray-900 dark:text-gray-200 transition-colors duration-500 ease-in-out"
    >
      {/* === Navbar === */}
      <Navbar />

      {/* === Konten Utama === */}
      <div
        className="flex-1 flex w-full max-w-6xl mx-auto gap-4 px-4 sm:px-6 lg:px-8 py-10"
        data-aos="fade-down"
      >
        {/* --- Kolom Dokumen --- */}
        <div className="flex-1 space-y-6">
          <MainDoc
            currentDocuments={rows}
            filteredDocuments={rows}
            startIndex={startIndex}
            endIndex={endIndex}
            handleDownload={handleDownload}
          />

          {/* --- Pagination --- */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
          />
        </div>

        {/* --- Sidebar Filter --- */}
        <SidebarFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filterState}
          handleFilterChange={handleFilterChange}
          handleSearch={performSearch}
          resetFilters={resetFilters}
          jenisOptions={props.jenisOptions || []}
          tipeOptions={props.tipeOptions || []}
        />
      </div>

      {/* === Elemen Tambahan === */}
      <ScrollTop />
      {/* <AccessibilityMenu /> */}
      <Footer />
    </div>
  );
}
