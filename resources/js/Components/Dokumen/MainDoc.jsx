import React from "react";
import { Link } from "@inertiajs/react";
import { FileText, Eye, Download } from "lucide-react";

export default function MainDoc({
  currentDocuments,
  filteredDocuments,
  startIndex,
  endIndex,
  handleDownload,
}) {
  return (
    <div className="flex-1 space-y-6">
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
              href={route("produkhukum.show", document.id)} // ✅ link ke detailDokumen
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
                    {/* Label kategori */}
                    {document.kategori && (
                      <div className="mb-3">
                        <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                          {document.kategori}
                        </span>
                      </div>
                    )}

                    {/* Judul */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {document.title}
                    </h3>

                    {/* Subjek/ringkasan */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {document.subjek || "Tidak ada ringkasan"}
                    </p>

                    {/* Info Dokumen */}
                    <div className="bg-gray-200 rounded-xl p-3">
                      <div className="flex flex-wrap items-center justify-between text-sm ">
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                          <span>
                            Ditetapkan:{" "}
                            <span className="font-medium">{document.date ?? "-"}</span>
                          </span>
                          <span>
                            Diundangkan:{" "}
                            <span className="font-medium">
                              {document.published ?? "-"}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>{document.lihat ?? 0}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDownload(document.id);
                            }}
                            className="flex items-center gap-1 hover:text-orange-600"
                          >
                            <Download size={16} />
                            <span>{document.unduh ?? 0}</span>
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
    </div>
  );
}
