import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchFilter({ onSearch, onFilter }) {
  const [query, setQuery] = useState("");
  const [tahun, setTahun] = useState("");
  const [tipe, setTipe] = useState("");

  const handleSearch = () => {
    onSearch(query);
    onFilter({ tahun, tipe });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      {/* Search */}
      <Input
        type="text"
        placeholder="Cari judul / kata kunci..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64"
      />

      {/* Filter Tahun
      <Input
        type="number"
        placeholder="Tahun"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
        className="w-32"
      /> */}

      {/* Filter Tipe Dokumen
      <select
        value={tipe}
        onChange={(e) => setTipe(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm"
      >
        <option value="">Semua Tipe</option>
        <option value="Peraturan">Peraturan</option>
        <option value="Keputusan">Keputusan</option>
        <option value="Surat Edaran">Surat Edaran</option>
      </select> */}

      <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white">
        Cari
      </Button>
    </div>
  );
}
