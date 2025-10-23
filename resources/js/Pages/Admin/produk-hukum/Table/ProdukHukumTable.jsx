import React, { useState, useMemo } from "react";
import { router } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { Search, Filter, Eye, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/Components/Tooltip";

export default function ProdukHukumTable({
  data,
  instansis,
  tipes,
  onDetail,
  onEdit,
}) {
  const [filterText, setFilterText] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    status: "",
    instansi_id: "",
    tahun: "",
    tipe: "",
  });

  const tahunOptions = useMemo(() => {
    const years = [...new Set(data.map((item) => item.tahun).filter(Boolean))];
    return years.sort((a, b) => b - a);
  }, [data]);

  const badge = (label, color) => (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
      {label}
    </span>
  );

  // === Filtering logic ===
  const filteredData = data.filter((item) => {
    const searchMatch =
      item.judul?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.kata_kunci?.toLowerCase().includes(filterText.toLowerCase());

    const statusMatch = selectedFilters.status
      ? item.status_peraturan?.nama === selectedFilters.status
      : true;

    const instansiMatch = selectedFilters.instansi_id
      ? item.instansi?.id == selectedFilters.instansi_id
      : true;

    const tahunMatch = selectedFilters.tahun
      ? String(item.tahun) === String(selectedFilters.tahun)
      : true;

    const tipeMatch = selectedFilters.tipe
      ? item.tipe_dokumen?.nama === selectedFilters.tipe
      : true;

    return searchMatch && statusMatch && instansiMatch && tahunMatch && tipeMatch;
  });

  const columns = [
    { name: "ID", selector: (row) => row.id, width: "70px", sortable: true },
    {
      name: "Judul",
      selector: (row) => row.judul,
      grow: 2,
      wrap: true,
      sortable: true,
    },
    { name: "Nomor", selector: (row) => row.nomor, center: true, sortable: true },
    { name: "Tahun", selector: (row) => row.tahun, center: true, sortable: true },
    {
      name: "Status Verifikasi",
      cell: (row) => {
        const status = row.status_verifikasi?.nama_status || "Belum Ditentukan";
        switch (status.toLowerCase()) {
          case "pending":
            return badge("Pending", "bg-yellow-100 text-yellow-700");
          case "approved":
            return badge("Disetujui", "bg-green-100 text-green-700");
          case "rejected":
            return badge("Ditolak", "bg-red-100 text-red-700");
          default:
            return badge(status, "bg-gray-100 text-gray-700");
        }
      },
      center: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row.status_peraturan?.nama === "Berlaku"
          ? badge("Berlaku", "bg-green-100 text-green-700")
          : badge(
              row.status_peraturan?.nama || "Unknown",
              "bg-yellow-100 text-yellow-700"
            ),
      center: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex gap-2 justify-center">
          <Tooltip content="Detail">
            <Button
              size="icon"
              variant="outline"
              className="border-gray-300"
              onClick={() => onDetail(row)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Kirim Ulang (Resend)">
            <Button
              size="icon"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => router.visit(route("produk-hukum.resend.view", row.id))}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </Tooltip>


          <Tooltip content="Hapus">
            <Button
              size="icon"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                if (confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) {
                  router.delete(route("produk-hukum.destroy", row.id));
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      ),
      ignoreRowClick: true,
      center: true,
      width: "150px",
    },
  ];

  // === Filter Chips ===
  const FilterChips = () => {
    const chips = [];
    if (selectedFilters.status)
      chips.push({ key: "status", label: selectedFilters.status });
    if (selectedFilters.instansi_id) {
      const instansi = instansis.find((i) => i.id == selectedFilters.instansi_id);
      chips.push({ key: "instansi_id", label: instansi?.nama });
    }
    if (selectedFilters.tahun)
      chips.push({ key: "tahun", label: `Tahun ${selectedFilters.tahun}` });
    if (selectedFilters.tipe)
      chips.push({ key: "tipe", label: selectedFilters.tipe });

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
                setSelectedFilters((prev) => ({ ...prev, [chip.key]: "" }))
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

  // === Modal Filter ===
  const FilterModal = () => {
    if (!showFilterModal) return null;

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative border border-gray-200">
          {/* Tombol Close */}
          <button
            onClick={() => setShowFilterModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <Filter className="w-5 h-5 text-orange-600" /> Filter Data Produk Hukum
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {/* Status */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <select
                className="w-full border rounded-lg p-2 text-sm"
                value={selectedFilters.status}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                <option value="">Semua</option>
                <option value="Berlaku">Berlaku</option>
                <option value="Tidak Berlaku">Tidak Berlaku</option>
              </select>
            </div>

            {/* Instansi */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Instansi</label>
              <select
                className="w-full border rounded-lg p-2 text-sm"
                value={selectedFilters.instansi_id}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    instansi_id: e.target.value,
                  }))
                }
              >
                <option value="">Semua</option>
                {instansis.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Tahun */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tahun</label>
              <select
                className="w-full border rounded-lg p-2 text-sm"
                value={selectedFilters.tahun}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    tahun: e.target.value,
                  }))
                }
              >
                <option value="">Semua</option>
                {tahunOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipe Dokumen */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Tipe Dokumen
              </label>
              <select
                className="w-full border rounded-lg p-2 text-sm"
                value={selectedFilters.tipe}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    tipe: e.target.value,
                  }))
                }
              >
                <option value="">Semua</option>
                {tipes.map((t) => (
                  <option key={t.id} value={t.nama}>
                    {t.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-6">
            <Button
              onClick={() =>
                setSelectedFilters({
                  status: "",
                  instansi_id: "",
                  tahun: "",
                  tipe: "",
                })
              }
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Reset
            </Button>
            <Button
              onClick={() => setShowFilterModal(false)}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Terapkan
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // === Render ===
  return (
    <Card className="shadow-lg border rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Daftar Produk Hukum
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="Tidak ada produk hukum"
          subHeader
          subHeaderComponent={
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-wrap justify-between items-center gap-2">
                {/* Search */}
                <div className="relative w-full md:w-1/3">
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari judul / kata kunci..."
                    className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>

                {/* Filter Button */}
                <Button
                  onClick={() => setShowFilterModal(true)}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <Filter size={16} /> Filter
                </Button>
              </div>
              <FilterChips />
            </div>
          }
        />
      </CardContent>
      <FilterModal />
    </Card>
  );
}
