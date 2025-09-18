import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/Components/Tooltip";
import { Pencil, Trash2, UserCog, Key, Search, Filter } from "lucide-react";

export default function UserManagement({ users, roles, permissions }) {
  const { data, setData, post, put, delete: destroy } = useForm();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [viewPerms, setViewPerms] = useState(null);

  const [search, setSearch] = useState("");
  const [filterModal, setFilterModal] = useState(false);
  const [filterRole, setFilterRole] = useState("");
  const [filterPerm, setFilterPerm] = useState("");

  // 🔎 Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.roles.some((r) =>
          r.name.toLowerCase().includes(search.toLowerCase())
        ) ||
        u.permissions.some((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );

      const matchRole = filterRole
        ? u.roles.some((r) => r.name === filterRole)
        : true;
      const matchPerm = filterPerm
        ? u.permissions.some((p) => p.name === filterPerm)
        : true;

      return matchSearch && matchRole && matchPerm;
    });
  }, [users, search, filterRole, filterPerm]);

  // 🎯 Assign Role
  const confirmAssignRole = () => {
    if (!selectedUser || !selectedRole) return;
    setData({
      user_id: selectedUser.id,
      role: selectedRole,
    });
    post(route("admin.users.assignRole"), {
      onSuccess: () => {
        setSelectedRole("");
      },
    });
  };

  // 🎯 Revoke Role
  const handleRevokeRole = (userId, roleName) => {
    setData({ user_id: userId, role: roleName });
    post(route("admin.users.revokeRole"), { preserveScroll: true });
  };

  // 🎯 Give Permission
  const confirmGivePermission = () => {
    if (!selectedUser || !selectedPermission) return;
    setData({
      user_id: selectedUser.id,
      permission: selectedPermission,
    });
    post(route("admin.users.givePermissionTo"), {
      onSuccess: () => {
        setSelectedPermission("");
      },
    });
  };

  // ✏️ Edit user
  const handleEdit = (user) => {
    setEditUser(user);
    setEditName(user.name);
  };
  const submitEdit = () => {
    put(route("admin.users.update", editUser.id), { name: editName });
    setEditUser(null);
  };

  // 🗑️ Delete
  const handleDelete = (id) => {
    if (confirm("Yakin hapus user ini?")) {
      destroy(route("admin.users.destroy", id));
    }
  };

  // 📊 Table Columns
  const columns = [
    { name: "Nama", selector: (row) => row.name, sortable: true },
    {
      name: "Roles",
      cell: (row) =>
        row.roles.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {row.roles.map((r) => (
              <span
                key={r.id}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
              >
                {r.name}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 text-xs">Belum ada</span>
        ),
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex gap-2 justify-center">
          <Tooltip text="Kelola Role & Permission">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setSelectedUser(row)}
            >
              <UserCog className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip text="Edit">
            <Button
              size="icon"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => handleEdit(row)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip text="Hapus">
            <Button
              size="icon"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => handleDelete(row.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip text="Lihat Permissions">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setViewPerms(row)}
            >
              <Key className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">👤 User Management</h1>

      {/* 🔎 Search & Filter */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari user, role, atau permission..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter icon */}
        <Button
          onClick={() => setFilterModal(true)}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-4 py-2"
        >
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      {/* 📋 DataTable */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        striped
        noDataComponent="😔 Tidak ada user ditemukan"
      />

      {/* ⚙️ Modal Role & Permission */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Kelola Role & Permission untuk {selectedUser.name}
              </DialogTitle>
            </DialogHeader>

            {/* Roles */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Role Saat Ini:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedUser.roles?.map((r) => (
                  <span
                    key={r.id}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    {r.name}
                    <button
                      onClick={() => handleRevokeRole(selectedUser.id, r.name)}
                      className="text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Assign Role */}
            <select
              className="border w-full rounded px-3 py-2 mb-4"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Pilih Role untuk Assign</option>
              {roles.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>

            {/* Assign Permission */}
            <select
              className="border w-full rounded px-3 py-2 mb-4"
              value={selectedPermission}
              onChange={(e) => setSelectedPermission(e.target.value)}
            >
              <option value="">Pilih Permission untuk Assign</option>
              {permissions.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>

            <DialogFooter>
              <Button variant="secondary" onClick={() => setSelectedUser(null)}>
                Tutup
              </Button>
              <Button onClick={confirmAssignRole} disabled={!selectedRole}>
                Assign Role
              </Button>
              <Button
                onClick={confirmGivePermission}
                disabled={!selectedPermission}
              >
                Assign Permission
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ✏️ Modal Edit */}
      {editUser && (
        <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nama user"
            />
            <DialogFooter>
              <Button variant="secondary" onClick={() => setEditUser(null)}>
                Batal
              </Button>
              <Button onClick={submitEdit}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal Filter */}
{filterModal && (
  <Dialog open={filterModal} onOpenChange={setFilterModal}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Filter User</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {/* Role */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Role</span>
          <select
            className="mt-1 block w-full border rounded-lg p-2"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">Semua</option>
            {roles.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </label>

        {/* Permission */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Permission</span>
          <select
            className="mt-1 block w-full border rounded-lg p-2"
            value={filterPerm}
            onChange={(e) => setFilterPerm(e.target.value)}
          >
            <option value="">Semua</option>
            {permissions.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <DialogFooter className="mt-4">
        <Button
          variant="secondary"
          onClick={() => {
            setFilterRole("");
            setFilterPerm("");
            setFilterModal(false);
          }}
        >
          Reset
        </Button>
        <Button onClick={() => setFilterModal(false)}>Terapkan</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}

      {/* 🔑 Modal Lihat Permissions */}
      {viewPerms && (
        <Dialog open={!!viewPerms} onOpenChange={() => setViewPerms(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Permissions untuk {viewPerms.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 mt-3">
              {viewPerms.permissions.length > 0 ? (
                viewPerms.permissions.map((p) => (
                  <span
                    key={p.id}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                  >
                    {p.name}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Tidak ada permissions</p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setViewPerms(null)}>Tutup</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
}
