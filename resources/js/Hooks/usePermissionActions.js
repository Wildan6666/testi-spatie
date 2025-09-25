import { Inertia } from "@inertiajs/inertia";

export default function usePermissionActions(users, permissions, selectedUser, setSelected) {
  const togglePermission = (permId) => {
    setSelected((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  const handleSave = (selected) => {
    if (!selectedUser) return;
    Inertia.post(`/konfigurasi/permissions/${selectedUser.id}`, {
      permissions: selected.map(
        (permId) => permissions.find((p) => p.id === permId).name
      ),
    });
  };

  const handleDeletePermission = (permId) => {
    const perm = permissions.find((p) => p.id === permId);
    if (!perm) return;

    if (confirm(`Yakin ingin menghapus permission "${perm.name}"?`)) {
      Inertia.delete(`/konfigurasi/permissions/delete/${permId}`);
    }
  };

  const handleAddPermission = (newPermission, reset) => {
    if (!newPermission.trim()) return;
    Inertia.post("/konfigurasi/permissions/store", { name: newPermission }, {
      onSuccess: reset,
    });
  };

  return { togglePermission, handleSave, handleDeletePermission, handleAddPermission };
}
