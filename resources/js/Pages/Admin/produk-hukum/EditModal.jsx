// resources/js/Pages/Admin/produk-hukum/EditModal.jsx
import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditModal({ data, onClose }) {
  const { data: form, setData, put, processing, errors } = useForm({
    judul: data?.judul || "",
    nomor: data?.nomor || "",
    tahun: data?.tahun || "",
    tanggal_penetapan: data?.tanggal_penetapan || "",
    subjek: data?.subjek || "",
    instansi_id: data?.instansi_id || data?.instansi?.id || "",
    status_verifikasi_id: data?.status_verifikasi_id || data?.status_verifikasi?.id || "",
    status_peraturan_id: data?.status_peraturan_id || data?.status_peraturan?.id || "",
    tipe_dokumen_id: data?.tipe_dokumen_id || data?.tipe_dokumen?.id || "",
    jenis_hukum_id: data?.jenis_hukum_id || data?.jenis_hukum?.id || "",
    ringkasan: data?.ringkasan || "",
    kata_kunci: data?.kata_kunci || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("produk-hukum.update", data.id), {
      onSuccess: onClose,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl w-[700px] relative p-6 max-h-[90vh] overflow-y-auto">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Produk Hukum</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul */}
          <div>
            <label className="block text-sm font-medium">Judul</label>
            <input
              type="text"
              value={form.judul}
              onChange={(e) => setData("judul", e.target.value)}
              className="border rounded w-full p-2"
            />
            {errors.judul && <p className="text-red-500 text-sm">{errors.judul}</p>}
          </div>

          {/* Nomor */}
          <div>
            <label className="block text-sm font-medium">Nomor</label>
            <input
              type="text"
              value={form.nomor}
              onChange={(e) => setData("nomor", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Tahun */}
          <div>
            <label className="block text-sm font-medium">Tahun</label>
            <input
              type="number"
              value={form.tahun}
              onChange={(e) => setData("tahun", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Tanggal Penetapan */}
          <div>
            <label className="block text-sm font-medium">Tanggal Penetapan</label>
            <input
              type="date"
              value={form.tanggal_penetapan || ""}
              onChange={(e) => setData("tanggal_penetapan", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Subjek */}
          <div>
            <label className="block text-sm font-medium">Subjek</label>
            <input
              type="text"
              value={form.subjek}
              onChange={(e) => setData("subjek", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Ringkasan */}
          <div>
            <label className="block text-sm font-medium">Ringkasan</label>
            <textarea
              value={form.ringkasan}
              onChange={(e) => setData("ringkasan", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Kata Kunci */}
          <div>
            <label className="block text-sm font-medium">Kata Kunci</label>
            <input
              type="text"
              value={form.kata_kunci}
              onChange={(e) => setData("kata_kunci", e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Tombol Simpan */}
          <Button type="submit" disabled={processing} className="bg-blue-600 text-white">
            Simpan Perubahan
          </Button>
        </form>
      </div>
    </div>
  );
}
