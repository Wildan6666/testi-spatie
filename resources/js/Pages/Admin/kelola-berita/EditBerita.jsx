import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";

export default function EditBerita({ berita }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: "PUT",
    title: berita.title || "",
    content: berita.content || "",
    published_at: berita.published_at || "",
    status: berita.status || "draft",
    image: null,
  });

  const [preview, setPreview] = useState(
    berita.image ? `/storage/${berita.image}` : null
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("kelola-berita.update", berita.id));
  };

  return (
    <AdminLayout title="Edit Berita">
      <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              href={route("kelola-berita.index")}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={18} className="mr-1" />
              Kembali
            </Link>
            <h1 className="text-xl font-bold text-gray-800">
              ✏️ Edit Berita
            </h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Judul */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Judul Berita
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan judul berita"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Konten */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Konten Berita
            </label>
            <textarea
              value={data.content}
              onChange={(e) => setData("content", e.target.value)}
              className="w-full border rounded-lg p-3 h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tulis isi berita..."
            ></textarea>
            {errors.content && (
              <p className="text-sm text-red-600 mt-1">{errors.content}</p>
            )}
          </div>

          {/* Gambar */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Gambar Berita
            </label>
            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-md rounded-lg shadow-sm"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Upload size={18} />
                <span>Ganti Gambar</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {data.image && (
                <span className="text-sm text-gray-600">
                  {data.image.name || "File terpilih"}
                </span>
              )}
            </div>
            {errors.image && (
              <p className="text-sm text-red-600 mt-1">{errors.image}</p>
            )}
          </div>

          {/* Tanggal Publikasi */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Tanggal Publikasi
            </label>
            <input
              type="date"
              value={data.published_at || ""}
              onChange={(e) => setData("published_at", e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.published_at && (
              <p className="text-sm text-red-600 mt-1">
                {errors.published_at}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={data.status}
              onChange={(e) => setData("status", e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-600 mt-1">{errors.status}</p>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 mt-6">
            <Link
              href={route("kelola-berita.index")}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Batal
            </Link>
            <Button
              type="submit"
              disabled={processing}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              {processing ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}