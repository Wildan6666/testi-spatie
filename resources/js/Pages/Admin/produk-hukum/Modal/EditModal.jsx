import React, { useState, useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import { X } from "lucide-react";

export default function EditModal({ isOpen, onClose, produk }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    judul: produk?.judul || "",
    nomor: produk?.nomor || "",
    tahun: produk?.tahun || "",
    ringkasan: produk?.ringkasan || "",
    subjek: produk?.subjek || "",
    tanggal_penetapan: produk?.tanggal_penetapan || "",
    kata_kunci: produk?.kata_kunci || "",
    instansi_id: produk?.instansi_id || "",
    status_peraturan_id: produk?.status_peraturan_id || "",
    tipe_dokumen_id: produk?.tipe_dokumen_id || "",
    jenis_hukum_id: produk?.jenis_hukum_id || "",
    kategori_akses_id: produk?.kategori_akses_id || "",
    parent_id: produk?.parent_id || "",
    berkas: null,
  });

  // Reset saat modal ditutup
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("produk-hukum.update", produk.id), {
      _method: "put",
      ...data,
    }, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Produk Hukum</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul</label>
            <input
              type="text"
              value={data.judul}
              onChange={(e) => setData("judul", e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
            />
            {errors.judul && <p className="text-red-500 text-xs">{errors.judul}</p>}
          </div>

          {/* Nomor dan Tahun */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Nomor</label>
              <input
                type="text"
                value={data.nomor}
                onChange={(e) => setData("nomor", e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Tahun</label>
              <input
                type="number"
                value={data.tahun}
                onChange={(e) => setData("tahun", e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
          </div>

          {/* Ringkasan */}
          <div>
            <label className="block text-sm font-medium">Ringkasan</label>
            <textarea
              value={data.ringkasan}
              onChange={(e) => setData("ringkasan", e.target.value)}
              rows="3"
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          {/* File */}
          <div>
            <label className="block text-sm font-medium">Unggah Berkas (opsional)</label>
            <input
              type="file"
              accept=".pdf,.png"
              onChange={(e) => setData("berkas", e.target.files[0])}
              className="mt-1"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
            >
              {processing ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
