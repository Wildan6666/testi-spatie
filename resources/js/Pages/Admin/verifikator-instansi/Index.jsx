import { usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";

export default function VerifikatorInstansiIndex() {
  const { props } = usePage();
  const data = props.data || [];
  const users = props.users || [];
  const instansis = props.instansis || [];
  const roles = props.roles || [];

  const [form, setForm] = useState({
    user_id: "",
    instansi_id: "",
    role_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("verifikator-instansi.store"), form);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manajemen Verifikator Instansi</h1>

      {/* Form tambah */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded-lg mb-6 flex gap-4 flex-wrap"
      >
        <select
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Pilih User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <select
          value={form.instansi_id}
          onChange={(e) => setForm({ ...form, instansi_id: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Pilih Instansi</option>
          {instansis.map((i) => (
            <option key={i.id} value={i.id}>
              {i.nama}
            </option>
          ))}
        </select>

        <select
          value={form.role_id}
          onChange={(e) => setForm({ ...form, role_id: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Pilih Role</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>

      {/* Tabel daftar */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">User</th>
            <th className="p-2">Instansi</th>
            <th className="p-2">Role</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="p-2">{row.user}</td>
              <td className="p-2">{row.instansi}</td>
              <td className="p-2">{row.role}</td>
              <td className="p-2">
                <button
                  onClick={() =>
                    router.delete(route("verifikator-instansi.destroy", row.id))
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
