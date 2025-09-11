import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import * as Icons from "lucide-react";

export default function Sidebar() {
  const { url, props } = usePage();
  const menus = (props.menus || []).slice().sort((a, b) => a.id - b.id);
  const [openMenu, setOpenMenu] = useState(null);

  const getIcon = (iconName) => {
    if (!iconName) return <Icons.Menu size={18} />;

    const formatted = iconName
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");

    const Icon = Icons[formatted] || Icons.Menu;
    return <Icon size={18} />;
  };

  // cek apakah child url aktif
  const isChildActive = (children) =>
    children?.some((child) => url.startsWith(`/${child.url}`));

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-md flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-500">
        <h1 className="text-xl font-bold text-white tracking-wide">
          Admin JDIH
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 text-gray-700">
        {menus.map((menu) => {
          const activeParent =
            url.startsWith(`/${menu.url}`) || isChildActive(menu.children);

          return (
            <div key={menu.id}>
              {menu.children.length === 0 ? (
                <Link
                  href={`/${menu.url}`}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeParent
                      ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600"
                      : "hover:bg-gray-50"
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
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeParent
                        ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getIcon(menu.icon)}
                      <span className="text-sm">{menu.name}</span>
                    </div>
                    <Icons.ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        openMenu === menu.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`ml-6 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                      openMenu === menu.id ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    {menu.children
                      .slice()
                      .sort((a, b) => a.id - b.id)
                      .map((child) => (
                        <Link
                          key={child.id}
                          href={`/${child.url}`}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                            url.startsWith(`/${child.url}`)
                              ? "bg-blue-100 text-blue-700 font-semibold"
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
          );
        })}

        {/* Logout */}
        <Link
          href="/logout"
          method="post"
          as="button"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all font-medium"
        >
          <Icons.LogOut size={18} />
          <span className="text-sm">Logout</span>
        </Link>
      </nav>
    </aside>
  );
}
