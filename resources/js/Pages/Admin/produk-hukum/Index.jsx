import React, { useState, useMemo } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "react-data-table-component";
import { Search, Filter, Eye, Pencil, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/Components/Tooltip";

export default function ProdukHukumPage() {
  const { props } = usePage();
  const data = props.produkHukums || [];
  const instansis = props.instansis || [];
  const tipes = props.tipes || [];

  const [filterText, setFilterText] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    status: "",
    instansi_id: "",
    tahun: "",
    tipe: "",
  });
  const [selected, setSelected] = useState(null);

  // Ambil daftar tahun unik dari data
  const tahunOptions = useMemo(() => {
    const years = [...new Set(data.map((item) => item.tahun).filter(Boolean))];
    return years.sort((a, b) => b - a);
  }, [data]);

  // Badge status
  const badge = (label, color) => (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
      {label}
    </span>
  );

  // Filter data
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

  // Kolom tabel
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
          onClick={() => setSelected(row)}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </Tooltip>

      {/* Edit */}
      <Tooltip content="Edit">
        <Button
          size="icon"
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
          onClick={() => router.get(route("produk-hukum.edit", row.id))}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </Tooltip>

      {/* Delete */}
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

  // Chips filter aktif
  const FilterChips = () => {
    const chips = [];
    if (selectedFilters.status)
      chips.push({ key: "status", label: selectedFilters.status });
    if (selectedFilters.instansi_id) {
      const instansi = instansis.find((i) => i.id == selectedFilters.instansi_id);
      chips.push({ key: "instansi_id", label: instansi?.nama });
    }
    if (selectedFilters.tahun) {
      chips.push({ key: "tahun", label: `Tahun ${selectedFilters.tahun}` });
    }
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
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            Manajemen Produk Hukum
          </h1>
          <Link href={route("produk-hukum.create")}>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
              <Plus className="w-4 h-4" />
              Tambah Produk Hukum
            </Button>
          </Link>
        </div>

        {/* DataTable */}
        <Card className="shadow-lg border rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              📑 Daftar Produk Hukum
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
                  {/* Chips */}
                  <FilterChips />
                </div>
              }
            />
          </CardContent>
        </Card>

        {/* Modal Filter */}
        {openFilter && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
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
                  value={selectedFilters.status}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="mt-1 block w-full border rounded-lg p-2"
                >
                  <option value="">Semua</option>
                  <option value="Berlaku">Berlaku</option>
                  <option value="Tidak Berlaku">Tidak Berlaku</option>
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

              {/* Tahun (single select) */}
              <label className="block mb-3">
                <span className="text-sm font-medium text-gray-700">Tahun</span>
                <select
                  value={selectedFilters.tahun}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({ ...prev, tahun: e.target.value }))
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

              {/* Tipe Dokumen */}
              <label className="block mb-3">
                <span className="text-sm font-medium text-gray-700">Tipe Dokumen</span>
                <select
                  value={selectedFilters.tipe}
                  onChange={(e) =>
                    setSelectedFilters((prev) => ({ ...prev, tipe: e.target.value }))
                  }
                  className="mt-1 block w-full border rounded-lg p-2"
                >
                  <option value="">Semua</option>
                  {tipes.map((t) => (
                    <option key={t.id} value={t.nama}>
                      {t.nama}
                    </option>
                  ))}
                </select>
              </label>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <Button
                  onClick={() =>
                    setSelectedFilters({ status: "", instansi_id: "", tahun: "", tipe: "" })
                  }
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

        {/* Modal Detail */}
        {selected && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[750px] relative p-6 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                {selected.judul}
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <p><span className="font-medium">Nomor:</span> {selected.nomor}</p>
                <p><span className="font-medium">Tahun:</span> {selected.tahun}</p>
                <p><span className="font-medium">Tanggal Penetapan:</span> {selected.tanggal_penetapan}</p>
                <p><span className="font-medium">Subjek:</span> {selected.subjek}</p>
                <p><span className="font-medium">Instansi:</span> {selected.instansi?.nama}</p>
                <p><span className="font-medium">Status Verifikasi:</span> {selected.status_verifikasi?.nama_status}</p>
                <p><span className="font-medium">Status Peraturan:</span> {selected.status_peraturan?.nama}</p>
                <p><span className="font-medium">Tipe Dokumen:</span> {selected.tipe_dokumen?.nama}</p>
                <p><span className="font-medium">Jenis Dokumen:</span> {selected.jenis_hukum?.nama}</p>
              </div>

              <div className="mt-6">
                <p className="font-medium mb-1">Ringkasan:</p>
                <p className="text-justify bg-gray-50 p-3 rounded-lg">{selected.ringkasan}</p>
              </div>

              <div className="mt-4">
                <p className="font-medium mb-1">Kata Kunci:</p>
                <p className="bg-gray-50 p-2 rounded-lg">{selected.kata_kunci}</p>
              </div>

              <div className="mt-4">
                <p className="font-medium mb-1">Berkas:</p>
                {selected.berkas ? (
                  <a
                    href={`/storage/${selected.berkas}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Lihat Berkas
                  </a>
                ) : (
                  <span className="text-gray-500">Tidak ada berkas</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
