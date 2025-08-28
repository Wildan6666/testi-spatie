// resources/js/Pages/Konfigurasi/Roles.jsx
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function RolesPage({ roles }) {
  const { data, setData, post, reset, delete: destroy } = useForm({ name: "" });
  const [loading, setLoading] = useState(false);

  // Tambah role
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    post(route("roles.store"), {
      onSuccess: () => {
        reset();
        setLoading(false);
      },
      onError: () => setLoading(false),
    });
  };

  // Hapus role
  const handleDelete = (id, name) => {
    if (confirm(`Yakin ingin menghapus role "${name}"?`)) {
      destroy(route("roles.destroy", id));
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Judul Halaman */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Manajemen Role</h1>
          <p className="text-gray-600">
            Tambah, lihat, dan hapus role pengguna di sistem.
          </p>
        </div>

        {/* Form Tambah Role */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Tambah Role Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Role
                </label>
                <Input
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="Contoh: Admin"
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Menyimpan..." : "Tambah Role"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Daftar Roles */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Daftar Role</CardTitle>
          </CardHeader>
          <CardContent>
            {roles.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {roles.map((role) => (
                  <li
                    key={role.id}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="text-gray-800 font-medium">{role.name}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(role.id, role.name)}
                    >
                      Hapus
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Belum ada role.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
