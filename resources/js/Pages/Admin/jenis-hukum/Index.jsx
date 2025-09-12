import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

export default function JenisProdukHukumPage() {
  const { jenis } = usePage().props;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [form, setForm] = useState({
    nama: "",
    singkatan: "",
    kode: "",
    keterangan: "",
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...jenis].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";
    if (sortConfig.direction === "ascending") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const filteredItems = sortedItems.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.keterangan || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const openModal = (item = null) => {
    setEditing(item);
    setForm(item || { nama: "", singkatan: "", kode: "", keterangan: "" });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setForm({ nama: "", singkatan: "", kode: "", keterangan: "" });
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
      <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Jenis Produk Hukum</h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <FiPlus className="w-5 h-5" />
            Tambah
          </button>
        </div>

        {/* Search */}
        <div className="mb-4 flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari jenis produk hukum..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                {["id", "nama", "singkatan", "kode", "keterangan"].map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                      {sortConfig.key === column &&
                        (sortConfig.direction === "ascending" ? (
                          <BsArrowUp className="w-4 h-4" />
                        ) : (
                          <BsArrowDown className="w-4 h-4" />
                        ))}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.nama}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.singkatan}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.kode}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.keterangan}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal(item)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-500 hover:text-white transition-colors duration-200`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editing ? "Edit Jenis Produk Hukum" : "Tambah Jenis Produk Hukum"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {["nama", "singkatan", "kode", "keterangan"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type="text"
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={field !== "keterangan"}
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
