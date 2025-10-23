import { useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Calendar,
  FileUp,
  FolderOpen,
  Tag,
  Upload,
  Save,
  Loader2,
  Building2,
  Scale,
  File as FileIcon,
  Image as ImageIcon,
  GitBranch,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Create() {
  const { props } = usePage();
  const [filePreview, setFilePreview] = useState(null);

  const { data, setData, post, processing, errors } = useForm({
    judul: "",
    nomor: "",
    tahun: "",
    ringkasan: "",
    subjek: "",
    tanggal_penetapan: "",
    kata_kunci: "",
    instansi_id: "",
    status_id: "",
    status_peraturan_id: "",
    kategori_akses_id: "",
    tipe_dokumen_id: "",
    jenis_hukum_id: "",
    berkas: null,
    parent_id: "",
  });

  useEffect(() => {
  if (data.parent_id) {
    const parent = props.produkIndukList.find((p) => p.id == data.parent_id);
    if (parent) {
      setData({ ...data, ...parent });
      toast.success("Field otomatis diisi sesuai produk induk!");
    }
  }
}, [data.parent_id]);

  // ⚡ Auto-fill: jika memilih parent, maka field lain mengikuti parent-nya
  useEffect(() => {
    if (data.parent_id) {
      const selectedParent = props.produkIndukList.find(
        (p) => p.id == data.parent_id
      );
      if (selectedParent) {
        setData((prev) => ({
          ...prev,
          instansi_id: selectedParent.instansi_id || "",
          status_peraturan_id: selectedParent.status_peraturan_id || "",
          tipe_dokumen_id: selectedParent.tipe_dokumen_id || "",
          jenis_hukum_id: selectedParent.jenis_hukum_id || "",
          kategori_akses_id: selectedParent.kategori_akses_id || "",
        }));
      }
    }
  }, [data.parent_id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData("berkas", file);

    if (file) {
      if (file.type === "application/pdf") {
        setFilePreview({
          type: "pdf",
          url: URL.createObjectURL(file),
          name: file.name,
        });
      } else if (file.type.startsWith("image/")) {
        setFilePreview({
          type: "image",
          url: URL.createObjectURL(file),
          name: file.name,
        });
      } else {
        setFilePreview(null);
      }
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("produk-hukum.store"), { forceFormData: true });
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-xl rounded-2xl border border-gray-200">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Tambah Produk Hukum
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-10">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* --- Informasi Dasar --- */}
              <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  Informasi Dasar
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="judul">Judul</Label>
                    <Input
                      id="judul"
                      value={data.judul}
                      onChange={(e) => setData("judul", e.target.value)}
                      placeholder="Masukkan judul produk hukum"
                      className="mt-1"
                    />
                    {errors.judul && (
                      <p className="text-red-500 text-xs mt-1">{errors.judul}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomor">Nomor</Label>
                      <Input
                        id="nomor"
                        value={data.nomor}
                        onChange={(e) => setData("nomor", e.target.value)}
                        placeholder="Contoh: 12"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tahun">Tahun</Label>
                      <Input
                        id="tahun"
                        type="number"
                        value={data.tahun}
                        onChange={(e) => setData("tahun", e.target.value)}
                        placeholder="2024"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="ringkasan">Ringkasan</Label>
                  <Textarea
                    id="ringkasan"
                    value={data.ringkasan}
                    onChange={(e) => setData("ringkasan", e.target.value)}
                    placeholder="Tuliskan ringkasan singkat..."
                    className="mt-1"
                  />
                </div>
              </section>

              {/* --- Metadata --- */}
              <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-gray-600" />
                  Metadata
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="subjek">Subjek</Label>
                    <Input
                      id="subjek"
                      value={data.subjek}
                      onChange={(e) => setData("subjek", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="kata_kunci">Kata Kunci</Label>
                    <Input
                      id="kata_kunci"
                      value={data.kata_kunci}
                      onChange={(e) => setData("kata_kunci", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tanggal_penetapan" className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> Tanggal Penetapan
                    </Label>
                    <Input
                      type="date"
                      id="tanggal_penetapan"
                      value={data.tanggal_penetapan}
                      onChange={(e) => setData("tanggal_penetapan", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </section>

              {/* --- Klasifikasi --- */}
              <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-600" />
                  Klasifikasi
                </h2>
                <div className="grid grid-cols-2 gap-6">

                  {/* ✅ Produk Hukum Induk */}
                  <div>
                    <Label htmlFor="parent_id" className="flex items-center gap-1">
                      <GitBranch className="w-4 h-4" /> Produk Hukum Induk
                    </Label>
                    <select
                      id="parent_id"
                      value={data.parent_id || ""}
                      onChange={(e) => setData("parent_id", e.target.value)}
                      className="w-full border rounded-lg p-2 mt-1"
                    >
                      <option value="">-- Tidak Ada (Dokumen Utama) --</option>
                      {props.produkIndukList?.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.judul}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Instansi */}
                  <div>
                    <Label htmlFor="instansi_id" className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" /> Instansi
                    </Label>
                    <select
                      id="instansi_id"
                      value={data.instansi_id}
                      onChange={(e) => setData("instansi_id", e.target.value)}
                      className="w-full border rounded-lg p-2 mt-1"
                    >
                      <option value="">-- Pilih Instansi --</option>
                      {props.instansis?.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Peraturan */}
                  <div>
                    <Label htmlFor="status_peraturan_id">Status Peraturan</Label>
                    <select
                      id="status_peraturan_id"
                      value={data.status_peraturan_id}
                      onChange={(e) => setData("status_peraturan_id", e.target.value)}
                      className="w-full border rounded-lg p-2 mt-1"
                    >
                      <option value="">-- Pilih Status Peraturan --</option>
                      {props.statusPeraturans?.map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {sp.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tipe Dokumen */}
                  <div>
                    <Label htmlFor="tipe_dokumen_id">Tipe Dokumen</Label>
                    <select
                      id="tipe_dokumen_id"
                      value={data.tipe_dokumen_id}
                      onChange={(e) => setData("tipe_dokumen_id", e.target.value)}
                      className="w-full border rounded-lg p-2 mt-1"
                    >
                      <option value="">-- Pilih Tipe Dokumen --</option>
                      {props.tipeDokumens?.map((td) => (
                        <option key={td.id} value={td.id}>
                          {td.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sifat Dokumen */}
                  {data.tipe_dokumen_id && (
                    <div>
                      <Label htmlFor="kategori_akses_id">Sifat Dokumen</Label>
                      <select
                        id="kategori_akses_id"
                        value={data.kategori_akses_id}
                        onChange={(e) => setData("kategori_akses_id", e.target.value)}
                        className="w-full border rounded-lg p-2 mt-1"
                      >
                        <option value="">-- Pilih Sifat Dokumen --</option>
                        {props.kategoriAkses?.map((ka) => (
                          <option key={ka.id} value={ka.id}>
                            {ka.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Jenis Hukum */}
                  <div>
                    <Label htmlFor="jenis_hukum_id" className="flex items-center gap-1">
                      <Scale className="w-4 h-4" /> Jenis Hukum
                    </Label>
                    <select
                      id="jenis_hukum_id"
                      value={data.jenis_hukum_id}
                      onChange={(e) => setData("jenis_hukum_id", e.target.value)}
                      className="w-full border rounded-lg p-2 mt-1"
                    >
                      <option value="">-- Pilih Jenis Hukum --</option>
                      {props.jenisHukums?.map((jh) => (
                        <option key={jh.id} value={jh.id}>
                          {jh.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* --- Upload --- */}
              <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-gray-600" />
                  Upload Dokumen
                </h2>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <FileUp className="w-12 h-12 text-gray-400 mb-2" />
                  <Input
                    id="berkas"
                    type="file"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Format: PDF/PNG, Max 2MB
                  </p>

                  {filePreview && (
                    <div className="mt-4 w-full">
                      {filePreview.type === "image" ? (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="w-6 h-6 text-gray-500 mb-2" />
                          <img
                            src={filePreview.url}
                            alt="preview"
                            className="max-h-40 rounded-md border"
                          />
                          <p className="mt-2 text-sm text-gray-600">
                            {filePreview.name}
                          </p>
                        </div>
                      ) : filePreview.type === "pdf" ? (
                        <div>
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <FileIcon className="w-5 h-5" />
                            <span className="text-sm">{filePreview.name}</span>
                          </div>
                          <iframe
                            src={filePreview.url}
                            title="PDF Preview"
                            className="w-full h-64 border rounded-md"
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </section>

              {/* --- Submit --- */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md flex items-center gap-2"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Simpan
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
