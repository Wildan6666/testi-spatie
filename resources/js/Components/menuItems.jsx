export const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "home",
    roles: ["admin", "editor", "user"], // semua bisa akses
  },
  {
    label: "User Management",
    href: "/users",
    icon: "users",
    roles: ["admin"], // hanya admin
    //permissions: ["view users"],
  },
  {
    label: "Tulisan",
    href: "/tulisan",
    icon: "file-text",
    roles: ["admin", "editor"],
    //permissions: ["view tulisan"],
  },
  {
    label: "Dokumen",
    href: "/dokumen",
    icon: "book",
    roles: ["admin", "editor", "user"],
    //permissions: ["view dokumen"],
  },
  {
    label: "Statistik",
    href: "/statistik",
    icon: "bar-chart",
    roles: ["admin"],
    //permissions: ["view statistics"],
  },
];
