// resources/js/Pages/Admin/ProdukHukum/ProdukHukumTable.jsx
import React, { useState, useMemo } from "react";
import { router } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { Search, Filter, Eye, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/Components/Tooltip";

export default function ProdukHukumTable({ data, instansis, tipes, onDetail , onEdit }) {
  const [filterText, setFilterText] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
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
    { name: "Judul", selector: (row) => row.judul, grow: 2, wrap: true, sortable: true },
    { name: "Nomor", selector: (row) => row.nomor, center: true, sortable: true },
    { name: "Tahun", selector: (row) => row.tahun, center: true, sortable: true },

    // ✅ Tambahan kolom Status Verifikasi
  {
    name: "Status Verifikasi",
    cell: (row) => {
      const status = row.status_verifikasi?.nama_status || "Belum Ditentukan";
      switch (status.toLowerCase()) {
        case "pending":
          return badge("Pending", "bg-yellow-100 text-yellow-700");
        case "approved":
          return badge("Diterima", "bg-green-100 text-green-700");
        case "rejected":
          return badge("Ditolak", "bg-red-100 text-red-700");
        default:
          return badge(status, "bg-gray-100 text-gray-700");
      }
    },
    center: true,
    sortable: true,
  },

    {
      name: "Status",
      cell: (row) =>
        row.status_peraturan?.nama === "Berlaku"
          ? badge("Berlaku", "bg-green-100 text-green-700")
          : badge(row.status_peraturan?.nama || "Unknown", "bg-yellow-100 text-yellow-700"),
      center: true,
    },
    {
  name: "Aksi",
  cell: (row) => (
    <div className="flex gap-2 justify-center">
      {/* Detail */}
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

      {/* Edit */}
      <Tooltip content="Edit">
        <Button
          size="icon"
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
          onClick={() => onEdit(row)} // ✅ buka modal
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </Tooltip>

      {/* Hapus */}
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

  const FilterChips = () => {
    const chips = [];
    if (selectedFilters.status) chips.push({ key: "status", label: selectedFilters.status });
    if (selectedFilters.instansi_id) {
      const instansi = instansis.find((i) => i.id == selectedFilters.instansi_id);
      chips.push({ key: "instansi_id", label: instansi?.nama });
    }
    if (selectedFilters.tahun) chips.push({ key: "tahun", label: `Tahun ${selectedFilters.tahun}` });
    if (selectedFilters.tipe) chips.push({ key: "tipe", label: selectedFilters.tipe });

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
              onClick={() => setSelectedFilters((prev) => ({ ...prev, [chip.key]: "" }))}
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
    <Card className="shadow-lg border rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">📑 Daftar Produk Hukum</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="😔 Tidak ada produk hukum"
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
              <FilterChips />
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
