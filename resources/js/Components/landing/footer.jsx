import React from "react";
import { Youtube, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 dark:bg-gray-950">
      {/* Gambar Footer */}
      <img
        src="/assets/heheh.png"
        alt="Footer Universitas Jambi"
        className="w-full object-cover"
      />

      {/* Konten Footer */}
      <div className="bg-orange-200 dark:bg-slate-800 text-dark-300 dark:text-gray-300 py-6 px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        
        {/* 🏫 Kiri: Identitas dan Copyright */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold text-orange-600">UNIVERSITAS JAMBI</h3>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
            Jaringan Dokumentasi dan Informasi Hukum (JDIH)
          </p>
          <p className="text-sm mt-2">
            © 2025 Universitas Jambi. Semua Hak Dilindungi Undang-Undang.
          </p>
        </div>

        {/* 📍 Tengah: Map dan Lokasi Kampus */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 max-w-xl w-full md:w-auto">
          {/* Map kecil yang tetap tampil di semua perangkat */}
          <div className="w-40 h-20 md:w-48 md:h-24 rounded-lg overflow-hidden shadow-lg ring-1 ring-orange-300 dark:ring-slate-600 transition-transform hover:scale-[1.03]">
            <iframe
              src="https://maps.google.com/maps?q=Universitas%20Jambi%2C%20Mendalo%20Darat&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Daftar alamat kampus — hanya tampil di tablet/desktop */}
          <div className="hidden md:flex flex-col gap-2 text-sm leading-relaxed text-gray-900 dark:text-gray-200">
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJ89Kki_SIJS4Rlem2W3_blTU"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              <span className="font-semibold text-orange-600">Kampus Pinang Masak, Mendalo</span> —  
              Jl. Jambi - Muara Bulian KM.15, Mendalo Darat,
              Kec. Jambi Luar Kota, Kabupaten Muaro Jambi, Jambi.
            </a>

            <a
              href="https://www.google.com/maps/place/Universitas+Jambi(UNJA)+Telanaipura/@-1.610319,103.5778842,17z/data=!3m1!4b1!4m6!3m5!1s0x2e25885d6434c161:0xf5f3b454b95355be!8m2!3d-1.610319!4d103.5804645!16s%2Fg%2F11b6g7rf6m?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              <span className="font-semibold text-orange-600">Kampus Telanaipura</span> —  
              Jl. Arif Rahman Hakim, Telanaipura, Kota Jambi 36361.
            </a>

            <a
              href="https://www.google.com/maps/place/Universitas+Jambi+Kampus+Pondok+Meja/@-1.6735251,103.5732728,17z/data=!3m1!4b1!4m6!3m5!1s0x2e25870fa3256515:0x598e9efee432ccc6!8m2!3d-1.6735251!4d103.5758531!16s%2Fg%2F11cs4l9vfn?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              <span className="font-semibold text-orange-600">Kampus Pondok Meja</span> —  
              Pd. Meja, Kec. Mestong, Kabupaten Muaro Jambi, Jambi 36361.
            </a>
          </div>
        </div>

        {/* 🔗 Kanan: Ikon Media Sosial */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6">
          {[
            { Icon: Youtube, color: "hover:text-red-500 dark:hover:text-red-400" },
            { Icon: Facebook, color: "hover:text-blue-600 dark:hover:text-blue-400" },
            { Icon: Twitter, color: "hover:text-sky-400 dark:hover:text-sky-300" },
            { Icon: Instagram, color: "hover:text-pink-500 dark:hover:text-pink-400" },
            { Icon: Linkedin, color: "hover:text-blue-500 dark:hover:text-blue-400" },
          ].map(({ Icon, color }, i) => (
            <a
              key={i}
              href="#"
              aria-label={`Ikuti kami di ${Icon.name}`}
              className={`text-gray-700 dark:text-gray-300 transition-all duration-300 transform hover:scale-110 ${color}`}
            >
              <Icon className="w-6 h-6 md:w-7 md:h-7" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
