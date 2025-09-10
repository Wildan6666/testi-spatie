import AdminLayout from "@/Layouts/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function InstansiPage() {
  const { instansi } = usePage().props;

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Daftar Instansi Penerbit
            </CardTitle>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4" />
              Tambah
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Nama Instansi</th>
                    <th className="p-3 text-left">Singkatan</th>
                    <th className="p-3 text-left">Alamat</th>
                    <th className="p-3 text-left">Kontak</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {instansi.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">{item.nama}</td>
                      <td className="p-3">{item.singkatan}</td>
                      <td className="p-3">{item.alamat}</td>
                      <td className="p-3">{item.kontak}</td>
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
