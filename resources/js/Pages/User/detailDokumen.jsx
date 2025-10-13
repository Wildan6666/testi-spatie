import React, { useEffect, useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { Search, Download, Eye, ArrowLeft } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import TreeList from "@/Components/Dokumen/TreeList";
import { Book, Building, FileText, ChevronRight } from "lucide-react";


import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";
import ScrollTop from "@/Components/landing/ScrollTop";
import Pratinjau from "@/Components/Dokumen/Pratinjau";

export default function DetailDokumen() {
  const { props } = usePage();
  const doc = props.doc;

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: "ease-in-out" });
  }, []);

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <h2 className="text-xl font-bold text-red-500">
            Dokumen tidak ditemukan!
          </h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="landing-container">
      <Navbar />

      <div className="flex-1 
  bg-gradient-to-b from-[#fff9f5] via-[#f6bc96] via-[#f2a87e] to-[#d97b52]
  dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#111827] dark:to-[#0a0a0a] 
  text-gray-900 dark:text-gray-200 transition-colors duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* ===== DETAIL UTAMA ===== */}
          <div
            className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6"
            data-aos="fade-right"
          >
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-orange-700 mb-2">
                {doc.title}
              </h2>
              <p className="text-gray-600 text-sm">
                No: {doc.nomor} | Tahun: {doc.tahun}
              </p>
            </div>

            {/* INFORMASI DOKUMEN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-medium text-gray-700">Kategori:</span>
                <p>{doc.kategori ?? "-"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Nomor Dokumen:</span>
                <p>{doc.nomor ?? "-"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <p
                  className={`font-semibold ${
                    doc.status === "Berlaku"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {doc.status ?? "-"}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Tanggal Penetapan:
                </span>
                <p>{doc.date ?? "-"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Tanggal Pengundangan:
                </span>
                <p>{doc.published ?? "-"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Jenis Hukum:</span>
                <p>{doc.jenis ?? "-"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tipe Dokumen:</span>
                <p>{doc.type ?? "-"}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Instansi:</span>
                <p>{doc.instansi ?? "-"}</p>
              </div>
            </div>

     {/* ===== STRUKTUR TREE ===== */}
{(doc.ancestors?.length > 0 || doc.treeChildren?.length > 0) && (
  <div
    className="mt-8 bg-white border border-orange-200 rounded-xl p-6 shadow-sm"
    data-aos="fade-up"
  >
    <h3 className="font-bold text-orange-700 text-lg mb-3 flex items-center gap-2">
       Struktur Produk Hukum
    </h3>

{/* ===== Jalur Induk (Breadcrumb Profesional) ===== */}
{doc.ancestors && doc.ancestors.length > 0 && (
  <div
    className="mb-6 bg-white border border-orange-200 rounded-xl p-5 shadow-sm"
    data-aos="fade-right"
  >
    <h3 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
      <Book size={18} className="text-orange-600" />
      Dokumen Induk
    </h3>

    <div className="flex flex-wrap items-center gap-2 text-sm">
      {doc.ancestors.map((p, idx) => (
        <React.Fragment key={idx}>
          <Link
            href={`/produkhukum/${p.id}`}
            title={p.judul}
            className="group flex items-center gap-2 bg-gradient-to-r from-orange-50 to-white border border-orange-200 hover:border-orange-400 text-gray-700 hover:text-orange-600 font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
          >
            {/* Ikon sesuai urutan */}
            {idx === 0 ? (
              <Book size={14} className="text-orange-500 group-hover:scale-110 transition-transform" />
            ) : (
              <Building size={14} className="text-orange-500 group-hover:scale-110 transition-transform" />
            )}
            <span>{p.judul}</span>
          </Link>

          {idx < doc.ancestors.length - 1 && (
            <ChevronRight size={14} className="text-gray-400" />
          )}
        </React.Fragment>
      ))}

      {/* Dokumen saat ini (aktif) */}
      <div className="flex items-center gap-2 bg-orange-500 text-white font-semibold px-3 py-1.5 rounded-lg shadow-inner">
        <FileText size={14} />
        <span>{doc.title}</span>
      </div>
    </div>
  </div>
)}

 <div
    className="mb-6 bg-white border border-orange-200 rounded-xl p-5 shadow-sm"
    data-aos="fade-right"
  >
    {/* Pohon turunan */}
    <h3 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
      <Book size={18} className="text-orange-600" />
      Dokumen Turunan
    </h3>
    {doc.treeChildren && doc.treeChildren.length > 0 ? (
      <TreeList nodes={doc.treeChildren} />
    ) : (
      <p className="text-gray-500 italic text-sm">
        Tidak ada dokumen turunan.
      </p>
    )}
  </div>
  </div>
)}

            {/* STATISTIK */}
            <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Eye size={16} /> <span>{doc.views ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download size={16} /> <span>{doc.downloads ?? 0}</span>
              </div>
            </div>

            {/* TOMBOL AKSI */}
            <div className="mt-6 flex gap-4">
              {doc.file ? (
                <a
                  href={doc.file}
                  download={doc.title}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2 shadow"
                >
                  <Download size={18} /> Unduh Dokumen
                </a>
              ) : (
                <span className="italic text-gray-500">File belum tersedia</span>
              )}
              <Link
                href={route("produkhukum.index")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-lg shadow flex items-center gap-2"
              >
                <ArrowLeft size={18} /> Kembali
              </Link>
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside
            className="bg-white shadow-lg rounded-xl p-6"
            data-aos="fade-left"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Cari Peraturan
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Contoh : Keputusan Rektor"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                onClick={() => {
                  if (keyword.trim() !== "") {
                    window.location.href = `/produkhukum?search=${encodeURIComponent(
                      keyword
                    )}`;
                  }
                }}
                className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
              >
                <Search size={16} /> Cari
              </button>
            </div>
          </aside>
        </div>

        {/* PRATINJAU PDF */}
        {doc.file && <Pratinjau file={doc.file} title={doc.title} />}

        <ScrollTop />
        <Footer />
      </div>
    </div>
  );
}
