// File: resources/js/Pages/Berita/BeritaCreate.jsx
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function BeritaCreate() {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    content: "",
    image: null,
    published_at: "",
    status: "draft",
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("berita.store"));
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-6">Tambah Berita Baru</h1>

        {/* Toggle antara Form & Preview */}
        <div className="flex gap-3 mb-4">
          <Button
            variant={!previewMode ? "default" : "outline"}
            onClick={() => setPreviewMode(false)}
          >
            Form Input
          </Button>
          <Button
            variant={previewMode ? "default" : "outline"}
            onClick={() => setPreviewMode(true)}
          >
            Preview
          </Button>
        </div>

        {!previewMode ? (
          // ================= FORM INPUT =================
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Judul */}
            <div>
              <label className="block font-medium">Judul Berita</label>
              <Input
                type="text"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            {/* Isi */}
            <div>
              <label className="block font-medium">Isi Berita</label>
              <ReactQuill
                theme="snow"
                value={data.content}
                onChange={(val) => setData("content", val)}
                className="bg-white"
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content}</p>
              )}
            </div>

            {/* Gambar */}
            <div>
              <label className="block font-medium">Gambar</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setData("image", e.target.files[0])}
              />
            </div>

            {/* Tanggal */}
            <div>
              <label className="block font-medium">Tanggal Publikasi</label>
              <Input
                type="date"
                value={data.published_at}
                onChange={(e) => setData("published_at", e.target.value)}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium">Status</label>
              <select
                value={data.status}
                onChange={(e) => setData("status", e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="submit" disabled={processing}>
                Simpan
              </Button>
            </div>
          </form>
        ) : (
          // ================= PREVIEW =================
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-xl font-bold mb-2">
              {data.title || "Judul belum diisi"}
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: data.content || "<p>Isi berita masih kosong...</p>",
              }}
            />
            {data.published_at && (
              <p className="mt-3 text-sm text-gray-500">
                Dijadwalkan terbit: {data.published_at}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Status: {data.status}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}