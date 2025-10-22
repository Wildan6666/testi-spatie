import { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ActionButton from "@/Components/ui/ActionButton";
import { Plus, Search } from "lucide-react";
import SearchBar from "@/Components/ui/SearchBar";

import PermissionsDataTable from "@/Components/permissions/PermissionsDataTable";
import PermissionsFormModal from "@/Components/permissions/modal/PermissionsFormModal";
import usePermissionActions from "@/Hooks/usePermissionActions";
import useFilter from "@/Hooks/useFilter";   // 🔄 pakai filter global
import useModal from "@/Hooks/useModal";

export default function PermissionsPage({ auth, users, permissions }) {
  const [selectedUser, setSelectedUser] = useState(users[0] || null);
  const [selected, setSelected] = useState([]);

  const modal = useModal(false);
  const [newPermission, setNewPermission] = useState("");

  // 🔎 pakai useFilter global
  const { search, setSearch, filtered } = useFilter(permissions, ["name"]);

  const {
    togglePermission,
    handleSave,
    handleDeletePermission,
    handleAddPermission,
  } = usePermissionActions(users, permissions, selectedUser, setSelected);

  useEffect(() => {
    if (selectedUser) {
      setSelected(
        permissions
          .filter((p) => selectedUser.permissions.includes(p.name))
          .map((p) => p.id)
      );
    }
  }, [selectedUser, permissions]);

  return (
    <AdminLayout user={auth.user}>
      <h1 className="text-2xl font-bold mb-6">Manajemen Hak Akses</h1>

      <Card className="shadow-lg border rounded-2xl">
        <CardHeader>
          <h2 className="text-lg font-semibold">Daftar Hak Akses</h2>
          <p className="text-sm text-gray-500">
            Kelola daftar permissions. Centang untuk mengaktifkan ke user
            tertentu.
          </p>
        </CardHeader>

        <CardContent>
         {/* 🔎 Search & Add Action */}
        <div className="flex items-center justify-between mb-4">
          {/* Search */}
            <SearchBar
              placeholder="Cari permission..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3"
            />

          {/* Action: Tambah Permission */}
          <ActionButton
            icon={Plus}
            tooltip="Tambah Permission"
            onClick={modal.open}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full ml-3"
          />
        </div>

          {/* DataTable */}
          <PermissionsDataTable
            permissions={filtered}
            selected={selected}
            togglePermission={togglePermission}
            handleDelete={handleDeletePermission}
          />

          {/* Tombol Simpan */}
          <div className="mt-6 flex justify-end">
            <Button onClick={() => handleSave(selected)} className="px-6">
              Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal Tambah Permission */}
      <PermissionsFormModal
        modal={modal}
        newPermission={newPermission}
        setNewPermission={setNewPermission}
        handleAdd={() =>
          handleAddPermission(newPermission, () => {
            setNewPermission("");
            modal.close();
          })
        }
      />
    </AdminLayout>
  );
}
