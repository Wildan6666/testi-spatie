import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index() {
    return (
        <AdminLayout>
            <div className="p-6 bg-white rounded shadow">
                <h1 className="text-xl font-semibold">Halaman Validasi dokumen</h1>
                <p className="text-gray-600">Ini halaman default setelah menu "Validasi dokumen" dibuat.</p>
            </div>
        </AdminLayout>
    );
}