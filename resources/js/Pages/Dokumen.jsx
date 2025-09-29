import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { documents } from "./dummy";
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

const DocumentManager = () => {
  const { url } = usePage();
  const searchParams = new URLSearchParams(url.split("?")[1]);
  const searchFromURL = searchParams.get("search") || "";
  const nomorFromURL = searchParams.get("nomor") || "";
  const tahunFromURL = searchParams.get("tahun") || "";
  const jenisFromURL = searchParams.get("jenis") || "";
  const tipeFromURL = searchParams.get("tipe") || "";

  // states
  const [searchTerm, setSearchTerm] = useState(searchFromURL);
  const [filters, setFilters] = useState({
    jenisDocument: jenisFromURL,
    typeDocument: tipeFromURL,
    tahun: tahunFromURL,
    nomor: nomorFromURL,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  // Filter dokumen sesuai state
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesJenis =
      !filters.jenisDocument || doc.kategori === filters.jenisDocument;
    const matchesType =
      !filters.typeDocument || doc.type === filters.typeDocument;
    const matchesTahun =
      !filters.tahun || doc.date?.includes(filters.tahun.toString());
    const matchesNomor =
      !filters.nomor || doc.nomor?.includes(filters.nomor);

    return (
      matchesSearch &&
      matchesJenis &&
      matchesType &&
      matchesTahun &&
      matchesNomor
    );
  });

  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
  const startIndex = (currentPage - 1) * documentsPerPage;
  const endIndex = startIndex + documentsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

  // handlers
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      jenisDocument: "",
      typeDocument: "",
      tahun: "",
      nomor: "",
    });
    setCurrentPage(1);
  };

  const handleDownload = (file, title) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = title || "dokumen.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // AOS animasi scroll
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="landing-container">
      <Navbar/>

      {/* Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto gap-6 p-6" data-aos="fade-down">
        {/* Content Area */}
        <div className="flex-1 space-y-6">
          <MainDoc
            currentDocuments={currentDocuments}
            filteredDocuments={filteredDocuments}
            startIndex={startIndex}
            endIndex={endIndex}
            handleDownload={handleDownload}
          />

          {/* Pagination selalu di bawah MainDoc */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* Sidebar Filter */}
        <SidebarFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
          resetFilters={resetFilters}
          setCurrentPage={setCurrentPage}
        />
      </div>
<ScrollTop/>
      <Footer />
    </div>
  );
};

export default DocumentManager;
