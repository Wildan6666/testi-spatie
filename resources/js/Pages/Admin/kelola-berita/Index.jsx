import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { router } from "@inertiajs/react";
import BeritaDataTable from "@/Components/berita/BeritaDataTable";

export default function BeritaIndex({ berita }) {
  const handleDelete = (id) => {
    if (confirm("Yakin hapus berita ini?")) {
      router.delete(route("kelola-berita.destroy", id), {
        preserveScroll: true,
        onSuccess: () => console.log("✅ Dihapus"),
        onError: (e) => console.error(e),
      });
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">📰 Manajemen Berita</h1>

      <div className="flex justify-end mb-4">
        <Button
          onClick={() => router.get(route("kelola-berita.create"))}
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Berita
        </Button>
      </div>

      <BeritaDataTable
        data={berita}
        onEdit={(row) => router.get(route("kelola-berita.edit", row.id))}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}
