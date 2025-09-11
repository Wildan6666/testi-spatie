import { useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Create() {
  const { props } = usePage();

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
    tipe_dokumen_id: "",
    jenis_hukum_id: "",
    berkas: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("produk-hukum.store"), {
      forceFormData: true, // agar bisa upload file
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Tambah Produk Hukum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Judul */}
              <div className="space-y-2">
                <Label htmlFor="judul">Judul</Label>
                <Input
                  id="judul"
                  type="text"
                  value={data.judul}
                  onChange={(e) => setData("judul", e.target.value)}
                  placeholder="Masukkan judul produk hukum"
                />
                {errors.judul && (
                  <p className="text-red-500 text-sm">{errors.judul}</p>
                )}
              </div>

              {/* Nomor & Tahun */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomor">Nomor</Label>
                  <Input
                    id="nomor"
                    type="text"
                    value={data.nomor}
                    onChange={(e) => setData("nomor", e.target.value)}
                    placeholder="Contoh: 12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tahun">Tahun</Label>
                  <Input
                    id="tahun"
                    type="number"
                    value={data.tahun}
                    onChange={(e) => setData("tahun", e.target.value)}
                    placeholder="Contoh: 2024"
                  />
                </div>
              </div>

              {/* Ringkasan */}
              <div className="space-y-2">
                <Label htmlFor="ringkasan">Ringkasan</Label>
                <Textarea
                  id="ringkasan"
                  value={data.ringkasan}
                  onChange={(e) => setData("ringkasan", e.target.value)}
                  placeholder="Tuliskan ringkasan singkat..."
                />
              </div>

              {/* Subjek & Kata Kunci */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subjek">Subjek</Label>
                  <Input
                    id="subjek"
                    type="text"
                    value={data.subjek}
                    onChange={(e) => setData("subjek", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kata_kunci">Kata Kunci</Label>
                  <Input
                    id="kata_kunci"
                    type="text"
                    value={data.kata_kunci}
                    onChange={(e) => setData("kata_kunci", e.target.value)}
                  />
                </div>
              </div>

              {/* Tanggal Penetapan */}
              <div className="space-y-2">
                <Label htmlFor="tanggal_penetapan">Tanggal Penetapan</Label>
                <Input
                  id="tanggal_penetapan"
                  type="date"
                  value={data.tanggal_penetapan}
                  onChange={(e) =>
                    setData("tanggal_penetapan", e.target.value)
                  }
                />
              </div>

              {/* Dropdown Relasi */}
              <div className="grid grid-cols-2 gap-4">
                {/* Instansi */}
                <div className="space-y-2">
                  <Label htmlFor="instansi_id">Instansi</Label>
                  <select
                    id="instansi_id"
                    value={data.instansi_id}
                    onChange={(e) => setData("instansi_id", e.target.value)}
                    className="w-full border rounded-md p-2"
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
                <div className="space-y-2">
                  <Label htmlFor="status_peraturan_id">Status Peraturan</Label>
                  <select
                    id="status_peraturan_id"
                    value={data.status_peraturan_id}
                    onChange={(e) =>
                      setData("status_peraturan_id", e.target.value)
                    }
                    className="w-full border rounded-md p-2"
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
                <div className="space-y-2">
                  <Label htmlFor="tipe_dokumen_id">Tipe Dokumen</Label>
                  <select
                    id="tipe_dokumen_id"
                    value={data.tipe_dokumen_id}
                    onChange={(e) =>
                      setData("tipe_dokumen_id", e.target.value)
                    }
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">-- Pilih Tipe Dokumen --</option>
                    {props.tipeDokumens?.map((td) => (
                      <option key={td.id} value={td.id}>
                        {td.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Jenis Hukum */}
                <div className="space-y-2">
                  <Label htmlFor="jenis_hukum_id">Jenis Hukum</Label>
                  <select
                    id="jenis_hukum_id"
                    value={data.jenis_hukum_id}
                    onChange={(e) => setData("jenis_hukum_id", e.target.value)}
                    className="w-full border rounded-md p-2"
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

              {/* Upload Berkas */}
              <div className="space-y-2">
                <Label htmlFor="berkas">Berkas</Label>
                <Input
                  id="berkas"
                  type="file"
                  onChange={(e) => setData("berkas", e.target.files[0])}
                  className="cursor-pointer"
                />
              </div>

              {/* Tombol */}
              <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                  {processing ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
