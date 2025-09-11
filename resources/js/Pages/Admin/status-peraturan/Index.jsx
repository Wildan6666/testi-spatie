// resources/js/Pages/Master/StatusPeraturan.jsx
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function StatusPeraturanPage() {
  const { status } = usePage().props; // Data dari controller Laravel

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "create" | "edit" | "delete"
  const [selected, setSelected] = useState(null);
  const [nama, setNama] = useState("");

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelected(item);
    setNama(item ? item.nama : "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelected(null);
    setNama("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "create") {
      Inertia.post("/status-peraturan", { nama }, { onSuccess: closeModal });
    } else if (modalType === "edit") {
      Inertia.put(`/status-peraturan/${selected.id}`, { nama }, { onSuccess: closeModal });
    } else if (modalType === "delete") {
      Inertia.delete(`/status-peraturan/${selected.id}`, { onSuccess: closeModal });
    }
  };

  return (
    <AdminLayout>
      <Head title="Status Peraturan" />
      <div className="max-w-5xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Data Status Peraturan
          </h1>
          <Button
            onClick={() => openModal("create")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </Button>
        </div>

        {/* Tabel */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Status Peraturan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left">ID</th>
                    <th className="px-3 py-2 text-left">Nama</th>
                    <th className="px-3 py-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {status.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-3 py-2">{item.id}</td>
                      <td className="px-3 py-2">{item.nama}</td>
                      <td className="px-3 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => openModal("edit", item)}
                            className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => openModal("delete", item)}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-xl w-96 relative p-6"
            >
              {/* Tombol close */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {modalType === "create" && "Tambah Status"}
                {modalType === "edit" && "Edit Status"}
                {modalType === "delete" && "Hapus Status"}
              </h2>

              {modalType !== "delete" ? (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Nama Status
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              ) : (
                <p className="text-gray-700">
                  Apakah yakin ingin menghapus{" "}
                  <span className="font-semibold">{selected?.nama}</span>?
                </p>
              )}

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white shadow transition ${
                    modalType === "create" || modalType === "edit"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {modalType === "create" && "Simpan"}
                  {modalType === "edit" && "Update"}
                  {modalType === "delete" && "Hapus"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
