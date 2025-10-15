import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/Dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PermissionsFormModal({ modal, newPermission, setNewPermission, handleAdd }) {
  return (
    <Dialog open={!!modal.value} onOpenChange={modal.close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Permission Baru</DialogTitle>
        </DialogHeader>

        <Input
          type="text"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          placeholder="Masukkan nama permission"
        />

        <DialogFooter>
          <Button variant="outline" onClick={modal.close}>
            Batal
          </Button>
          <Button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
