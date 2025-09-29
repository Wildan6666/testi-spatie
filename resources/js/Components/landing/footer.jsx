import React from "react";
import { Youtube, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900">
      {/* Gambar Footer */}
      <img
        src="/assets/heheh.png"
        alt="Footer Universitas Jambi"
        className="w-full object-cover"
      />

      {/* Konten Footer */}
      <div className="bg-orange-200 text-dark-300 py-6 px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        
        {/* Kiri: Copyright */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm">
            <span className="text-orange-500 font-semibold">UPATIK</span> © 2025 - All rights reserved
          </p>
        </div>

        {/* Tengah: Map + Deskripsi Samping */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 max-w-xl">
          {/* Map */}
          <div className="w-full md:w-40 h-16 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps?q=-1.613127,103.537514&hl=id&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Deskripsi alamat */}
          <a
            href="https://www.google.com/maps?q=-1.613127,103.537514"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-900 leading-relaxed hover:text-orange-600 text-center md:text-left"
          >
            📍 Jl. Jambi – Muara Bulian KM. 15, Mendalo Darat, <br />
            Kec. Jambi Luar Kota, Kab. Muaro Jambi, <br />
            Jambi 36361
          </a>
        </div>

        {/* Kanan: Sosial Media */}
        <div className="flex-1 flex justify-center md:justify-end space-x-4">
          <a href="#" className="hover:text-red-500"><Youtube size={24} /></a>
          <a href="#" className="hover:text-blue-600"><Facebook size={24} /></a>
          <a href="#" className="hover:text-sky-400"><Twitter size={24} /></a>
          <a href="#" className="hover:text-pink-500"><Instagram size={24} /></a>
          <a href="#" className="hover:text-blue-500"><Linkedin size={24} /></a>
        </div>
      </div>
    </footer>
  );
}
