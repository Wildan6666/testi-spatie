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
  const { props, url } = usePage();
  const dokumen = props.dokumen ?? {};
  const filters = props.filters ?? {};

  // Ambil state dari props/URL
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [filterState, setFilterState] = useState({
    jenisDocument: filters.jenis || "",
    typeDocument: filters.tipe || "",
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

  // --- Handlers ---
  const handleFilterChange = (field, value) => {
    const next = { ...filterState, [field]: value };
    setFilterState(next);
  };

  const handleSearch = () => {
    router.get(
      route("dokumen.index"),
      {
        search: searchTerm,
        nomor: filterState.nomor,
        tahun: filterState.tahun,
        jenis: filterState.jenisDocument,
        tipe: filterState.typeDocument,
        page: 1,
      },
      { preserveState: true, replace: true }
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    const next = { jenisDocument: "", typeDocument: "", tahun: "", nomor: "" };
    setFilterState(next);

    router.get(route("dokumen.index"), { page: 1 }, { preserveState: true, replace: true });
  };

  const handlePageChange = (page) => {
    router.get(
      route("dokumen.index"),
      {
        search: searchTerm,
        nomor: filterState.nomor,
        tahun: filterState.tahun,
        jenis: filterState.jenisDocument,
        tipe: filterState.typeDocument,
        page,
      },
      { preserveState: true, replace: true }
    );
  };

  const handleDownload = (file, title) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = title || "dokumen.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Init AOS animasi
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="landing-container">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto gap-6 p-6" data-aos="fade-down">
        
        {/* Content Area */}
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
          handleSearch={handleSearch}
          resetFilters={resetFilters}
        />
      </div>

      <ScrollTop />
      <Footer />
    </div>
  );
}
