import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function UserManagement({ users, roles, permissions }) {
  const { data, setData,post, put, delete: destroy } = useForm();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null); // ✅ role yang dipilih
  const [open, setOpen] = useState(false); // ✅ untuk modal konfirmasi
  const [editUser, setEditUser] = useState(null);
  const [editName, setEditName] = useState("");

  const confirmAssignRole = () => {
  if (selectedUser && selectedRole) {
    setData({
      user_id: selectedUser.id,
      role: selectedRole,
    });

    post(route("admin.users.assignRole"), {
      onSuccess: () => {
        setOpen(false);
        setSelectedRole(null);
        setSelectedUser(null);
      },
    });
  }
};

  const handleEdit = (user) => {
    setEditUser(user);
    setEditName(user.name);
  };

  const submitEdit = () => {
    put(route("admin.users.update", editUser.id), { name: editName });
    setEditUser(null);
  };

  const handleDelete = (userId) => {
    if (confirm("Yakin ingin menghapus user ini?")) {
      destroy(route("admin.users.destroy", userId));
    }
  };

  const handleRevokeRole = (userId, roleName) => {
    setData({
    user_id: userId,
    role: roleName,
  });
    
 post(route("admin.users.revokeRole"), {
  preserveScroll: true,
  onSuccess: () => {
    // Refresh user list via Inertia OR update state manually
    setSelectedUser((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r.name !== roleName),
    }));
  },
});
}


  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <table className="table-auto w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Roles</th>
            <th className="p-2 border">Permissions</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
  {users.map((u) => (
    <tr
      key={u.id}
      className="text-center hover:bg-gray-50 transition-colors"
    >
      {/* Nama User */}
      <td className="p-3 border font-medium text-gray-800">
        {u.name}
      </td>

     <td className="p-3 border">
  <div className="flex flex-col items-center gap-2">
    {/* Roles List */}
    <div className="flex flex-wrap gap-2 justify-center">
      {u.roles.length > 0 ? (
        u.roles.map((r) => (
          <span
            key={r.id}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {r.name}
          </span>
        ))
      ) : (
        <span className="text-gray-500 text-sm">Belum ada role</span>
      )}
  </div>

    {/* Assign Role Button */}
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        setSelectedUser(u);
        setOpen(true); // open modal assign role
      }}
    >
      Atur Role
    </Button>
  </div>
</td>


      {/* Permissions */}
      <td className="p-3 border">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedUser(u)}
            >
              Lihat Permissions
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Permissions untuk{" "}
                <span className="text-indigo-600">{selectedUser?.name}</span>
              </DialogTitle>
            </DialogHeader>

            <div className="mt-3">
              {u.permissions.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {u.permissions.map((p) => (
                    <li key={p.id}>{p.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  Tidak ada permissions
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </td>

      {/* Aksi */}
      <td className="p-3 border space-x-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleEdit(u)}
        >
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleDelete(u.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ))}
</tbody>
</table>

      {/* Modal Konfirmasi Assign Role */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Assign Role</DialogTitle>
          </DialogHeader>
          <p>
            Apakah Anda yakin ingin memberikan role{" "}
            <span className="font-semibold">{selectedRole}</span> untuk user{" "}
            <span className="font-semibold">{selectedUser?.name}</span>?
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button onClick={confirmAssignRole}>Konfirmasi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Kelola Role untuk {selectedUser?.name}</DialogTitle>
    </DialogHeader>
    {/* List Role dengan Tombol Revoke */}
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Role Saat Ini:</h3>
      <div className="flex flex-wrap gap-2">
        {selectedUser?.roles?.length > 0 ? (
          selectedUser.roles.map((r) => (
            <span
              key={r.id}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {r.name}
              <button
                onClick={() => handleRevokeRole(selectedUser.id, r.name)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                ✕
              </button>
            </span>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Belum ada role</p>
        )}
      </div>
    </div>

    {/* Dropdown Assign Role */}
    <div className="space-y-4">
      <select
        className="border w-full rounded px-3 py-2"
        onChange={(e) => setSelectedRole(e.target.value)}
        defaultValue=""
      >
        <option value="">Pilih Role untuk Assign</option>
        {roles.map((r) => (
          <option key={r.id} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>
    </div>

    <DialogFooter className="mt-4">
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Tutup
      </Button>
      <Button onClick={confirmAssignRole}>Assign Role</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      

      {/* Modal Edit */}
      {editUser && (
        <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Nama user"
              />
              <Button onClick={submitEdit}>Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
}
