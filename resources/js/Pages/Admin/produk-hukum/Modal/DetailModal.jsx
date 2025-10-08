import { X } from "lucide-react";

export default function ProdukHukumDetailModal({ selected, onClose }) {
  // 🔒 Cegah error jika selected belum terisi
  if (!selected) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[750px] relative p-6 max-h-[90vh] overflow-y-auto">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Judul */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
          {selected.judul || "Tanpa Judul"}
        </h2>

        {/* Informasi Detail */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <strong>Nomor:</strong> {selected.nomor || "-"}
          </p>
          <p>
            <strong>Tahun:</strong> {selected.tahun || "-"}
          </p>
          <p>
            <strong>Tanggal Penetapan:</strong>{" "}
            {selected.tanggal_penetapan || "-"}
          </p>
          <p>
            <strong>Subjek:</strong> {selected.subjek || "-"}
          </p>
          <p>
            <strong>Instansi:</strong> {selected.instansi?.nama || "-"}
          </p>
          <p>
            <strong>Status Verifikasi:</strong>{" "}
            {selected.status_verifikasi?.nama_status || "-"}
          </p>
          <p>
            <strong>Status Peraturan:</strong>{" "}
            {selected.status_peraturan?.nama || "-"}
          </p>
          <p>
            <strong>Tipe Dokumen:</strong>{" "}
            {selected.tipe_dokumen?.nama || "-"}
          </p>
          <p>
            <strong>Jenis Dokumen:</strong> {selected.jenis_hukum?.nama || "-"}
          </p>
        </div>

        {/* Ringkasan */}
        <div className="mt-6">
          <p className="font-medium mb-1">Ringkasan:</p>
          <p className="text-justify bg-gray-50 p-3 rounded-lg">
            {selected.ringkasan || "Tidak ada ringkasan"}
          </p>
        </div>

        {/* Kata Kunci */}
        <div className="mt-4">
          <p className="font-medium mb-1">Kata Kunci:</p>
          <p className="bg-gray-50 p-2 rounded-lg">
            {selected.kata_kunci || "-"}
          </p>
        </div>

        {/* Berkas */}
        <div className="mt-4">
          <p className="font-medium mb-1">Berkas:</p>
          {selected.berkas ? (
            <a
              href={`/storage/${selected.berkas}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Lihat Berkas
            </a>
          ) : (
            <span className="text-gray-500">Tidak ada berkas</span>
          )}
        </div>
      </div>
    </div>
  );
}
