import React, { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Menus() {
  const { menus } = usePage().props;
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    url: "",
    parent_id: "",
    icon: "",
  });

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.menus.store"), {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus menu ini?")) {
      router.delete(route("admin.menus.destroy", id));
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Manajemen Menu</h2>

          {/* Tombol Tambah Menu */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Tambah Menu</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Tambah Menu</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* Nama Menu */}
                <div>
                  <label className="block text-sm font-medium">Nama Menu</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* URL */}
                <div>
                  <label className="block text-sm font-medium">URL</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={data.url}
                    onChange={(e) => setData("url", e.target.value)}
                  />
                  {errors.url && (
                    <p className="text-red-500 text-sm">{errors.url}</p>
                  )}
                </div>

                {/* Parent */}
                <div>
                  <label className="block text-sm font-medium">
                    Main Menu (Optional)
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={data.parent_id}
                    onChange={(e) =>
                      setData(
                        "parent_id",
                        e.target.value ? parseInt(e.target.value) : ""
                      )
                    }
                  >
                    <option value="">-- Tidak Ada (Menu Utama) --</option>
                    {menus.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium">Icon</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Contoh: fa fa-home"
                    value={data.icon}
                    onChange={(e) => setData("icon", e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={processing}>
                    {processing ? "Menyimpan..." : "Simpan Menu"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabel Daftar Menu */}
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Nama</th>
              <th className="border p-2">URL</th>
              <th className="border p-2">Parent</th>
              <th className="border p-2">Icon</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menus.length > 0 ? (
              menus.map((menu) => (
                <React.Fragment key={menu.id}>
                  {/* Row Menu Utama */}
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-semibold">{menu.name}</td>
                    <td className="border p-2">{menu.url}</td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">{menu.icon}</td>
                    <td className="border p-2 text-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.get(route("admin.menus.edit", menu.id))
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(menu.id)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>

                  {/* Row Sub Menu */}
                  {menu.children &&
                    menu.children.map((child) => (
                      <tr key={child.id} className="bg-white">
                        <td className="border p-2 pl-8">↳ {child.name}</td>
                        <td className="border p-2">{child.url}</td>
                        <td className="border p-2">{menu.name}</td>
                        <td className="border p-2">{child.icon}</td>
                        <td className="border p-2 text-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              router.get(route("admin.menus.edit", child.id))
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(child.id)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 border"
                >
                  Belum ada menu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
