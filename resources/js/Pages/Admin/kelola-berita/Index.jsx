import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, X } from "lucide-react";
import { useState, useMemo } from "react";
import { router } from "@inertiajs/react";
import BeritaDataTable from "@/Components/berita/BeritaDataTable";

export default function BeritaIndex({ berita }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showFilterModal, setShowFilterModal] = useState(false);

  // 🔍 Filter data (client-side)
  const filteredData = useMemo(() => {
    return berita.filter((item) => {
      const matchSearch = item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus =
        status === "all" || item.status === status;
      const matchDate =
        (!dateRange.start || item.published_at >= dateRange.start) &&
        (!dateRange.end || item.published_at <= dateRange.end);
      return matchSearch && matchStatus && matchDate;
    });
  }, [berita, search, status, dateRange]);

  const handleDelete = (id) => {
    if (confirm("Yakin hapus berita ini?")) {
      router.delete(route("kelola-berita.destroy", id), { preserveScroll: true });
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">📰 Manajemen Berita</h1>

      {/* 🔎 Search & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari judul berita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Tombol Filter & Tambah */}
        <div className="flex gap-2">
          <Button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-4 py-2"
          >
            <Filter className="w-4 h-4" /> Filter
          </Button>

          <Button
            onClick={() => router.get(route("kelola-berita.create"))}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Tambah Berita
          </Button>
        </div>
      </div>

      {/* 🔹 Data Table */}
      <BeritaDataTable
        data={filteredData}
        onEdit={(row) => router.get(route("kelola-berita.edit", row.id))}
        onDelete={handleDelete}
      />

      {/* 🔹 Modal Filter */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setShowFilterModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              🔍 Filter Berita
            </h2>

            {/* Filter Form */}
            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Tanggal */}
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dari Tanggal
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sampai
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Tombol */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => {
                  setStatus("all");
                  setDateRange({ start: "", end: "" });
                  setShowFilterModal(false);
                }}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Reset
              </Button>
              <Button
                onClick={() => setShowFilterModal(false)}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Terapkan
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
