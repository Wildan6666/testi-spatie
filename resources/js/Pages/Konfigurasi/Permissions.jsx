import { useState, useEffect, Fragment } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Combobox, Transition, Dialog } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";

export default function PermissionPage({ auth, users, permissions }) {
  const [selectedUser, setSelectedUser] = useState(users[0] || null);
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");

  // State untuk modal tambah permission
  const [openModal, setOpenModal] = useState(false);
  const [newPermission, setNewPermission] = useState("");

  // Set permissions awal saat user diganti
  useEffect(() => {
    if (selectedUser) {
      setSelected(
        permissions
          .filter((p) => selectedUser.permissions.includes(p.name))
          .map((p) => p.id)
      );
    }
  }, [selectedUser, permissions]);

  const togglePermission = (permId) => {
    setSelected((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  const handleSave = () => {
    if (!selectedUser) return;

    Inertia.post(`/konfigurasi/permissions/${selectedUser.id}`, {
      permissions: selected.map(
        (permId) => permissions.find((p) => p.id === permId).name
      ),
    });
  };

  const filteredUsers =
    query === ""
      ? users
      : users.filter(
          (u) =>
            u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())
        );

  const handleDeletePermission = (permId) => {
    const perm = permissions.find((p) => p.id === permId);
    if (!perm) return;

    if (!confirm(`Yakin ingin menghapus permission "${perm.name}"?`)) return;

    Inertia.delete(`/konfigurasi/permissions/delete/${permId}`);
  };

  const handleAddPermission = () => {
    if (!newPermission.trim()) return;

    Inertia.post("/konfigurasi/permissions/store", {
      name: newPermission,
    }, {
      onSuccess: () => {
        setNewPermission("");
        setOpenModal(false);
      },
    });
  };

  return (
    <AdminLayout user={auth.user}>
      <h1 className="text-2xl font-bold mb-6">⚙️ Pengaturan Permissions</h1>

      <Card className="shadow-lg border rounded-2xl">
        <CardHeader>
          <h2 className="text-lg font-semibold">Atur Permissions</h2>
          <p className="text-sm text-gray-500">
            Pilih user dan sesuaikan permissions yang diberikan.
          </p>
        </CardHeader>

        <CardContent>
          {/* Combobox User */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Pilih User</label>
            <Combobox value={selectedUser} onChange={setSelectedUser}>
              <div className="relative">
                <Combobox.Input
                  className="border rounded-lg p-2 w-full bg-white shadow-sm focus:ring focus:ring-indigo-300"
                  displayValue={(user) =>
                    user ? `${user.name} (${user.email})` : ""
                  }
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari berdasarkan nama atau email..."
                />
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {filteredUsers.length === 0 && (
                      <div className="cursor-default select-none px-4 py-2 text-gray-500">
                        Tidak ada user
                      </div>
                    )}
                    {filteredUsers.map((user) => (
                      <Combobox.Option
                        key={user.id}
                        value={user}
                        className={({ active }) =>
                          `cursor-pointer select-none px-4 py-2 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <span
                            className={`block ${
                              selected ? "font-bold" : ""
                            }`}
                          >
                            {user.name} ({user.email})
                          </span>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>

          {/* Tombol Tambah Permission */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Daftar Permissions</h3>
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              ➕ Tambah Permission
            </Button>
          </div>

          {/* Daftar Permissions dalam bentuk tabel */}
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border">
                    Permission Name
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 border">
                    Aktif
                  </th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 border">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm, index) => (
                  <tr
                    key={perm.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 border text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border text-sm font-medium text-gray-900">
                      {perm.name}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <Checkbox
                        checked={selected.includes(perm.id)}
                        onCheckedChange={() => togglePermission(perm.id)}
                      />
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePermission(perm.id)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tombol Simpan */}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="px-6">
              Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal Tambah Permission */}
      <Transition appear show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-semibold mb-4">
                  Tambah Permission Baru
                </Dialog.Title>

                <input
                  type="text"
                  value={newPermission}
                  onChange={(e) => setNewPermission(e.target.value)}
                  placeholder="Masukkan nama permission"
                  className="w-full border rounded-lg p-2 mb-4 focus:ring focus:ring-indigo-300"
                />

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setOpenModal(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleAddPermission}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Simpan
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </AdminLayout>
  );
}
