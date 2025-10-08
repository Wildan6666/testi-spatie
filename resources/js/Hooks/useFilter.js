import { useState, useMemo } from "react";

/**
 * Generic hook untuk filter data berdasarkan search string
 * @param {Array} data - data array of object
 * @param {Array} fields - nama field yang akan dicari
 */
export default function useFilter(data, fields = []) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return data.filter((item) =>
      fields.some((field) =>
        String(item[field] ?? "").toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search, fields]);

  return { search, setSearch, filtered };
}