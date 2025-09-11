import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export default function InstansiPage({ instansi }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data, setData, post, put, processing, errors, reset } = useForm({
    nama: "",
    singkatan: "",
    alamat: "",
    kontak: "",
  });

  const openCreate = () => {
    reset();
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setData({
      nama: item.nama,
      singkatan: item.singkatan,
      alamat: item.alamat,
      kontak: item.kontak,
    });
    setOpen(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (editing) {
      // update
      router.put(route("instansi.update", editing), data, {
        onSuccess: () => {
          reset();
          setEditing(null);
          setOpen(false);
        },
      });
    } else {
      // create
      post(route("instansi.store"), {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      });
    }
  };

  const destroy = (id) => {
    if (confirm("Yakin mau hapus instansi ini?")) {
      router.delete(route("instansi.destroy", id));
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Daftar Instansi Penerbit
            </CardTitle>
            <Button
              onClick={openCreate}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Nama Instansi</th>
                    <th className="p-3 text-left">Singkatan</th>
                    <th className="p-3 text-left">Alamat</th>
                    <th className="p-3 text-left">Kontak</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {instansi.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">{item.nama}</td>
                      <td className="p-3">{item.singkatan}</td>
                      <td className="p-3">{item.alamat}</td>
                      <td className="p-3">{item.kontak}</td>
                      <td className="p-3 text-center flex justify-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => openEdit(item)}
                          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => destroy(item.id)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Create/Edit */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold mb-4">
              {editing ? "Edit Instansi" : "Tambah Instansi"}
            </h2>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label>Nama</label>
                <input
                  type="text"
                  value={data.nama}
                  onChange={(e) => setData("nama", e.target.value)}
                  className="w-full border p-2 rounded"
                />
                {errors.nama && (
                  <p className="text-red-500 text-sm">{errors.nama}</p>
                )}
              </div>

              <div>
                <label>Singkatan</label>
                <input
                  type="text"
                  value={data.singkatan}
                  onChange={(e) => setData("singkatan", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label>Alamat</label>
                <textarea
                  value={data.alamat}
                  onChange={(e) => setData("alamat", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label>Kontak</label>
                <input
                  type="text"
                  value={data.kontak}
                  onChange={(e) => setData("kontak", e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editing ? "Update" : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
