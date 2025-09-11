import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, Pencil, Trash2, Plus, X } from "lucide-react";
import SearchFilter from "@/Components/SearchFilter";
import DetailModal from "./DetailModal";
import EditModal from "./EditModal";

export default function ProdukHukumPage() {
  const { props } = usePage();
  const data = props.produkHukums || [];

  const [selected, setSelected] = useState(null);
  const [filteredData, setFilteredData] = useState(data);
  const [editItem, setEditItem] = useState(null);

  // 🔍 Pencarian
  const handleSearch = (query) => {
    setFilteredData(
      data.filter(
        (item) =>
          item.judul?.toLowerCase().includes(query.toLowerCase()) ||
          item.kata_kunci?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // 🏷️ Filter tahun & tipe
  const handleFilter = ({ tahun, tipe }) => {
    setFilteredData(
      data.filter((item) => {
        const matchTahun = tahun ? item.tahun == tahun : true;
        const matchTipe = tipe ? item.tipe_dokumen?.nama === tipe : true;
        return matchTahun && matchTipe;
      })
    );
  };

  // 👁️ Detail
  const handlePreview = (item) => setSelected(item);
  const handleClose = () => setSelected(null);

  // ✏️ Edit
  const handleEdit = (id) => {
    router.visit(route("produk-hukum.edit", id));
  };

  // 🗑️ Hapus
const handleDelete = (id) => {
  if (confirm("Yakin ingin menghapus data ini?")) {
    router.delete(route("produk-hukum.destroy", id), {
      onSuccess: () => {
        setSelected(null); // Tutup modal jika terbuka
        setFilteredData((prev) => prev.filter((item) => item.id !== id));
      },
    });
  }
};


  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Produk Hukum
          </h1>
        </div>

        {/* Header + Search & Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {/* Search & Filter */}
              <div className="flex-1">
                <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
              </div>

              {/* Tombol Tambah */}
              <Link href={route("produk-hukum.create")}>
                <Button className="ml-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4" />
                  Tambah Produk Hukum
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Tabel */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Daftar Produk Hukum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="border px-3 py-2 text-left">ID</th>
                    <th className="border px-3 py-2 text-left">Judul</th>
                    <th className="border px-3 py-2 text-center">Nomor</th>
                    <th className="border px-3 py-2 text-center">Tahun</th>
                    <th className="border px-3 py-2 text-center">Status</th>
                    <th className="border px-3 py-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="border px-3 py-2">{item.id}</td>
                      <td className="border px-3 py-2">{item.judul}</td>
                      <td className="border px-3 py-2 text-center">
                        {item.nomor}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {item.tahun}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {item.status_peraturan?.nama}
                      </td>
                      <td className="border px-3 py-2 flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={() => handlePreview(item)}
                        >
                          <Eye className="w-4 h-4" />
                          Detail
                        </Button>
                        <Button
                          size="sm"
                          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                          onClick={() => setEditItem(item)}
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

       {/* Modal Detail */}
      {selected && (
        <DetailModal data={selected} onClose={() => setSelected(null)} />
      )}

      {/* Modal Edit */}
      {editItem && (
        <EditModal data={editItem} onClose={() => setEditItem(null)} />
      )}
      </div>
    </AdminLayout>
  );
}
