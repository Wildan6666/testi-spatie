import { Filter, Search, RotateCcw } from "lucide-react";

export default function SidebarFilter({
  searchTerm,
  setSearchTerm,
  filters,
  handleFilterChange,
  handleSearch,
  resetFilters,
  setCurrentPage,
  jenisOptions = [],
  tipeOptions = [],
}) {
  return (
    <aside className="w-80 space-y-4" data-aos="fade-left">
      <div className="bg-white rounded-xl p-6 shadow-md border relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 rounded-t-xl"></div>
        <h3 className="font-semibold text-lg text-gray-800 mb-6 flex items-center gap-2">
          <Filter size={20} className="text-orange-500" /> Cari Peraturan
        </h3>

        {/* Search */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-semibold text-gray-700">Kata Kunci :</label>
          <input
            type="text"
            placeholder="Contoh : Keputusan Rektor"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (setCurrentPage) setCurrentPage(1);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm shadow-sm"
          />
        </div>

        {/* Jenis Dokumen */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-semibold text-gray-700">Jenis Dokumen :</label>
          <select
            value={filters.jenis}
            onChange={(e) => handleFilterChange("jenis", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm text-gray-600"
          >
            <option value="">Pilih Jenis Dokumen</option>
            {jenisOptions.map((jenis) => (
              <option key={jenis.id} value={jenis.nama}>
                {jenis.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Tipe Dokumen */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-semibold text-gray-700">Tipe Dokumen :</label>
          <select
            value={filters.tipe}
            onChange={(e) => handleFilterChange("tipe", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm text-gray-600"
          >
            <option value="">Pilih Tipe Dokumen</option>
            {tipeOptions.map((tipe) => (
              <option key={tipe.id} value={tipe.nama}>
                {tipe.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Tahun */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-semibold text-gray-700">Tahun :</label>
          <input
            type="number"
            placeholder="Tahun"
            value={filters.tahun}
            onChange={(e) => handleFilterChange("tahun", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm shadow-sm"
            min="2000"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Nomor */}
        <div className="space-y-2 mb-6">
          <label className="text-sm font-semibold text-gray-700">Nomor :</label>
          <input
            type="text"
            placeholder="Nomor dokumen"
            value={filters.nomor}
            onChange={(e) => handleFilterChange("nomor", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm shadow-sm"
          />
        </div>

        {/* Tombol Manual */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Search size={18} /> Cari
          </button>

          <button
            type="button"
            onClick={resetFilters}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} /> Reset Filter
          </button>
        </div>
      </div>
    </aside>
  );
}
