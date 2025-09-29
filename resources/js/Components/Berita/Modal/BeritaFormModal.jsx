// File: resources/js/Pages/Berita/BeritaFormModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function BeritaFormModal({ modal, formData, setFormData, handleSubmit }) {
  return (
    <Dialog open={!!modal.value} onOpenChange={modal.close}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {formData?.id ? "Edit Berita" : "Tambah Berita"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Judul */}
          <Input
            type="text"
            placeholder="Judul berita"
            value={formData?.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {/* Isi Berita pakai React Quill */}
          <ReactQuill
            theme="snow"
            value={formData?.content || ""}
            onChange={(value) => setFormData({ ...formData, content: value })}
            className="bg-white rounded-md"
          />

          {/* Upload Gambar */}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />

          {/* Tanggal Publish */}
          <Input
            type="date"
            value={formData?.published_at || ""}
            onChange={(e) =>
              setFormData({ ...formData, published_at: e.target.value })
            }
          />

          {/* Status */}
          <select
            value={formData?.status || "draft"}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full border rounded p-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={modal.close}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
