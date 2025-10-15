// Components/Account/modal/PermissionModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/Dialog";
import { Button } from "@/components/ui/button";

export default function PermissionModal({ user, setUser }) {
  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={() => setUser(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Permissions untuk {user.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 mt-3">
          {user.permissions.length > 0 ? (
            user.permissions.map((p) => (
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
          <Button onClick={() => setUser(null)}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
