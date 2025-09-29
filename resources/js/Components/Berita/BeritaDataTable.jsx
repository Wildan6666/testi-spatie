import DataTableWrapper from "@/Components/ui/DataTableWrapper";
import ActionButton from "@/Components/ui/ActionButton";
import { Pencil, Trash2 } from "lucide-react";

export default function BeritaDataTable({ data, onEdit, onDelete }) {
  const columns = [
    { name: "Judul", selector: (row) => row.title, sortable: true },
    { name: "Tanggal", selector: (row) => row.published_at, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex gap-2">
          <ActionButton
            icon={Pencil}
            tooltip="Edit Berita"
            onClick={() => onEdit(row)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          />
          <ActionButton
            icon={Trash2}
            tooltip="Hapus Berita"
            onClick={() => onDelete(row.id)}
            className="bg-red-600 hover:bg-red-700 text-white"
          />
        </div>
      ),
    },
  ];

  return (
    <DataTableWrapper
      columns={columns}
      data={data}
      noDataMessage="😔 Belum ada berita"
    />
  );
}
