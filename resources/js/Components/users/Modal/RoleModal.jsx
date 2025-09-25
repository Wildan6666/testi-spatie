// Components/Account/modal/RoleModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function RoleModal({
  user,
  roles,
  permissions,
  setSelectedUser,
  selectedRole,
  setSelectedRole,
  selectedPermission,
  setSelectedPermission,
  confirmAssignRole,
  confirmGivePermission,
  handleRevokeRole,
}) {
  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={() => setSelectedUser(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kelola Role & Permission untuk {user.name}</DialogTitle>
        </DialogHeader>

        {/* Roles */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Role Saat Ini:</h3>
          <div className="flex flex-wrap gap-2">
            {user.roles?.map((r) => (
              <span
                key={r.id}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
              >
                {r.name}
                <button
                  onClick={() => handleRevokeRole(user.id, r.name)}
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
          <Button onClick={confirmGivePermission} disabled={!selectedPermission}>
            Assign Permission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
