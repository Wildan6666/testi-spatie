import React from "react";
import { Link } from '@inertiajs/react';
import '../../css/LandingPage.css';
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { FileText, Search } from "lucide-react";
import { documents } from "./dummy";

export default function DetailDokumen({ id }) {
  const [keyword, setKeyword] = useState("");
  
  const document = documents.find((documents) => documents.id === id);

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
            <a href="/dashboard" className="nav-link">Beranda</a>
            <a href="#" className="nav-link">Tentang Kami</a>
            <a href="/dokumen" className="nav-link">Dokumen Hukum</a>
        <Link
          href="/logout"
          method="post"
          as="button"
          className="login-button"
        >
          <span>Logout</span>
        </Link>
        
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Detail Dokumen */}
        <div className="col-span-2 bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-bold text-orange-700 mb-2">
            {documents.title}
          </h2>
          <p className="text-gray-600 mb-4">Pengangkatan Daftar Peserta Magang Laboratorium</p>

          <div className="flex gap-6">
            <div className="w-32">
              <img src="/dummy-doc.png" alt="Dokumen" className="w-full shadow rounded" />
              <button className="w-full mt-3 bg-orange-500 text-white py-2 rounded-lg">
                Download
              </button>
            </div>

            <div className="flex-1 space-y-2 text-sm">
              <p><strong>Jenis Dokumen:</strong> Keputusan Rektor</p>
              <p><strong>Nomor:</strong> 111</p>
              <p><strong>Tempat Penetapan:</strong> Jambi</p>
              <p><strong>Tanggal Penetapan:</strong> 01 Juli 2025</p>
              <p><strong>Bahasa:</strong> Bahasa Indonesia</p>
              <p><strong>Status:</strong> Berlaku</p>
            </div>
          </div>
        </div>

        {/* Sidebar Pencarian */}
        <aside className="bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-3">Cari Peraturan</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Contoh : Keputusan Rektor"
              className="w-full border rounded-lg px-3 py-2"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Pilih Jenis Dokumen</option>
              <option>Peraturan Rektor</option>
              <option>Keputusan Rektor</option>
            </select>
            <input
              type="number"
              placeholder="Tahun"
              className="w-full border rounded-lg px-3 py-2"
            />
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Pilih Status</option>
              <option>Berlaku</option>
              <option>Tidak Berlaku</option>
            </select>
            <button className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white py-2 rounded-lg">
              <Search size={16} /> Cari
            </button>
          </div>
        </aside>
      </div>

      {/* Viewer Dokumen */}
<div className="to_footer px-6 my-6">
  <h3 className="text-lg font-semibold mb-3 text-gray-700">
    Pratinjau Dokumen
  </h3>
  <div className="bg-white shadow rounded-xl overflow-hidden border h-[900px] w-[900px]">
    <iframe
      src="/assets/dokumen/SK-Kalender-Akademik.pdf"
      title="Dokumen Hukum"
      className="w-full h-full"
    />
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
