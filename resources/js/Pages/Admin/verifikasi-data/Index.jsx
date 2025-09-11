import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function VerifikasiIndex() {
  const { props } = usePage();
  const data = props.produkHukums || [];

  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");

  const handleOpen = (item) => {
    setSelected(item);
    setStatus(item.status_id || "");
  };

  const handleClose = () => {
    setSelected(null);
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(route("verifikasi-data.update", selected.id), {
      status_id: status,
    }, {
      onSuccess: handleClose,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Halaman Verifikasi Data</h1>

        {/* Table */}
        <div className="overflow-x-auto border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-3 py-2 text-left">ID</th>
                <th className="border px-3 py-2 text-left">Judul</th>
                <th className="border px-3 py-2 text-center">Tahun</th>
                <th className="border px-3 py-2 text-center">Status</th>
                <th className="border px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-3 py-2">{item.id}</td>
                  <td className="border px-3 py-2">{item.judul}</td>
                  <td className="border px-3 py-2 text-center">{item.tahun}</td>
                  <td className="border px-3 py-2 text-center">
                    {item.status_verifikasi?.nama_status}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleOpen(item)}
                    >
                      Validasi
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-xl w-[500px] relative p-6">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold mb-4">Validasi Dokumen</h2>
              <p className="mb-4 text-sm text-gray-600">
                Judul: <span className="font-semibold">{selected.judul}</span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Pilih Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="1">Pending</option>
                    <option value="2">Approved</option>
                    <option value="3">Rejected</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleClose}>
                    Batal
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    Simpan
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
