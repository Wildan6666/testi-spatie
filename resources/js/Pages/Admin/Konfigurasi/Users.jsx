import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import SearchBar from "@/Components/ui/SearchBar";

import DataTable from "@/Components/users/DataTable";
import RoleModal from "@/Components/users/modal/RoleModal";
import EditModal from "@/Components/users/modal/EditModal";
import FilterModal from "@/Components/users/modal/FilterModal";
import PermissionModal from "@/Components/users/modal/PermissionModal";

import useModal from "@/Hooks/useModal";
import useUserActions from "@/Hooks/useUserActions";
import useFilter from "@/Hooks/useFilter";

export default function Users({ users, roles, permissions }) {
  const { data, setData, post, put, delete: destroy } = useForm();

  // 🔧 Hooks
  const { search, setSearch, filtered } = useFilter(users, ["name", "email"]);
  const { assignRole, revokeRole, givePermission, updateUser, deleteUser } =
    useUserActions({ setData, post, put, destroy });

  // Tambahan filter global Users
  const [filterRole, setFilterRole] = useState("");
  const [filterPerm, setFilterPerm] = useState("");

  // Gabungkan search + filter role/perm
  const finalUsers = useMemo(() => {
    return filtered.filter((u) => {
      const matchRole = filterRole
        ? u.roles.some((r) => r.name === filterRole)
        : true;
      const matchPerm = filterPerm
        ? u.permissions.some((p) => p.name === filterPerm)
        : true;
      return matchRole && matchPerm;
    });
  }, [filtered, filterRole, filterPerm]);

  // 🗂️ Modal States
  const roleModal = useModal();
  const editModal = useModal();
  const filterModal = useModal(false);
  const permModal = useModal();

  const [editName, setEditName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">👤 User Management</h1>

      {/* 🔎 Search & Filter */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <SearchBar
            placeholder="Cari user, role, atau permission..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3"
          />


        <Button
          onClick={() => filterModal.open(true)}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-4 py-2"
        >
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      {/* 📋 DataTable */}
      <DataTable
        users={finalUsers}
        onEdit={(user) => {
          setEditName(user.name);
          editModal.open(user);
        }}
        onDelete={deleteUser}
        onSetUser={roleModal.open}
        onViewPerms={permModal.open}
      />

      {/* ⚙️ Modals */}
      <RoleModal
        user={roleModal.value}
        roles={roles}
        permissions={permissions}
        setSelectedUser={roleModal.close}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedPermission={selectedPermission}
        setSelectedPermission={setSelectedPermission}
        confirmAssignRole={() =>
          assignRole(roleModal.value?.id, selectedRole)
        }
        confirmGivePermission={() =>
          givePermission(roleModal.value?.id, selectedPermission)
        }
        handleRevokeRole={revokeRole}
      />

      <EditModal
        user={editModal.value}
        editName={editName}
        setEditUser={editModal.close}
        setEditName={setEditName}
        submitEdit={() => updateUser(editModal.value?.id, { name: editName })}
      />

      <FilterModal
        open={filterModal.value}
        setOpen={filterModal.close}
        roles={roles}
        permissions={permissions}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterPerm={filterPerm}
        setFilterPerm={setFilterPerm}
      />

      <PermissionModal user={permModal.value} setUser={permModal.close} />
    </AdminLayout>
  );
}
