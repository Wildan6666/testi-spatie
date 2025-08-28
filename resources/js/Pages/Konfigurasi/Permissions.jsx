import { useState, useEffect, Fragment } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Combobox, Transition } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";

export default function PermissionPage({ auth, users, permissions }) {
  const [selectedUser, setSelectedUser] = useState(users[0] || null);
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");

  // Set permissions awal saat user diganti
  useEffect(() => {
    if (selectedUser) {
      setSelected(
        permissions
          .filter((p) => selectedUser.permissions.includes(p.name))
          .map((p) => p.id)
      );
    }
  }, [selectedUser,permissions]);

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

  Inertia.delete(`/konfigurasi/permissions/delete/${permId}`, {
    onSuccess: () => {
      // optional: refresh page atau filter state biar ilang dari UI
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
                            active ? "bg-indigo-600 text-white" : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <span className={`block ${selected ? "font-bold" : ""}`}>
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

        {/* Daftar Permissions */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-xl bg-gray-50">
            {permissions.map((perm) => (
              <div
                key={perm.id}
                className="flex items-center justify-between px-2 py-1 rounded-md bg-white shadow-sm hover:shadow-md transition"
              >
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={selected.includes(perm.id)}
                    onCheckedChange={() => togglePermission(perm.id)}
                  />
                  <span className="text-sm font-medium">{perm.name}</span>
                </label>

                {/* Tombol hapus permission */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeletePermission(perm.id)}
                >
                  Hapus
                </Button>
              </div>
            ))}
          </div>

          {/* Tombol Simpan */}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="px-6">
              Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
