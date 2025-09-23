import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../css/header.css";
import {
  Eye,
  Download,
  Search,
  FileText,
  Filter,
  RotateCcw,
} from "lucide-react";
import { documents } from "./dummy";
import { pdfjs } from "react-pdf";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/Components/landing/Footer";
import Navbar from "@/Components/landing/Navbar";

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
      matchesSearch && matchesJenis && matchesType && matchesTahun && matchesNomor
    );
  });

  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
  const startIndex = (currentPage - 1) * documentsPerPage;
  const endIndex = startIndex + documentsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

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
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto gap-6 p-6" data-aos="fade-down">
        {/* Content Area */}
        <main className="flex-1 space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow p-6 border">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Repository Dokumen dan LKK Jambi OnBoard
            </h1>
            <p className="text-gray-600">
              Menampilkan {startIndex + 1} sampai{" "}
              {Math.min(endIndex, filteredDocuments.length)} dari{" "}
              <span className="font-semibold text-orange-600">
                {filteredDocuments.length}
              </span>{" "}
              Produk Hukum
            </p>
          </div>

          {/* Documents List */}
          <div className="space-y-4" data-aos="fade-up">
            {currentDocuments.length > 0 ? (
              currentDocuments.map((document, index) => (
                <Link
                  key={document.id}
                  href={`/detaildokumen/${document.id}`}
                  className="block"
                  data-aos="fade-up"
                  data-aos-delay={index * 70}
                >
                  <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-lg hover:border-orange-400 transition cursor-pointer">
                    <div className="flex gap-6">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-32 border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                          <FileText size={32} className="text-gray-400" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-3">
                          <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                            {document.kategori}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {document.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {document.description}
                        </p>
                        <div className="bg-gray-200 rounded-xl p-3">
                          <div className="flex flex-wrap items-center justify-between text-sm ">
                            <div className="flex flex-wrap items-center gap-4 text-gray-600">
                              <span>
                                Ditetapkan:{" "}
                                <span className="font-medium">{document.date}</span>
                              </span>
                              <span>
                                Diundangkan:{" "}
                                <span className="font-medium">
                                  {document.published}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600">
                              <div className="flex items-center gap-1">
                                <Eye size={16} />
                                <span>{document.lihat}</span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDownload(document.file, document.title);
                                }}
                                className="flex items-center gap-1 hover:text-orange-600"
                              >
                                <Download size={16} />
                                <span>{document.unduh}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow p-12 text-center border">
                <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada dokumen ditemukan
                </h3>
                <p className="text-gray-600">
                  Coba ubah kriteria pencarian atau filter Anda
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="bg-white rounded-xl shadow-md border p-4 mt-6"
              data-aos="fade-left"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  {/* Prev */}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border 
                      ${
                        currentPage === 1
                          ? "opacity-50 cursor-not-allowed border-gray-300"
                          : "hover:bg-orange-50 hover:text-orange-600 border-gray-300"
                      }`}
                  >
                    ‹
                  </button>

                  {/* Numbers */}
                  {(() => {
                    const windowSize = 5;
                    const startPage = Math.max(
                      Math.min(currentPage, totalPages - windowSize + 1),
                      1
                    );
                    const endPage = Math.min(
                      startPage + windowSize - 1,
                      totalPages
                    );

                    return Array.from(
                      { length: endPage - startPage + 1 },
                      (_, i) => startPage + i
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition 
                          ${
                            currentPage === page
                              ? "bg-orange-500 text-white border-orange-500 shadow-md scale-105"
                              : "hover:bg-orange-50 hover:text-orange-600 border-gray-300"
                          }`}
                      >
                        {page}
                      </button>
                    ));
                  })()}

                  {/* Next */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border 
                      ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed border-gray-300"
                          : "hover:bg-orange-50 hover:text-orange-600 border-gray-300"
                      }`}
                  >
                    ›
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Menampilkan halaman{" "}
                  <span className="font-semibold text-orange-600">
                    {currentPage}
                  </span>{" "}
                  dari{" "}
                  <span className="font-semibold">{totalPages}</span> halaman
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Sidebar Filter */}
        <aside className="w-80 space-y-4" data-aos="fade-left">
          <div className="bg-white rounded-xl p-6 shadow-md border relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 rounded-t-xl"></div>
            <h3 className="font-semibold text-lg text-gray-800 mb-6 flex items-center gap-2">
              <Filter size={20} className="text-orange-500" /> Cari Peraturan
            </h3>

            {/* Search */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-semibold text-gray-700">
                Kata Kunci :
              </label>
              <input
                type="text"
                placeholder="Contoh : Keputusan Rektor"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm shadow-sm"
              />
            </div>

            {/* Jenis */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-semibold text-gray-700">
                Jenis Dokumen :
              </label>
              <select
                value={filters.jenisDocument}
                onChange={(e) =>
                  handleFilterChange("jenisDocument", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm text-gray-600"
              >
                <option value="">Pilih Jenis Dokumen</option>
                <option value="Peraturan Rektor">Peraturan Rektor</option>
                <option value="Keputusan Rektor">Keputusan Rektor</option>
                <option value="Surat Edaran">Surat Edaran</option>
                <option value="Instruksi">Instruksi</option>
              </select>
            </div>

            {/* Tipe */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-semibold text-gray-700">
                Tipe Dokumen :
              </label>
              <select
                value={filters.typeDocument}
                onChange={(e) =>
                  handleFilterChange("typeDocument", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm text-gray-600"
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

            {/* Tahun */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-semibold text-gray-700">
                Tahun :
              </label>
              <input
                type="number"
                placeholder="Tahun"
                value={filters.tahun}
                onChange={(e) => handleFilterChange("tahun", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm shadow-sm"
                min="2000"
                max={new Date().getFullYear()}
              />
            </div>

            {/* Nomor */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-semibold text-gray-700">
                Nomor :
              </label>
              <input
                type="text"
                placeholder="Nomor dokumen"
                value={filters.nomor}
                onChange={(e) => handleFilterChange("nomor", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm shadow-sm"
              />
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleSearch}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Search size={18} /> Cari
              </button>
              <button
                onClick={resetFilters}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> Reset Filter
              </button>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default DocumentManager;
