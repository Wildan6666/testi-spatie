import React, { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import ProdukHukumTable from "./Table/ProdukHukumTable";
import DetailModal from "./Modal/DetailModal";
import EditModal from "./Modal/EditModal"; // ✅ sudah benar
import FilterModal from "./Modal/FilterModal";

export default function ProdukHukumPage() {
  const { props } = usePage();
  const data = props.produkHukums || [];
  const instansis = props.instansis || [];
  const tipes = props.tipes || [];

  // State modal
  const [selected, setSelected] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  // Saat klik edit
  const handleEdit = (row) => {
    setSelected(row);
    setOpenEdit(true);
  };

  // Saat klik detail
  const handleDetail = (row) => {
    setSelected(row);
    setOpenDetail(true);
  };

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
          onDetail={handleDetail}
          onEdit={handleEdit} // ✅ tambahkan handler edit
        />

        {/* Modal Detail */}
        {openDetail && selected && (
          <DetailModal
            selected={selected}
            onClose={() => setOpenDetail(false)}
          />
        )}

        {/* Modal Edit */}
        {openEdit && selected && (
          <EditModal
            isOpen={openEdit}
            onClose={() => setOpenEdit(false)}
            produk={selected}
            instansis={instansis}
            tipes={tipes}
          />
        )}
      </div>
    </AdminLayout>
  );
}
