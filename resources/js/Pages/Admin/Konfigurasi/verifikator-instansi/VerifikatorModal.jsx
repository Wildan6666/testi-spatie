// File: VerifikatorInstansi/VerifikatorModal.jsx
import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifikatorModal({ users, instansis, roleId, onClose, editData }) {
  const [form, setForm] = useState({ user_id: "", instansi_id: "" });

  // Kalau edit, isi form dengan data lama
  useEffect(() => {
    if (editData) {
      setForm({
        user_id: editData.user_id || "",
        instansi_id: editData.instansi_id || "",
      });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      // UPDATE
      router.put(
        route("verifikator-instansi.update", editData.id),
        { ...form, role_id: roleId },
        {
          onSuccess: onClose,
        }
      );
    } else {
      // CREATE
      router.post(
        route("verifikator-instansi.store"),
        { ...form, role_id: roleId },
        {
          onSuccess: () => {
            setForm({ user_id: "", instansi_id: "" });
            onClose();
          },
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {editData ? "Edit Verifikator Instansi" : "Tambah Verifikator Instansi"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pilih User */}
          <SelectInput
            label="User (Role: Verifikator)"
            value={form.user_id}
            onChange={(e) => setForm({ ...form, user_id: e.target.value })}
            options={users.map((u) => ({ value: u.id, label: u.name }))}
          />

          {/* Pilih Instansi */}
          <SelectInput
            label="Instansi"
            value={form.instansi_id}
            onChange={(e) => setForm({ ...form, instansi_id: e.target.value })}
            options={instansis.map((i) => ({ value: i.id, label: i.nama }))}
          />

          {/* Tombol */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {editData ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SelectInput({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-2"
        required
      >
        <option value="">-- Pilih --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
