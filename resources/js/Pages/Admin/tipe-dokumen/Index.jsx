import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function TipeDokumenPage() {
  // Dummy data
  const [documentTypes] = useState([
    { id: 1, nama: "Kepegawaian" },
    { id: 2, nama: "Akademik" },
    { id: 3, nama: "Keuangan" },
  ]);

  // State modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" | "delete"
  const [selected, setSelected] = useState(null);

  const handleOpenModal = (type, item) => {
    setModalType(type);
    setSelected(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Card */}
        <div className="bg-white rounded-xl shadow border border-gray-200">
          {/* Header Card */}
          <div className="flex items-center justify-between p-6 border-b">
            <h1 className="text-xl font-bold text-gray-800">
              Daftar Tipe Dokumen
            </h1>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          </div>

          {/* Tabel */}
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">ID</th>
                  <th className="px-6 py-3 text-left font-semibold">Nama</th>
                  <th className="px-6 py-3 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documentTypes.map((type) => (
                  <tr key={type.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3">{type.id}</td>
                    <td className="px-6 py-3">{type.nama}</td>
                    <td className="px-6 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal("edit", type)}
                          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow-sm transition"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleOpenModal("delete", type)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-xl w-96 relative p-6">
              {/* Tombol close */}
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {modalType === "edit" ? "Edit Tipe Dokumen" : "Hapus Tipe Dokumen"}
              </h2>

              {modalType === "edit" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Nama Dokumen
                  </label>
                  <input
                    type="text"
                    defaultValue={selected?.nama}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              )}

              {modalType === "delete" && (
                <p className="text-gray-700">
                  Apakah yakin ingin menghapus{" "}
                  <span className="font-semibold">{selected?.nama}</span>?
                </p>
              )}

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleCloseModal}
                  className={`px-4 py-2 rounded-lg text-white shadow transition ${
                    modalType === "edit"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {modalType === "edit" ? "Simpan" : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
