import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { pdfjs } from "react-pdf";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Footer from "@/Components/landing/Footer";
import Navbar from "@/Components/landing/Navbar";
import ScrollTop from "@/Components/landing/ScrollTop";
import SidebarFilter from "@/Components/Dokumen/SidebarFilter";
import Pagination from "@/Components/Dokumen/Pagination";
import MainDoc from "@/Components/Dokumen/MainDoc";

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

  // Data dari server (laravel pagination)
  const rows = dokumen.data || [];
  const currentPage = dokumen.current_page || 1;
  const totalPages = dokumen.last_page || 1;
  const perPage = dokumen.per_page || 10;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + rows.length;

  // --- Handler perubahan filter ---
  const handleFilterChange = (field, value) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  // --- Fungsi untuk trigger pencarian ---
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

  // --- Debounce: tunggu 500ms setelah user berhenti mengetik ---
  useEffect(() => {
    const timeout = setTimeout(() => {
      performSearch();
    }, 1500); // 0.5 detik

    return () => clearTimeout(timeout); // batalkan timer kalau user masih mengetik
  }, [searchTerm, filterState]); // jalankan ulang kalau ada perubahan di filter

  // --- Tombol Reset ---
  const resetFilters = () => {
    setSearchTerm("");
    setFilterState({ jenis: "", tipe: "", tahun: "", nomor: "" });
    router.get(route("produkhukum.index"), { page: 1 }, { preserveState: true, replace: true });
  };

  // --- Pagination ---
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

  // --- Download File ---
  const handleDownload = (file, title) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = title || "dokumen.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Init AOS Animasi ---
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: "ease-in-out" });
  }, []);

  return (
    <div className="landing-container">
      <Navbar />

      <div className="flex-1 flex max-w-7xl mx-auto gap-6 p-6" data-aos="fade-down">
        {/* Konten Dokumen */}
        <div className="flex-1 space-y-6">
          <MainDoc
            currentDocuments={rows}
            filteredDocuments={rows}
            startIndex={startIndex}
            endIndex={endIndex}
            handleDownload={handleDownload}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
          />
        </div>

        {/* Sidebar Filter */}
        <SidebarFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filterState}
          handleFilterChange={handleFilterChange}
          handleSearch={performSearch} // masih bisa dipakai manual
          resetFilters={resetFilters}
          jenisOptions={props.jenisOptions || []}
          tipeOptions={props.tipeOptions || []}
        />
      </div>

      <ScrollTop />
      <Footer />
    </div>
  );
}
