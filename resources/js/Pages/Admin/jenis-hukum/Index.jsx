// resources/js/Pages/Master/JenisProdukHukum.jsx
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function JenisProdukHukumPage() {
  const { jenis } = usePage().props; // Data dari controller Laravel

  return (
    <AdminLayout>
      <Head title="Jenis Produk Hukum" />
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          {/* Header Card */}
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Daftar Jenis Produk Hukum
            </CardTitle>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4" />
              Tambah
            </Button>
          </CardHeader>

          {/* Isi Tabel */}
          <CardContent>
            <div className="overflow-hidden rounded-md border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Nama</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jenis.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">{item.nama}</td>
                      <td className="p-3 text-center flex justify-center gap-2">
                        <Button
                          size="sm"
                          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
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
      </div>
    </AdminLayout>
  );
}
