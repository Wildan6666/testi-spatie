import DataTableWrapper from "@/Components/ui/DataTableWrapper";
import ActionButton from "@/Components/ui/ActionButton";
import { Trash2, CheckSquare, Square } from "lucide-react";

export default function PermissionsDataTable({ permissions, selected, togglePermission, handleDelete }) {
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Permission Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Aktif",
      cell: (row) => (
        <ActionButton
          icon={selected.includes(row.id) ? CheckSquare : Square}
          tooltip={selected.includes(row.id) ? "Nonaktifkan" : "Aktifkan"}
          onClick={() => togglePermission(row.id)}
          className={selected.includes(row.id) ? "text-green-600" : "text-gray-500"}
        />
      ),
      center: true,
      width: "100px",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <ActionButton
          icon={Trash2}
          tooltip="Hapus Permission"
          onClick={() => handleDelete(row.id)}
          className="bg-red-600 hover:bg-red-700 text-white"
        />
      ),
      center: true,
    },
  ];

  return (
    <DataTableWrapper
      columns={columns}
      data={permissions}
      noDataMessage="😔 Tidak ada permission ditemukan"
    />
  );
}
