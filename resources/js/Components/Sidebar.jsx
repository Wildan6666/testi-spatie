import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import * as Icons from "lucide-react";

export default function Sidebar() {
  const { url, props } = usePage();
  const menus = (props.menus || []).slice().sort((a, b) => a.id - b.id); // urutkan by id
  const [openMenu, setOpenMenu] = useState(null);

  const getIcon = (iconName) => {
    if (!iconName) return <Icons.Menu size={18} />;

    // Ubah lowercase/slug jadi PascalCase
    const formatted = iconName
      .split("-") // misal "arrow-left" jadi "ArrowLeft"
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");

    const Icon = Icons[formatted] || Icons.Menu;
    return <Icon size={18} />;
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-50 to-white border-r shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-5 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
          Admin JDIH
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 text-gray-700">
        {menus.map((menu) => (
          <div key={menu.id}>
            {/* Menu tanpa anak */}
            {menu.children.length === 0 ? (
              <Link
                href={`/${menu.url}`}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${
                  url.startsWith(`/${menu.url}`)
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-blue-50"
                }`}
              >
                {getIcon(menu.icon)}
                <span className="text-sm">{menu.name}</span>
              </Link>
            ) : (
              <div>
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === menu.id ? null : menu.id)
                  }
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-xl transition-all duration-200 ${
                    url.startsWith(`/${menu.url}`)
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getIcon(menu.icon)}
                    <span className="text-sm">{menu.name}</span>
                  </div>
                  <span className="text-xs">
                    {openMenu === menu.id ? "▲" : "▼"}
                  </span>
                </button>

                <div
                  className={`ml-6 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                    openMenu === menu.id ? "max-h-60" : "max-h-0"
                  }`}
                >
                  {menu.children
                    .slice()
                    .sort((a, b) => a.id - b.id) // anak juga diurutkan by id
                    .map((child) => (
                      <Link
                        key={child.id}
                        href={`/${child.url}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                          url.startsWith(`/${child.url}`)
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {getIcon(child.icon)}
                        {child.name}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Logout */}
        <Link
          href="/logout"
          method="post"
          as="button"
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-all"
        >
          <Icons.LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </nav>
    </aside>
  );
}
