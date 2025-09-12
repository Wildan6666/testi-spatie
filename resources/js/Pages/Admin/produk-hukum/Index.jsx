import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import DetailModal from "./DetailModal";
import EditModal from "./EditModal";

export default function ProdukHukumPage() {
  const { props } = usePage();
  const data = props.produkHukums || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [selected, setSelected] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 🔍 Sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.direction === "ascending") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // 🔍 Filtering
  const filteredData = sortedData.filter(
    (item) =>
      item.judul?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kata_kunci?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📑 Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 👁️ Preview
  const handlePreview = (item) => setSelected(item);

  // 🗑️ Delete
  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      router.delete(route("produk-hukum.destroy", id), {
        onSuccess: () => {
          setSelected(null);
        },
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Produk Hukum
          </h1>
          <Link href={route("produk-hukum.create")}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md transition">
              <FiPlus className="w-5 h-5" /> Tambah Produk Hukum
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Cari produk hukum..."
              className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {["id", "judul", "nomor", "tahun", "status_peraturan"].map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column)}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      {column === "status_peraturan" ? "Status" : column.charAt(0).toUpperCase() + column.slice(1)}
                      {sortConfig.key === column &&
                        (sortConfig.direction === "ascending" ? (
                          <BsArrowUp className="w-4 h-4" />
                        ) : (
                          <BsArrowDown className="w-4 h-4" />
                        ))}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{item.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.judul}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">{item.nomor}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">{item.tahun}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                        {item.status_peraturan?.nama}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-3">
                      <button
                        onClick={() => handlePreview(item)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => setEditItem(item)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
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
                } hover:bg-blue-500 hover:text-white transition`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* Modal Detail */}
        {selected && <DetailModal data={selected} onClose={() => setSelected(null)} />}

        {/* Modal Edit */}
        {editItem && <EditModal data={editItem} onClose={() => setEditItem(null)} />}
      </div>
    </AdminLayout>
  );
}
