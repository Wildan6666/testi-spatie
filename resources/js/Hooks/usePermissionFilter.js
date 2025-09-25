import { useState, useMemo } from "react";

export default function usePermissionFilter(permissions) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return permissions.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [permissions, search]);

  return { filtered, search, setSearch };
}
