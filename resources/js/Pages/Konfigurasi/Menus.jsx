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
import * as Icons from "lucide-react";

export default function Menus() {
  const { menus } = usePage().props;
  const [search, setSearch] = useState("");

  // state untuk tambah/edit
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const availableIcons = [ "Home",
  "Folder",
  "Archive",
  "FileText",
  "ScrollText",
  "Scale",
  "Search",
  "Newspaper",
  "Calendar",
  "BarChart",
  "Info",
  "Phone",
  "User",
  "Settings",
  "Tag",
  "Star",
  "Globe",
  "Download",];

const filteredMenus = menus.filter(menu =>
  menu.name.toLowerCase().includes(search.toLowerCase()) ||
  (menu.url && menu.url.toLowerCase().includes(search.toLowerCase()))
);

  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: "",
    url: "",
    parent_id: "",
    icon: "",
  });

  // buka modal tambah
  const openAddModal = () => {
    reset();
    setIsEdit(false);
    setEditId(null);
    setOpen(true);
  };

  // buka modal edit
  const openEditModal = (menu) => {
    setData({
      name: menu.name || "",
      url: menu.url || "",
      parent_id: menu.parent_id || "",
      icon: menu.icon || "",
    });
    setIsEdit(true);
    setEditId(menu.id);
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // update data
      router.put(route("admin.menus.update", editId), data, {
        onSuccess: () => {
          reset();
          setOpen(false);
          setIsEdit(false);
        },
      });
    } else {
      // tambah data baru
      post(route("admin.menus.store"), {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      });
    }
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus menu ini?")) {
      router.delete(route("admin.menus.destroy", id), {
        onSuccess: () => {
          console.log("Menu berhasil dihapus");
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    }
  };
  

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Manajemen Menu</h2>
    

          {/* Tombol Tambah Menu */}
          <Button onClick={openAddModal}>Tambah Menu</Button>
        </div>

        {/* Modal Tambah/Edit Menu */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edit Menu" : "Tambah Menu"}
              </DialogTitle>
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
              <select
                className="w-full border rounded px-3 py-2"
                value={data.icon}
                onChange={(e) => setData("icon", e.target.value)}
              >
                  <option value="">Pilih Icon</option>
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>

                {/* // Render icon */}
                {data.icon && (
                  <div className="mt-2 flex items-center gap-2">
                    {React.createElement(Icons[data.icon], { size: 20 })}
                    <span className="text-sm">{data.icon}</span>
                  </div>
                )}

              <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                  {processing
                    ? "Menyimpan..."
                    : isEdit
                    ? "Update Menu"
                    : "Simpan Menu"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

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
                  <tr className="bg-white">
                    <td className="border p-2 font-semibold">{menu.name}</td>
                    <td className="border p-2">{menu.url}</td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">{menu.icon}</td>
                    <td className="border p-2 text-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(menu)}
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
                      <tr key={child.id} className="bg-gray-50">
                        <td className="border p-2 pl-8">↳ {child.name}</td>
                        <td className="border p-2">{child.url}</td>
                        <td className="border p-2">{menu.name}</td>
                        <td className="border p-2">{child.icon}</td>
                        <td className="border p-2 text-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(child)}
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
