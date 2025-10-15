import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/Dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function JenisProdukHukumPage() {
  const { jenis } = usePage().props;

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    keterangan: "",
    singkatan: "",
    kode: "",
  });

  const openModal = (item = null) => {
    setEditing(item);
    setForm(
      item || { nama: "", keterangan: "", singkatan: "", kode: "" }
    );
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditing(null);
    setForm({ nama: "", keterangan: "", singkatan: "", kode: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      Inertia.put(`/jenis-hukum/${editing.id}`, form, {
        onSuccess: () => closeModal(),
      });
    } else {
      Inertia.post("/jenis-hukum", form, {
        onSuccess: () => closeModal(),
      });
    }
  };

  const handleDelete = (id) => {
    if (confirm("Yakin hapus data ini?")) {
      Inertia.delete(`/jenis-hukum/${id}`);
    }
  };

  return (
    <AdminLayout>
      <Head title="Jenis Produk Hukum" />
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Daftar Jenis Produk Hukum
            </CardTitle>
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => openModal()}
            >
              <Plus className="w-4 h-4" />
              Tambah
            </Button>
          </CardHeader>

          {/* Tabel */}
          <CardContent>
            <div className="overflow-hidden rounded-md border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Nama</th>
                    <th className="p-3 text-left">Singkatan</th>
                    <th className="p-3 text-left">Kode</th>
                    <th className="p-3 text-left">Keterangan</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jenis.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">{item.nama}</td>
                      <td className="p-3">{item.singkatan}</td>
                      <td className="p-3">{item.kode}</td>
                      <td className="p-3">{item.keterangan}</td>
                      <td className="p-3 flex justify-center gap-2">
                         {/* Edit */}
                          <button
                            onClick={() => openModal(item)}
                            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                            title="Edit"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                            title="Hapus"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Jenis Produk Hukum" : "Tambah Jenis Produk Hukum"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama
              </label>
              <Input
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Singkatan
              </label>
              <Input
                value={form.singkatan}
                onChange={(e) =>
                  setForm({ ...form, singkatan: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kode
              </label>
              <Input
                value={form.kode}
                onChange={(e) => setForm({ ...form, kode: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Keterangan
              </label>
              <Input
                value={form.keterangan}
                onChange={(e) =>
                  setForm({ ...form, keterangan: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeModal}>
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
