import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "react-data-table-component";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Search, X, Filter,Eye } from "lucide-react";

export default function RiwayatVerifikasiIndex() {
  const { props } = usePage();
  const data = props.riwayats?.data || [];
  const filters = props.filters || {};
  const instansis = props.instansis || [];

  const [filterText, setFilterText] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    status_id: filters.status_id || "",
    instansi_id: filters.instansi_id || "",
  });
  const [selectedNote, setSelectedNote] = useState(null);

  const renderStatus = (nama) => {
    if (nama === "Approved")
      return (
        <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          <CheckCircle size={14} /> Approved
        </span>
      );
    if (nama === "Rejected")
      return (
        <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          <XCircle size={14} /> Rejected
        </span>
      );
    if (nama === "Pending")
      return (
        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
          <Clock size={14} /> Pending
        </span>
      );
    return (
      <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">-</span>
    );
  };

  // Definisi kolom DataTable
  const columns = [
    {
      name: "Tanggal",
      selector: (row) => row.created_at,
      sortable: true,
      width: "140px",
    },
    {
      name: "Dokumen",
      selector: (row) => row.produk_hukum?.judul,
      sortable: true,
      grow: 2,
    },
    {
      name: "Instansi",
      selector: (row) => row.produk_hukum?.instansi?.nama,
      sortable: true,
    },
    {
      name: "Verifikator",
      selector: (row) => row.user?.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status?.nama_status,
      cell: (row) => renderStatus(row.status?.nama_status),
      center: true,
      width: "150px",
    },
    {
      name: "Catatan",
      cell: (row) => (
        <button
          onClick={() => setSelectedNote(row.catatan || "-")}
          className="text-blue-600 hover:underline text-sm"
        >
          Lihat Catatan
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      center: true,
    },
  ];

  // Filter data by search & filters
  const filteredItems = data.filter((item) => {
    const searchMatch =
      item.produk_hukum?.judul?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.user?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.produk_hukum?.instansi?.nama?.toLowerCase().includes(filterText.toLowerCase());

    const statusMatch = selectedFilters.status_id
      ? item.status_id == selectedFilters.status_id
      : true;

    const instansiMatch = selectedFilters.instansi_id
      ? item.produk_hukum?.instansi_id == selectedFilters.instansi_id
      : true;

    return searchMatch && statusMatch && instansiMatch;
  });

  // Chips
  const FilterChips = () => {
    const chips = [];
    if (selectedFilters.status_id) {
      chips.push({
        key: "status_id",
        label:
          selectedFilters.status_id === "1"
            ? "Pending"
            : selectedFilters.status_id === "2"
            ? "Approved"
            : "Rejected",
      });
    }
    if (selectedFilters.instansi_id) {
      const instansi = instansis.find((i) => i.id == selectedFilters.instansi_id);
      chips.push({ key: "instansi_id", label: instansi?.nama });
    }

    if (chips.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {chips.map((chip, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {chip.label}
            <button
              onClick={() =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  [chip.key]: "",
                }))
              }
              className="ml-1 hover:text-blue-900"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">📝 Riwayat Verifikasi</h1>

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="😔 Tidak ada riwayat verifikasi."
          subHeader
          subHeaderComponent={
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-wrap justify-between items-center gap-2">
                {/* Search bar */}
                <div className="relative w-full md:w-1/3">
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari dokumen / verifikator..."
                    className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>

                {/* Filter Button */}
                <Button
                  onClick={() => setOpenFilter(true)}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <Filter size={16} /> Filter
                </Button>
              </div>

              {/* Chips */}
              <FilterChips />
            </div>
          }
          customStyles={{
            headCells: {
              style: {
                fontWeight: "600",
                fontSize: "13px",
                textTransform: "uppercase",
                backgroundColor: "#f3f4f6",
              },
            },
            rows: {
              style: {
                fontSize: "14px",
                minHeight: "52px",
              },
            },
          }}
        />

        {/* Modal Catatan */}
        {selectedNote !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setSelectedNote(null)}
              >
                <X size={20} />
              </button>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Catatan Verifikasi</h2>
              <p className="text-gray-700 text-sm whitespace-pre-line">{selectedNote}</p>
              <div className="mt-6 text-right">
                <Button
                  onClick={() => setSelectedNote(null)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Filter */}
        {openFilter && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setOpenFilter(false)}
              >
                <X size={20} />
              </button>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter</h2>

              {/* Status */}
              <label className="block mb-3">
                <span className="text-sm font-medium text-gray-700">Status</span>
                <select
                  value={selectedFilters.status_id}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({ ...prev, status_id: e.target.value }))
                  }
                  className="mt-1 block w-full border rounded-lg p-2"
                >
                  <option value="">Semua</option>
                  <option value="1">Pending</option>
                  <option value="2">Approved</option>
                  <option value="3">Rejected</option>
                </select>
              </label>

              {/* Instansi */}
              <label className="block mb-3">
                <span className="text-sm font-medium text-gray-700">Instansi</span>
                <select
                  value={selectedFilters.instansi_id}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({ ...prev, instansi_id: e.target.value }))
                  }
                  className="mt-1 block w-full border rounded-lg p-2"
                >
                  <option value="">Semua</option>
                  {instansis.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.nama}
                    </option>
                  ))}
                </select>
              </label>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <Button
                  onClick={() => {
                    setSelectedFilters({ status_id: "", instansi_id: "" });
                    setOpenFilter(false);
                  }}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Reset
                </Button>
                <Button onClick={() => setOpenFilter(false)} className="bg-blue-600 text-white hover:bg-blue-700">
                  Terapkan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
