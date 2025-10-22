import DataTableWrapper from "@/Components/ui/DataTableWrapper";
import ActionButton from "@/Components/ui/ActionButton";
import { Pencil, Trash2, UserCog, Key } from "lucide-react";

export default function UserDataTable({ users, onEdit, onDelete, onSetUser, onViewPerms }) {
  const columns = [
  { name: "Nama", selector: (row) => row.name, sortable: true },
  {
    name: "Roles",
    cell: (row) =>
      row.roles.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {row.roles.map((r) => (
            <span key={r.id} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              {r.name}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-gray-400 text-xs">Belum ada</span>
      ),
  },

  // Tambahan kolom detail
  {
    name: "NIP / NIM",
    selector: (row) => row.detail?.nip || row.detail?.nim || "-",
    sortable: true,
  },
  {
    name: "Instansi / Fakultas",
    selector: (row) => row.detail?.instansi || row.detail?.fakultas || "-",
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.detail?.status_aktif || "-",
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.detail?.status_aktif === "aktif"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        {row.detail?.status_aktif ?? "-"}
      </span>
    ),
  },

  // Kolom aksi (sudah ada)
  {
    name: "Aksi",
    cell: (row) => (
      <div className="flex gap-2 justify-center">
        <ActionButton icon={UserCog} tooltip="Kelola Role & Permission" onClick={() => onSetUser(row)} />
        <ActionButton icon={Pencil} tooltip="Edit" onClick={() => onEdit(row)} className="bg-yellow-500 hover:bg-yellow-600 text-white" />
        <ActionButton icon={Trash2} tooltip="Hapus" onClick={() => onDelete(row.id)} className="bg-red-600 hover:bg-red-700 text-white" />
        <ActionButton icon={Key} tooltip="Lihat Permissions" onClick={() => onViewPerms(row)} />
      </div>
    ),
  },
];

  return <DataTableWrapper columns={columns} data={users} noDataMessage="Tidak ada user ditemukan" />;
}