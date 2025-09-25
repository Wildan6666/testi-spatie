import { Search as SearchIcon } from "lucide-react";

export default function SearchBar({ placeholder = "Cari...", value, onChange, className = "" }) {
  return (
    <div className={`relative w-full ${className}`}>
      <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 bg-white text-sm
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
