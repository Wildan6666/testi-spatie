// resources/js/Pages/Admin/produk-hukum/DetailModal.jsx
import { X } from "lucide-react";

export default function DetailModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl w-[700px] relative p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {data.judul}
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><span className="font-medium">Nomor:</span> {data.nomor}</p>
          <p><span className="font-medium">Tahun:</span> {data.tahun}</p>
          <p><span className="font-medium">Tanggal Penetapan:</span> {data.tanggal_penetapan}</p>
          <p><span className="font-medium">Subjek:</span> {data.subjek}</p>
          <p><span className="font-medium">Instansi:</span> {data.instansi?.nama}</p>
          <p><span className="font-medium">Status Verifikasi:</span> {data.status_verifikasi?.nama_status}</p>
          <p><span className="font-medium">Status Peraturan:</span> {data.status_peraturan?.nama}</p>
          <p><span className="font-medium">Tipe Dokumen:</span> {data.tipe_dokumen?.nama}</p>
          <p><span className="font-medium">Jenis Dokumen:</span> {data.jenis_hukum?.nama}</p>
        </div>

        <div className="mt-4">
          <p className="font-medium mb-1">Ringkasan:</p>
          <p className="text-justify">{data.ringkasan}</p>
        </div>

        <div className="mt-4">
          <p className="font-medium mb-1">Kata Kunci:</p>
          <p>{data.kata_kunci}</p>
        </div>

        <div className="mt-4">
          <p className="font-medium mb-1">Berkas:</p>
          {data.berkas && (
            <a
              href={`/storage/${data.berkas}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Lihat Berkas
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
