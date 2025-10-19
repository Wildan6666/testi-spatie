import React, { useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ResendProdukHukum() {
  const { props } = usePage();
  const produk = props.produk;
  const instansis = props.instansis || [];
  const tipes = props.tipes || [];
  const jenisHukums = props.jenisHukums || [];
  const kategoriAkses = props.kategoriAkses || [];
  const statusPeraturans = props.statusPeraturans || [];

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, berkas: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.berkas) {
      toast.error("Silakan pilih berkas baru sebelum mengirim ulang.");
      return;
    }

    router.post(route("produk-hukum.resend", produk.id), formData, {
      forceFormData: true,
      onStart: () => toast.loading("Mengirim ulang dokumen..."),
      onSuccess: () => {
        toast.dismiss();
        toast.success("✅ Dokumen berhasil dikirim ulang untuk verifikasi.");
        router.visit(route("produk-hukum.index"));
      },
      onError: (errors) => {
        toast.dismiss();
        toast.error("Gagal mengirim ulang. Periksa kembali data Anda.");
        console.error(errors);
      },
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Kirim Ulang Dokumen Produk Hukum
          </h1>
          <Link href={route("produk-hukum.index")}>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Kembali
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* --- Judul --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul</label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* --- Nomor & Tahun --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor</label>
              <input
                type="text"
                name="nomor"
                value={formData.nomor}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tahun</label>
              <input
                type="number"
                name="tahun"
                value={formData.tahun}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
          </div>

          {/* --- Ringkasan --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ringkasan</label>
            <textarea
              name="ringkasan"
              value={formData.ringkasan}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>

          {/* --- Upload File --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Berkas Baru (PDF/PNG)
            </label>
            <input
              type="file"
              name="berkas"
              accept=".pdf,.png"
              onChange={handleFileChange}
              required
              className="block w-full text-sm border border-gray-300 rounded-md p-2 cursor-pointer file:bg-orange-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 hover:file:bg-orange-700"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maksimum 2MB. Format yang diperbolehkan: PDF atau PNG.
            </p>
          </div>

          {/* --- Submit Button --- */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Upload size={16} /> Kirim Ulang
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
