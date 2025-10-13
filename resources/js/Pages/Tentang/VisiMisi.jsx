import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Youtube, Instagram, Linkedin, LogOut } from "lucide-react";


import Navbar from "@/Components/landing/Navbar";
import Footer from "@/Components/landing/Footer";

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
<Navbar/>
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
      </main>

<Footer/>
    </div>
  );
}
