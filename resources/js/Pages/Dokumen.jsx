import React, { useState } from "react";
import "../../css/dokumen.css";
import { Link } from "@inertiajs/react";
import { Facebook, Twitter, Youtube, Instagram, Linkedin, Eye, Download, Search } from "lucide-react";
import { sidebarCategories, documents } from "./dummy";

const DocumentManager = () => {
  const [activeTab, setActiveTab] = useState("beranda");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleDownload = (title) => {
    console.log("Downloading:", title);
    // logika download file di sini
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo-container flex items-center gap-3">
            <img
              src="https://jdih.perpusnas.go.id/public/style/img/LOGO-JDIHN-PHN.png"
              alt="Logo jdih"
              className="logo"
            />
            <Link href="/dashboard">
              <img
                src="https://th.bing.com/th/id/R.86dce44d0b6ed1a54adf1f31f0670e91?rik=2DeJsiiVWkapnA&riu=http%3a%2f%2fagribisnis.unja.ac.id%2fwp-content%2fuploads%2f2019%2f11%2fcropped-Logo-UNJA.png&ehk=DYTHw8EoXNZdJLcttayfQVg0mX13Cu37ohMIJRTg8gw%3d&risl=&pid=ImgRaw&r=0"
                alt="Logo unja"
                className="logo cursor-pointer"
              />
            </Link>
          </div>

          {/* Menu */}
          <nav className="navigation">
            <a href="/dashboard" className="nav-link">
              Beranda
            </a>
            <a href="#" className="nav-link">
              Tentang Kami
            </a>
            <a href="#" className="nav-link">
              Dokumen Hukum
            </a>
            <Link
              href="/logout"
              method="post"
              as="button"
              className="login-button"
            >
              Logout
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout flex gap-6 ">
        {/* Content Area */}
        <main className="content-area flex-1 ">
          <h1 className="page-title mb-6 font-bold text-xl">
            Repository Dokumen Dan LKK Jambi OnBoard
          </h1>

          <div className="documents-list flex flex-col gap-4">
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="flex gap-4 p-4 bg-white rounded-2xl shadow-md border"
              >
                {/* Thumbnail Dokumen */}
                <div className="w-28 h-40 border rounded-md overflow-hidden shadow-sm flex-shrink-0">
                  <img
                    src={
                      document.thumbnail || "https://via.placeholder.com/120x160"
                    }
                    alt="Dokumen"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Konten Dokumen */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Badge + Judul */}
                  <div>
                    <span className="bg-orange-400 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {document.kategori || "Dokumen"}
                    </span>

                    <h3 className="text-lg font-semibold mt-2 leading-snug">
                      {document.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {document.description ||
                        "Deskripsi dokumen belum tersedia."}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-200 mt-3 flex flex-col gap-2 rounded-sm p-2">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      Status:
                      <span
                        className={`px-2 py-0.5 rounded-sm text-xs text-white ${
                          document.status === "Berlaku"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {document.status || "Tidak Berlaku"}
                      </span>
                      <span className="text-gray-500">
                        Ditetapkan: <b>{document.date || "-"}</b>
                      </span>
                      <span className="text-gray-500">
                        Diundangkan: <b>{document.published || "-"}</b>
                      </span>
                    </div>
                  </div>

                  {/* Statistik */}
                  <div className="flex items-center gap-5 text-gray-500 text-sm mt-2">
                    <span className="flex items-center gap-1">
                      <Eye size={16} /> {document.lihat || 0}
                    </span>
                    <span
                      className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
                      onClick={() => handleDownload(document.title)}
                    >
                      <Download size={16} /> {document.unduh || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <div className="sidebar-container">
          <h3 className="sidebar-title">Cari Peraturan</h3>

          <label className="sidebar-label">Kata Kunci :</label>
          <input
            type="text"
            className="sidebar-input"
            placeholder="Keputusan Rektor"
          />

          <label className="sidebar-label">Jenis Dokumen :</label>
          <select className="sidebar-select">
            <option>Pilih Jenis Dokumen</option>
            <option>Peraturan Rektor</option>
            <option>Surat Keputusan</option>
          </select>

          <label className="sidebar-label">Tahun :</label>
          <input
            type="text"
            className="sidebar-input"
            placeholder="Tahun"
          />

          <label className="sidebar-label">Nomor :</label>
          <input
            type="text"
            className="sidebar-input"
            placeholder="Nomor"
          />

          <label className="sidebar-label">Status :</label>
          <select className="sidebar-select">
            <option>Pilih Status</option>
            <option>Berlaku</option>
            <option>Tidak Berlaku</option>
          </select>

          <button className="sidebar-button">
  Cari 
  <Search size={16} className="sidebar-button-icon ml-2" />
</button>
        </div>
      </div>

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

export default DocumentManager;
