import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AddPermissionModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "") return;
    onAdd(name);
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Permission</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Nama permission"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit}>Tambah</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
