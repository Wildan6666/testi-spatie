import { X, Book, FileText, ChevronRight, GitBranch } from "lucide-react";
import { Link } from "@inertiajs/react";
import TreeList from "@/Components/Dokumen/TreeList";

export default function DetailModal({ selected, onClose }) {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Judul */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 border-b pb-3">
          {selected.judul || "Tanpa Judul"}
        </h2>

        {/* === DETAIL UTAMA === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
          <p><strong>Nomor:</strong> {selected.nomor || "-"}</p>
          <p><strong>Tahun:</strong> {selected.tahun || "-"}</p>
          <p><strong>Tanggal Penetapan:</strong> {selected.tanggal_penetapan || "-"}</p>
          <p><strong>Subjek:</strong> {selected.subjek || "-"}</p>
          <p><strong>Instansi:</strong> {selected.instansi?.nama || "-"}</p>
          <p><strong>Status Peraturan:</strong> {selected.status_peraturan?.nama || "-"}</p>
          <p><strong>Tipe Dokumen:</strong> {selected.tipe_dokumen?.nama || "-"}</p>
          <p><strong>Jenis Dokumen:</strong> {selected.jenis_hukum?.nama || "-"}</p>
        </div>

        {/* === RINGKASAN === */}
        <section className="mt-5">
          <h3 className="font-semibold mb-1 text-gray-800">Ringkasan</h3>
          <div className="text-justify bg-gray-50 p-3 rounded-lg text-sm leading-relaxed border border-gray-100">
            {selected.ringkasan || "Tidak ada ringkasan."}
          </div>
        </section>

        {/* === KATA KUNCI === */}
        <section className="mt-4">
          <h3 className="font-semibold mb-1 text-gray-800">Kata Kunci</h3>
          <div className="bg-gray-50 p-2 rounded-lg text-sm border border-gray-100">
            {selected.kata_kunci || "-"}
          </div>
        </section>

        {/* === BERKAS === */}
        <section className="mt-4">
          <h3 className="font-semibold mb-1 text-gray-800">Berkas</h3>
          {selected.berkas ? (
            <a
              href={`/storage/${selected.berkas}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              📄 Lihat Berkas
            </a>
          ) : (
            <p className="text-gray-500 text-sm">Tidak ada berkas.</p>
          )}
        </section>

        {/* === STRUKTUR DOKUMEN === */}
        {(selected.parent_chain?.length > 0 || selected.children?.length > 0) && (
          <section className="mt-8 bg-orange-50/60 border border-orange-200 rounded-lg p-5 shadow-sm">
            <h3 className="font-semibold text-orange-700 text-base mb-4 flex items-center gap-2">
              <GitBranch size={16} className="text-orange-600" />
              Struktur Produk Hukum
            </h3>

            {/* ===== Dokumen Induk ===== */}
            <div className="mb-4 bg-white border border-orange-100 rounded-md p-3">
              <h4 className="text-sm font-semibold text-orange-700 mb-2 flex items-center gap-2">
                <Book size={14} className="text-orange-500" />
                Dokumen Induk
              </h4>

              {selected.parent_chain && selected.parent_chain.length > 0 ? (
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  {selected.parent_chain.map((p, idx) => (
                    <div key={p.id} className="flex items-center gap-1 sm:gap-2">
                      <Link
                        href={`/produkhukum/${p.id}`}
                        target="_blank"
                        className="flex items-center gap-2 px-3 py-1 border border-orange-200 rounded-full bg-white hover:bg-orange-100 text-gray-700 hover:text-orange-600 transition-all"
                      >
                        <Book size={12} className="text-orange-500" />
                        <span className="truncate max-w-[140px] sm:max-w-[200px]" title={p.judul}>
                          {p.judul}
                        </span>
                      </Link>
                      {idx < selected.parent_chain.length - 1 && (
                        <ChevronRight size={12} className="text-gray-400" />
                      )}
                    </div>
                  ))}

                  {/* Dokumen aktif */}
                  <div className="flex items-center gap-2 bg-orange-500 text-white font-medium px-3 py-1 rounded-full text-xs shadow-sm">
                    <FileText size={12} />
                    <span>{selected.judul}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic text-xs">
                  📜 Dokumen ini merupakan dokumen utama.
                </p>
              )}
            </div>

            {/* ===== Dokumen Turunan ===== */}
            <div className="bg-white border border-orange-100 rounded-md p-3">
              <h4 className="text-sm font-semibold text-orange-700 mb-2 flex items-center gap-2">
                <Book size={14} className="text-orange-500" />
                Dokumen Turunan
              </h4>

              {selected.children_recursive && selected.children_recursive.length > 0 ? (
                <div className="ml-1 sm:ml-2 mt-1">
                  <TreeList nodes={selected.children_recursive} />
                </div>
              ) : selected.children && selected.children.length > 0 ? (
                <div className="ml-1 sm:ml-2 mt-1">
                  <TreeList nodes={selected.children} />
                </div>
              ) : (
                <p className="text-gray-500 italic text-xs">
                  Tidak ada dokumen turunan.
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
