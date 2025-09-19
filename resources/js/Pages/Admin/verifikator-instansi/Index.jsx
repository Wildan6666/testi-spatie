import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "react-data-table-component";
import { Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifikatorInstansiIndex() {
  const { props } = usePage();
  const data = props.data || [];
  const users = props.users || [];
  const instansis = props.instansis || [];
  const verifikatorRoleId = props.verifikatorRoleId; // otomatis id role verifikator

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    user_id: "",
    instansi_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(
      route("verifikator-instansi.store"),
      {
        ...form,
        role_id: verifikatorRoleId, // kirim role_id = verifikator
      },
      {
        onSuccess: () => {
          setForm({ user_id: "", instansi_id: "" });
          setShowModal(false);
        },
      }
    );
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus verifikator ini?")) {
      router.delete(route("verifikator-instansi.destroy", id));
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },
    {
      name: "User",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Instansi",
      selector: (row) => row.instansi,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
        >
          <Trash2 size={18} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 bg-white rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">👤 Verifikator Instansi</h1>
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus size={16} /> Tambah
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
          noDataComponent="😔 Belum ada data verifikator instansi"
        />

        {/* Modal Tambah */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
              <h2 className="text-lg font-semibold mb-4">
                Tambah Verifikator Instansi
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Pilih User */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User (Role: Verifikator)
                  </label>
                  <select
                    value={form.user_id}
                    onChange={(e) =>
                      setForm({ ...form, user_id: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    <option value="">-- Pilih User --</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pilih Instansi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instansi
                  </label>
                  <select
                    value={form.instansi_id}
                    onChange={(e) =>
                      setForm({ ...form, instansi_id: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                    required
                  >
                    <option value="">-- Pilih Instansi --</option>
                    {instansis.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tombol */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
