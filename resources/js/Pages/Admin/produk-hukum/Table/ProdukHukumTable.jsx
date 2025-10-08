import DataTable from "react-data-table-component";
import { Search, Filter, Eye, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip } from "@/Components/Tooltip";
import { router } from "@inertiajs/react";

export default function ProdukHukumTable({
  data,
  search,
  setSearch,
  selectedFilters,
  setSelectedFilters,
  onOpenFilter,
  onSelect,
}) {
  const badge = (label, color) => (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
      {label}
    </span>
  );

  const columns = [
    { name: "ID", selector: (row) => row.id, width: "70px", sortable: true },
    {
      name: "Judul",
      selector: (row) => row.judul,
      grow: 2,
      wrap: true,
      sortable: true,
    },
    {
      name: "Nomor",
      cell: (row) => <div className="text-center w-full">{row.nomor}</div>,
      sortable: true,
    },
    {
      name: "Tahun",
      cell: (row) => <div className="text-center w-full">{row.tahun}</div>,
      sortable: true,
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
              onClick={() => row && onSelect(row)}
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
      width: "150px",
    },
  ];

  const activeFilters = Object.entries(selectedFilters).filter(([_, v]) => v);
  const FilterChips = () =>
    activeFilters.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-2">
        {activeFilters.map(([key, value]) => (
          <span
            key={key}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {value}
            <button
              onClick={() =>
                setSelectedFilters((prev) => ({ ...prev, [key]: "" }))
              }
              className="hover:text-blue-900"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    );

  return (
    <Card className="shadow-lg border rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          📑 Daftar Produk Hukum
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={data}
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Filter Button */}
                <Button
                  onClick={onOpenFilter}
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
