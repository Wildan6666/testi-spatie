import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Menus() {
    const { menus } = usePage().props; // Ambil daftar menu dari backend
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        data_url: "",
        main_menu: "",
        icon: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.menus.store")); // Sesuai route Laravel
    };

    return (
        <AdminLayout>
        <div className="p-6 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Tambah Menu</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama Menu */}
                <div>
                    <label className="block text-sm font-medium">Nama Menu</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* URL */}
                <div>
                    <label className="block text-sm font-medium">URL</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={data.data_url}
                        onChange={(e) => setData("data_url", e.target.value)}
                    />
                    {errors.data_url && <p className="text-red-500 text-sm">{errors.data_url}</p>}
                </div>

                {/* Main Menu (Parent) */}
                <div>
                    <label className="block text-sm font-medium">Main Menu (Optional)</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={data.main_menu}
                        onChange={(e) => setData("main_menu", e.target.value)}
                    >
                        <option value="">-- Tidak Ada (Menu Utama) --</option>
                        {menus.map((menu) => (
                            <option key={menu.id} value={menu.id}>
                                {menu.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Icon */}
                <div>
                    <label className="block text-sm font-medium">Icon</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Contoh: fa fa-home"
                        value={data.icon}
                        onChange={(e) => setData("icon", e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        {processing ? "Menyimpan..." : "Simpan Menu"}
                    </button>
                </div>
            </form>
        </div>
        </AdminLayout>
    );
}
