// Components/Account/modal/EditModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditModal({ user, editName, setEditUser, setEditName, submitEdit }) {
  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={() => setEditUser(null)}>
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
  );
}
