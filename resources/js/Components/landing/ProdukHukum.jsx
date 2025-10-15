import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Eye, Download } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProdukHukum() {
  const { props } = usePage();
   const doc = props.doc;
  const terbaruData = props.terbaruData || [];
  const populerData = props.populerData || [];

  const [activeTab, setActiveTab] = useState("terbaru");

  // Pilih data berdasarkan tab
const displayedData = activeTab === "terbaru" ? terbaruData : populerData;

  return (
    <section className="section-gradient py-10" data-aos="fade-up">
      <div className="section-container max-w-7xl mx-auto px-6">
        {/* Judul */}
        <h2
          className="font-inter font-bold text-[48px] leading-[58px] text-center text-orange-500"
          data-aos="fade-up"
        >
          Daftar Produk Hukum
        </h2>

        {/* Tabs */}
        <div className="tabs-container" data-aos="fade-up" data-aos-delay="100">
          {/* tombol */}
          <button
            type="button"
            onClick={() => setActiveTab("terbaru")}
            className={activeTab === "terbaru" ? "tab-active" : "tab-inactive"}
          >
            Peraturan Terbaru
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("populer")}
            className={activeTab === "populer" ? "tab-active" : "tab-inactive"}
          >
            Peraturan Terpopuler
          </button>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {displayedData.slice(0, 6).map((doc, i) => (
            <Link
              key={doc.id}
              href={route("produkhukum.show", doc.id)} // pakai route Laravel
              className="product-card block bg-white rounded-xl border border-orange-400 
                        shadow-sm hover:shadow-lg transition overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              {/* Badge */}
              <span className="product-tag inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-br-lg">
                {doc.kategori}
              </span>

              {/* Content */}
              <div className="p-4">
                <h3 className="product-title text-lg font-semibold text-gray-800 mb-2">
                  {doc.judul}
                </h3>
                <p className="product-desc text-sm text-gray-600 mb-4 line-clamp-2">
                  {doc.deskripsi}
                </p>

                {/* Stats */}
                <div className="product-stats flex items-center text-sm text-gray-500 gap-4">
                  <div className="stat-item flex items-center gap-1">
                    <Eye size={16} /> <span>{doc.views ?? 0}</span>
                  </div>
                  <div className="stat-item flex items-center gap-1">
                    <Download size={16} /> <span>{doc.downloads ?? 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
