import React, { useState, useMemo } from "react";
import { usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "react-data-table-component";
import { Search, Filter, X, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifikasiIndex() {
  const { props } = usePage();
  // Ambil data array dari pagination (Laravel paginate)
  const data = Array.isArray(props.produkHukums)
    ? props.produkHukums
    : props.produkHukums?.data || [];

  const filters = props.filters || {};
  const instansis = props.instansis || [];

  const [filterText, setFilterText] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    status_id: filters.status_id || "",
    instansi_id: filters.instansi_id || "",
    tahun: filters.tahun || "",
  });

  // Ambil daftar tahun unik dari data
  const tahunOptions = useMemo(() => {
    const years = [...new Set(data.map((item) => item.tahun).filter(Boolean))];
    return years.sort((a, b) => b - a);
  }, [data]);

  // Render badge status
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
      <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
        -
      </span>
    );
  };

  // Filter data
  const filteredData = data.filter((item) => {
    const searchMatch = item.judul
      ?.toLowerCase()
      .includes(filterText.toLowerCase());

    const statusMatch = selectedFilters.status_id
      ? item.status_id == selectedFilters.status_id
      : true;

    const instansiMatch = selectedFilters.instansi_id
      ? item.instansi?.id == selectedFilters.instansi_id
      : true;

    const tahunMatch = selectedFilters.tahun
      ? String(item.tahun) === String(selectedFilters.tahun)
      : true;

    return searchMatch && statusMatch && instansiMatch && tahunMatch;
  });

  // Kolom tabel
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Judul",
      selector: (row) => row.judul,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Tahun",
      selector: (row) => row.tahun,
      sortable: true,
      center: true,
      width: "100px",
    },
    {
      name: "Instansi",
      selector: (row) => row.instansi?.nama || "-",
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.status_verifikasi?.nama_status,
      cell: (row) => renderStatus(row.status_verifikasi?.nama_status),
      sortable: true,
      center: true,
      width: "150px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <button
          onClick={() => router.get(route("verifikasi-data.show", row.id))}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          Detail
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      center: true,
    },
  ];

  // Chips filter aktif
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
      const instansi = instansis.find(
        (i) => i.id == selectedFilters.instansi_id
      );
      chips.push({ key: "instansi_id", label: instansi?.nama });
    }
    if (selectedFilters.tahun) {
      chips.push({ key: "tahun", label: `Tahun ${selectedFilters.tahun}` });
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
      <div className="p-6 bg-white rounded-2xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          📄 Verifikasi Dokumen
        </h1>

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="😔 Belum ada data dokumen"
          subHeader
          subHeaderComponent={
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-wrap justify-between items-center gap-2">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/3">
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari judul dokumen..."
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
                fontSize: "14px",
                backgroundColor: "#f9fafb",
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
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Filter
              </h2>

              {/* Status */}
              <label className="block mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Status
                </span>
                <select
                  value={selectedFilters.status_id}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      status_id: e.target.value,
                    }))
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
                <span className="text-sm font-medium text-gray-700">
                  Instansi
                </span>
                <select
                  value={selectedFilters.instansi_id}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      instansi_id: e.target.value,
                    }))
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

              {/* Tahun */}
              <label className="block mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Tahun
                </span>
                <select
                  value={selectedFilters.tahun}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      tahun: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full border rounded-lg p-2"
                >
                  <option value="">Semua</option>
                  {tahunOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <Button
                  onClick={() => {
                    setSelectedFilters({
                      status_id: "",
                      instansi_id: "",
                      tahun: "",
                    });
                    setOpenFilter(false);
                  }}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => setOpenFilter(false)}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
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
