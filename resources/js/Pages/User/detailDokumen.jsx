import React, { useEffect, useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import {
  Search,
  Download,
  Eye,
  ArrowLeft,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";
import ScrollTop from "@/Components/landing/ScrollTop";
import Pratinjau from "@/Components/Dokumen/Pratinjau";

export default function DetailDokumen() {
  const { props } = usePage();
  const doc = props.doc;

  const [keyword, setKeyword] = useState("");

  // Init animasi
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

      {/* Detail Dokumen */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          
          {/* Informasi Dokumen */}
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

            {/* Statistik */}
            <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                 <Eye size={16} /> <span>{doc.views ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                  <Download size={16} /> <span>{doc.downloads ?? 0}</span>
              </div>
            </div>

            {/* Tombol Aksi */}
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
                <span className="italic text-gray-500">
                  File belum tersedia
                </span>
              )}
              <Link
                href={route("produkhukum.index")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-lg shadow flex items-center gap-2"
              >
                <ArrowLeft size={18} /> Kembali
              </Link>
            </div>
          </div>

          {/* Sidebar Pencarian */}
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

        {/* Pratinjau PDF */}
        {doc.file && <Pratinjau file={doc.file} title={doc.title} />}

        <ScrollTop />
        <Footer />
      </div>
    </div>
  );
}
