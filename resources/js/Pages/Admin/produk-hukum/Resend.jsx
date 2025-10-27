import React, { useState, useMemo } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Upload,
  Building2,
  Scale,
  FolderOpen,
  Tag,
  GitBranch,
  FileText,
  Calendar,
  Info,
  File as FileIcon,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ResendProdukHukum() {
  const { props } = usePage();
  const produk = props.produk;

  const instansis = props.instansis || [];
  const tipes = props.tipes || [];
  const jenisHukums = props.jenisHukums || [];
  const kategoriAkses = props.kategoriAkses || [];
  const statusPeraturans = props.statusPeraturans || [];

  // Helpers untuk lookup nama by id
  const findName = (arr, id) => arr.find((x) => String(x.id) === String(id))?.nama || "-";

  const [formData, setFormData] = useState({
    judul: produk?.judul || "",
    nomor: produk?.nomor || "",
    tahun: produk?.tahun || "",
    ringkasan: produk?.ringkasan || "",
    subjek: produk?.subjek || "",
    tanggal_penetapan: produk?.tanggal_penetapan || "",
    kata_kunci: produk?.kata_kunci || "",
    // bidang klasifikasi ditampilkan read-only (controller resend tidak menyimpannya)
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
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((p) => ({ ...p, berkas: e.target.files[0] || null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.berkas) {
      toast.error("Silakan pilih berkas baru sebelum mengirim ulang.");
      return;
    }

    // Hanya kirim field yang memang diproses oleh controller resend
const payload = new FormData();
[
  "judul",
  "nomor",
  "tahun",
  "ringkasan",
  "subjek",
  "tanggal_penetapan",
  "kata_kunci",
  "instansi_id",
  "status_peraturan_id",
  "tipe_dokumen_id",
  "jenis_hukum_id",
  "kategori_akses_id",
  "parent_id",
].forEach((k) => payload.append(k, formData[k] ?? ""));

payload.append("berkas", formData.berkas);

    toast.loading("Mengirim ulang dokumen...");
    router.post(route("produk-hukum.resend", produk.id), payload, {
      forceFormData: true,
      onSuccess: () => {
        toast.dismiss();
        toast.success("Dokumen berhasil dikirim ulang untuk verifikasi.");
        router.visit(route("produk-hukum.index"));
      },
      onError: () => {
        toast.dismiss();
        toast.error("Gagal mengirim ulang. Periksa kembali data Anda.");
      },
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Kirim Ulang Dokumen Produk Hukum
          </h1>
          <Link href={route("produk-hukum.index")}>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Kembali
            </Button>
          </Link>
        </div>

        {/* Catatan Verifikator (jika ada) */}
        {produk?.catatan_verifikasi && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800">Catatan Verifikator</p>
                <p className="text-sm text-amber-800/90 whitespace-pre-wrap mt-1">
                  {produk.catatan_verifikasi}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informasi Dasar */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              Informasi Dasar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Judul */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Judul</label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Masukkan judul produk hukum"
                />
              </div>

              {/* Nomor */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nomor</label>
                <input
                  type="text"
                  name="nomor"
                  value={formData.nomor}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="Contoh: 12"
                />
              </div>

              {/* Tahun */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Tahun</label>
                <input
                  type="number"
                  name="tahun"
                  value={formData.tahun}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="2024"
                />
              </div>

              {/* Ringkasan */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Ringkasan</label>
                <textarea
                  name="ringkasan"
                  value={formData.ringkasan}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 w-full border rounded-md p-2"
                  placeholder="Tuliskan ringkasan singkat..."
                />
              </div>
            </div>
          </section>

          {/* Metadata */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-gray-600" />
              Metadata
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subjek */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Subjek</label>
                <input
                  type="text"
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>

              {/* Kata Kunci */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Kata Kunci</label>
                <input
                  type="text"
                  name="kata_kunci"
                  value={formData.kata_kunci}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>

              {/* Tanggal Penetapan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Tanggal Penetapan
                </label>
                <input
                  type="date"
                  name="tanggal_penetapan"
                  value={formData.tanggal_penetapan || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
            </div>
          </section>

         {/* Konteks Dokumen */}
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5 text-gray-600" />
                Konteks Dokumen
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Instansi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Building2 className="w-4 h-4" /> Instansi
                  </label>
                  <select
                    name="instansi_id"
                    value={formData.instansi_id}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-md p-2"
                    required
                  >
                    <option value="">-- Pilih Instansi --</option>
                    {instansis.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Peraturan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status Peraturan
                  </label>
                  <select
                    name="status_peraturan_id"
                    value={formData.status_peraturan_id}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-md p-2"
                    required
                  >
                    <option value="">-- Pilih Status Peraturan --</option>
                    {statusPeraturans.map((sp) => (
                      <option key={sp.id} value={sp.id}>
                        {sp.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tipe Dokumen */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipe Dokumen
                  </label>
                  <select
                    name="tipe_dokumen_id"
                    value={formData.tipe_dokumen_id}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-md p-2"
                    required
                  >
                    <option value="">-- Pilih Tipe Dokumen --</option>
                    {tipes.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Jenis Hukum */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Scale className="w-4 h-4" /> Jenis Hukum
                  </label>
                  <select
                    name="jenis_hukum_id"
                    value={formData.jenis_hukum_id}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-md p-2"
                    required
                  >
                    <option value="">-- Pilih Jenis Hukum --</option>
                    {jenisHukums.map((jh) => (
                      <option key={jh.id} value={jh.id}>
                        {jh.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kategori Akses */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kategori Akses
                  </label>
                  <select
                    name="kategori_akses_id"
                    value={formData.kategori_akses_id}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-md p-2"
                    required
                  >
                    <option value="">-- Pilih Kategori Akses --</option>
                    {kategoriAkses.map((ka) => (
                      <option key={ka.id} value={ka.id}>
                        {ka.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dokumen Induk */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                    <GitBranch className="w-4 h-4" /> Dokumen Induk
                  </label>
                  <select
                    name="parent_id"
                    value={formData.parent_id}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-md p-2"
                  >
                    <option value="">-- Tidak Ada (Dokumen Utama) --</option>
                    {props.produkIndukList?.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.judul}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>


          {/* Upload File Baru */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Upload className="w-5 h-5 text-gray-600" />
              Upload Berkas Baru
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Berkas (PDF/PNG) <span className="text-red-600">*</span>
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
                Maksimal 2MB. Format yang diperbolehkan: PDF atau PNG.
              </p>

              {produk?.berkas && (
                <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
                  <FileIcon className="w-4 h-4" />
                  <a
                    href={`/storage/${produk.berkas}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Lihat berkas terakhir yang diunggah
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end pt-2">
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
