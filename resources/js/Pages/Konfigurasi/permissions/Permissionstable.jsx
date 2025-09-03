import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function PermissionTable({ permissions, selected, onToggle, onDelete }) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Permission</th>
            <th className="px-4 py-2 text-center">Aktif</th>
            <th className="px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((perm, index) => (
            <tr key={perm.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{perm.name}</td>
              <td className="px-4 py-2 border text-center">
                <Checkbox
                  checked={selected.includes(perm.id)}
                  onCheckedChange={() => onToggle(perm.id)}
                />
              </td>
              <td className="px-4 py-2 border text-center">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(perm.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
