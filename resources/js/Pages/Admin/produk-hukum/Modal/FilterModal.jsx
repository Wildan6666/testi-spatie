import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProdukHukumFilterModal({
  instansis,
  tipes,
  tahunOptions,
  selectedFilters,
  setSelectedFilters,
  onClose,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter</h2>

        {/* Status */}
        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Status</span>
          <select
            value={selectedFilters.status}
            onChange={(e) =>
              setSelectedFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            className="mt-1 block w-full border rounded-lg p-2"
          >
            <option value="">Semua</option>
            <option value="Berlaku">Berlaku</option>
            <option value="Tidak Berlaku">Tidak Berlaku</option>
          </select>
        </label>

        {/* Instansi */}
        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Instansi</span>
          <select
            value={selectedFilters.instansi_id}
            onChange={(e) =>
              setSelectedFilters((prev) => ({ ...prev, instansi_id: e.target.value }))
            }
            className="mt-1 block w-full border rounded-lg p-2"
          >
            <option value="">Semua</option>
            {instansis.map((i) => (
              <option key={i.id} value={i.id}>
                {i.nama}
              </option>
            ))}
          </select>
        </label>

        {/* Tahun */}
        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Tahun</span>
          <select
            value={selectedFilters.tahun}
            onChange={(e) =>
              setSelectedFilters((prev) => ({ ...prev, tahun: e.target.value }))
            }
            className="mt-1 block w-full border rounded-lg p-2"
          >
            <option value="">Semua</option>
            {tahunOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        {/* Tipe Dokumen */}
        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Tipe Dokumen</span>
          <select
            value={selectedFilters.tipe}
            onChange={(e) =>
              setSelectedFilters((prev) => ({ ...prev, tipe: e.target.value }))
            }
            className="mt-1 block w-full border rounded-lg p-2"
          >
            <option value="">Semua</option>
            {tipes.map((t) => (
              <option key={t.id} value={t.nama}>
                {t.nama}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            onClick={() =>
              setSelectedFilters({ status: "", instansi_id: "", tahun: "", tipe: "" })
            }
            className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Reset
          </Button>
          <Button
            onClick={onClose}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Terapkan
          </Button>
        </div>
      </div>
    </div>
  );
}
