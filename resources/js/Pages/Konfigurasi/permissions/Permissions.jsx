import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import UserSelect from "./UserSelect";
import PermissionTable from "./PermissionTable";
import AddPermissionModal from "./AddModal";

export default function PermissionPage({ auth, users, permissions }) {
  const [selectedUser, setSelectedUser] = useState(users[0] || null);
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Toggle permission untuk user
  const togglePermission = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Simpan perubahan ke backend
  const handleSave = () => {
    if (!selectedUser) return;
    Inertia.post(`/admin/users/${selectedUser.id}/permissions`, {
      permissions: selected,
    });
  };

  // Hapus permission dari sistem
  const handleDeletePermission = (id) => {
    Inertia.delete(`/admin/permissions/${id}`);
  };

  // Tambah permission baru
  const handleAddPermission = (name) => {
    Inertia.post(`/admin/permissions`, { name });
    setOpenModal(false);
  };

  return (
    <AdminLayout user={auth.user}>
      <div className="space-y-6">
        {/* Pilih User */}
        <UserSelect
          users={users}
          selectedUser={selectedUser}
          onChange={setSelectedUser}
        />

        {/* Tabel Permission */}
        <PermissionTable
          permissions={permissions}
          selected={selected}
          onToggle={togglePermission}
          onDelete={handleDeletePermission}
        />

        {/* Aksi */}
        <div className="flex justify-between">
          <Button onClick={() => setOpenModal(true)}>Tambah Permission</Button>
          <Button onClick={handleSave} variant="success">
            Simpan
          </Button>
        </div>

        {/* Modal Tambah Permission */}
        <AddPermissionModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAdd={handleAddPermission}
        />
      </div>
    </AdminLayout>
  );
}
