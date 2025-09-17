import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";

export default function Show() {
  const { props } = usePage();
  const produk = props.produk;

  const [status, setStatus] = useState(produk.status_id || "");
  const [catatan, setCatatan] = useState(produk.catatan_verifikasi || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(route("verifikasi-data.update", produk.id), {
      status_id: status,
      catatan_verifikasi: catatan,
    });
  };

  // Render badge status
  const renderStatus = (nama) => {
    if (nama === "Approved")
      return <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Approved</span>;
    if (nama === "Rejected")
      return <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Rejected</span>;
    if (nama === "Pending")
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Pending</span>;
    return <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded">Belum</span>;
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded-xl shadow space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Detail Dokumen</h1>
          <Button onClick={() => router.get(route("verifikasi-data.index"))} variant="outline">
            ← Kembali
          </Button>
        </div>

        {/* Info Dokumen */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <p><span className="font-semibold">Judul:</span> {produk.judul}</p>
            <p><span className="font-semibold">Nomor:</span> {produk.nomor || "-"}</p>
            <p><span className="font-semibold">Tahun:</span> {produk.tahun || "-"}</p>
            <p><span className="font-semibold">Instansi:</span> {produk.instansi?.nama || "-"}</p>
          </div>
          <div>
            <p><span className="font-semibold">Tanggal Penetapan:</span> {produk.tanggal_penetapan || "-"}</p>
            <p><span className="font-semibold">Status:</span> {renderStatus(produk.status_verifikasi?.nama_status)}</p>
            <p><span className="font-semibold">Verifikator:</span> {produk.verifikator?.name || "-"}</p>
            <p><span className="font-semibold">Diverifikasi pada:</span> {produk.verified_at || "-"}</p>
          </div>
        </div>

        {/* Preview Dokumen */}
        {produk.berkas && (
          <div>
            <h2 className="font-semibold mb-2">📄 Pratinjau Dokumen</h2>
            {produk.berkas.endsWith(".pdf") ? (
              <iframe
                src={`/storage/${produk.berkas}`}
                className="w-full h-[600px] border rounded"
                title="Dokumen Preview"
              />
            ) : (
              <img
                src={`/storage/${produk.berkas}`}
                alt="Dokumen"
                className="max-w-full border rounded"
              />
            )}
          </div>
        )}

        {/* Form Verifikasi */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status Verifikasi</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="">-- Pilih --</option>
              <option value="1">Pending</option>
              <option value="2">Approved</option>
              <option value="3">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catatan</label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full border rounded-md p-2"
              rows={3}
              placeholder="Tuliskan alasan verifikasi..."
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Simpan Verifikasi
            </Button>
          </div>
        </form>

      {/* Riwayat Verifikasi */}
<div className="mt-6">
  <h2 className="font-semibold mb-2">📝 Riwayat Verifikasi</h2>
  {produk.riwayat_verifikasi?.length > 0 ? (
    <table className="w-full text-sm border rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-3 py-2">Tanggal</th>
          <th className="border px-3 py-2">Verifikator</th>
          <th className="border px-3 py-2">Status</th>
          <th className="border px-3 py-2">Catatan</th>
        </tr>
      </thead>
      <tbody>
        {produk.riwayat_verifikasi.map((log, idx) => (
          <tr key={log.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="border px-3 py-2">{log.created_at}</td>
            <td className="border px-3 py-2">{log.user?.name}</td>
            <td className="border px-3 py-2">{log.status?.nama_status}</td>
            <td className="border px-3 py-2">{log.catatan || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-500 text-sm">Belum ada riwayat verifikasi</p>
  )}
</div>
      </div>
    </AdminLayout>
  );
}
