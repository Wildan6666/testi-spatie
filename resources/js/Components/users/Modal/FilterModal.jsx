// Components/Account/modal/FilterModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/Dialog";
import { Button } from "@/components/ui/button";

export default function FilterModal({
  open,
  setOpen,
  roles,
  permissions,
  filterRole,
  setFilterRole,
  filterPerm,
  setFilterPerm,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              setOpen(false);
            }}
          >
            Reset
          </Button>
          <Button onClick={() => setOpen(false)}>Terapkan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
