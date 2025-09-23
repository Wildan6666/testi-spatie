import React from "react";
import { Link } from "@inertiajs/react";
import '../../css/header.css';
import '../../css/footer.css';
import { motion } from "framer-motion";
import { Facebook, Twitter, Youtube, Instagram, Linkedin, LogOut } from "lucide-react";

export default function TentangKami() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

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

            <div className="relative inline-block group">
              <button className="nav-link hover:text-gray-300 px-4 py-2 w-full text-left">
                Tentang Kami
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white shadow-xl rounded-xl text-gray-800 z-50 hidden group-hover:block">
                <a href="/tentang/sekilas-sejarah" className="block px-4 py-2 hover:bg-gray-100 rounded-xl">
                  Sekilas Sejarah
                </a>
                <a href="/tentang/dasar-hukum" className="block px-4 py-2 hover:bg-gray-100">
                  Dasar Hukum
                </a>
                <a href="/VisiMisi" className="block px-4 py-2 hover:bg-gray-100">
                  Visi Misi
                </a>
                <a href="/tentang/struktur-organisasi" className="block px-4 py-2 hover:bg-gray-100">
                  Struktur Organisasi
                </a>
                <a href="/tentang/prosedur-operasional" className="block px-4 py-2 hover:bg-gray-100 rounded-xl">
                  Prosedur Operasional Standar
                </a>
              </div>
            </div>

            <a href="/dokumen" className="nav-link">Dokumen Hukum</a>
            <Link
              href="/logout"
              method="post"
              as="button"
              className="login-button flex items-center gap-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-extrabold text-orange-700 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Tentang Kami
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Jaringan Dokumentasi dan Informasi Hukum (JDIH) Universitas Jambi
              menyediakan akses cepat, akurat, dan transparan terhadap informasi
              hukum bagi civitas akademika maupun masyarakat umum.
            </motion.p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-16 h-16 bg-orange-400 rounded-full opacity-10 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-32 right-20 w-20 h-20 bg-amber-400 rounded-full opacity-10 blur-xl"
        />
      </section>

      {/* Content */}
      <main className="container mx-auto px-6 pb-16 relative z-10">
        {/* Visi Misi */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 mb-24"
        >
          {/* Visi */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg p-8 border border-orange-100"
          >
            <h3 className="text-3xl font-bold text-orange-700 mb-4">Visi</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Menjadi pusat informasi hukum Universitas Jambi yang modern,
              transparan, dan mudah diakses untuk mendukung pembangunan hukum
              dan akademik.
            </p>
          </motion.div>

          {/* Misi */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl shadow-lg p-8 border border-amber-100"
          >
            <h3 className="text-3xl font-bold text-amber-700 mb-4">Misi</h3>
            <ul className="space-y-3">
              {[
                "Mengumpulkan dan mengelola produk hukum Universitas Jambi.",
                "Menyediakan akses informasi hukum yang mudah dan cepat.",
                "Mendukung penelitian dan pengembangan di bidang hukum.",
                "Meningkatkan kesadaran hukum di lingkungan kampus."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* Tim Pengelola */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-16">
            <motion.h3 
              className="text-4xl md:text-5xl font-bold text-orange-700 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Tim Pengelola
            </motion.h3>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { nama: "Dr. Andi Saputra", jabatan: "Ketua Pengelola" },
              { nama: "Siti Rahmawati, SH", jabatan: "Sekretaris" },
              { nama: "Budi Santoso", jabatan: "Staf Dokumentasi" },
            ].map((anggota, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center border border-orange-100"
              >
                <div className="w-28 h-28 mx-auto rounded-full ring-4 ring-orange-200 overflow-hidden mb-6">
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 12}`}
                    alt={anggota.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg text-gray-800">{anggota.nama}</h4>
                <p className="text-sm text-gray-500">{anggota.jabatan}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900">
        <img 
          src="/assets/heheh.png" 
          alt="Footer Universitas Jambi" 
          className="w-full object-cover" 
        />
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
