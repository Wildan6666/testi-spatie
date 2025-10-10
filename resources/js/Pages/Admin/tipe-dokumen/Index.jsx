import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";

export default function TipeDokumenPage() {
  const { props } = usePage();
  const documentTypes = props.tipeDokumens || [];

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "create" | "edit" | "delete"
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  // 🧩 tambahkan kode & deskripsi di form
  const { data, setData, post, put, delete: destroy, reset } = useForm({
    kode: "",
    nama: "",
    deskripsi: "",
  });

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setSelected(item);
    setData({
      kode: item?.kode || "",
      nama: item?.nama || "",
      deskripsi: item?.deskripsi || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
    reset("kode", "nama", "deskripsi");
  };

  const handleSubmit = () => {
    if (modalType === "create") {
      post(route("tipe-dokumen.store"), { onSuccess: handleCloseModal });
    } else if (modalType === "edit") {
      put(route("tipe-dokumen.update", selected.id), { onSuccess: handleCloseModal });
    } else if (modalType === "delete") {
      destroy(route("tipe-dokumen.destroy", selected.id), { onSuccess: handleCloseModal });
    }
  };

  // Filter data berdasarkan pencarian
  const filteredData = documentTypes.filter(
    (t) =>
      t.nama.toLowerCase().includes(search.toLowerCase()) ||
      t.kode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-6 border-b">
            <h1 className="text-xl font-bold text-gray-800">Daftar Tipe Dokumen</h1>
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari kode atau nama..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <button
                onClick={() => handleOpenModal("create")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
              >
                <Plus className="w-4 h-4" />
                Tambah
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">ID</th>
                  <th className="px-6 py-3 text-left font-semibold">Kode</th>
                  <th className="px-6 py-3 text-left font-semibold">Nama</th>
                  <th className="px-6 py-3 text-left font-semibold">Deskripsi</th>
                  <th className="px-6 py-3 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((type) => (
                    <tr key={type.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-3">{type.id}</td>
                      <td className="px-6 py-3 font-semibold text-gray-700">{type.kode}</td>
                      <td className="px-6 py-3">{type.nama}</td>
                      <td className="px-6 py-3 text-gray-600">
                        {type.deskripsi || "-"}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          {/* Edit */}
                          <button
                            onClick={() => handleOpenModal("edit", type)}
                            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => handleOpenModal("delete", type)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      Tidak ada tipe dokumen
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-xl w-96 relative p-6">
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {modalType === "create"
                  ? "Tambah Tipe Dokumen"
                  : modalType === "edit"
                  ? "Edit Tipe Dokumen"
                  : "Hapus Tipe Dokumen"}
              </h2>

              {modalType === "create" || modalType === "edit" ? (
                <div className="space-y-3">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Kode Dokumen
                    </label>
                    <input
                      type="text"
                      value={data.kode}
                      onChange={(e) => setData("kode", e.target.value)}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Contoh: PERDA"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Nama Dokumen
                    </label>
                    <input
                      type="text"
                      value={data.nama}
                      onChange={(e) => setData("nama", e.target.value)}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      Deskripsi
                    </label>
                    <textarea
                      value={data.deskripsi}
                      onChange={(e) => setData("deskripsi", e.target.value)}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Tuliskan deskripsi singkat..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              ) : (
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
                  onClick={handleSubmit}
                  className={`px-4 py-2 rounded-lg text-white shadow transition ${
                    modalType === "edit" || modalType === "create"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {modalType === "edit"
                    ? "Simpan"
                    : modalType === "create"
                    ? "Tambah"
                    : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
