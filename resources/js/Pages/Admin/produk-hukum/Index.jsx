// resources/js/Pages/Admin/ProdukHukum/Index.jsx
import React, { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import ProdukHukumTable from "./Table/ProdukHukumTable";
import DetailModal from "./Modal/DetailModal";
import FilterModal from "./Modal/FilterModal";

export default function ProdukHukumPage() {
  const { props } = usePage();
  const data = props.produkHukums || [];
  const instansis = props.instansis || [];
  const tipes = props.tipes || [];

  const [selected, setSelected] = useState(null);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            Manajemen Produk Hukum
          </h1>
          <Link href={route("produk-hukum.create")}>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
              <Plus className="w-4 h-4" />
              Tambah Produk Hukum
            </Button>
          </Link>
        </div>

        {/* Table Section */}
        <ProdukHukumTable
          data={data}
          instansis={instansis}
          tipes={tipes}
          onDetail={setSelected}
        />

        {/* Modal Detail */}
        {selected && (
          <DetailModal selected={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </AdminLayout>
  );
}
