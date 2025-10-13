// resources/js/Pages/Admin/master-status/Index.jsx
import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, router } from "@inertiajs/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputLabel from "@/Components/InputLabel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function StatusVerifikasiPage() {
  const { statuses } = usePage().props; // data dari controller
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    nama_status: "",
    kode: "",
    deskripsi: "",
  });

  // buka modal tambah
  const handleAdd = () => {
    setForm({ id: null, nama_status: "", kode: "", deskripsi: "" });
    setOpen(true);
  };

  // buka modal edit
  const handleEdit = (item) => {
    setForm(item);
    setOpen(true);
  };

  // hapus data
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      router.delete(`/master-status/${id}`, {
        onSuccess: () => {
          console.log("Data berhasil dihapus");
        },
        onError: () => {
          alert("Terjadi kesalahan saat menghapus data");
        },
      });
    }
  };

  // simpan data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id) {
      router.put(`/master-status/${form.id}`, form, {
        onSuccess: () => setOpen(false),
      });
    } else {
      router.post("/master-status", form, {
        onSuccess: () => setOpen(false),
      });
    }
  };

  return (
    <AdminLayout>
      <Head title="Master Status Verifikasi" />
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Daftar Status Verifikasi
            </CardTitle>
            <Button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
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
                    <th className="p-3 text-left">Kode</th>
                    <th className="p-3 text-left">Deskripsi</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {statuses.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">{item.nama_status}</td>
                      <td className="p-3">{item.kode}</td>
                      <td className="p-3">{item.deskripsi}</td>
                      <td className="p-3 text-center flex justify-center gap-2">
                       {/* Edit */}
                          <button
                            onClick={() => openModal(item)}
                            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* Modal Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {form.id ? "Edit Status Verifikasi" : "Tambah Status Verifikasi"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <InputLabel>Nama Status</InputLabel>
              <Input
                value={form.nama_status}
                onChange={(e) =>
                  setForm({ ...form, nama_status: e.target.value })
                }
                required
              />
            </div>
            <div>
              <InputLabel>Kode</InputLabel>
              <Input
                value={form.kode}
                onChange={(e) => setForm({ ...form, kode: e.target.value })}
              />
            </div>
            <div>
              <InputLabel>Deskripsi</InputLabel>
              <Input
                value={form.deskripsi}
                onChange={(e) =>
                  setForm({ ...form, deskripsi: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 text-white">
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
