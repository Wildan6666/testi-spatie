import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import * as Icons from "lucide-react";

export default function Sidebar() {
  const { url, props } = usePage();

  // Ambil menu & permissions dari props
  const menus = (props.menus || []).slice().sort((a, b) => a.id - b.id);
  const userPermissions = props.auth?.permissions || [];

  const [openMenu, setOpenMenu] = useState(null);
  const [manuallyClosed, setManuallyClosed] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  // Fungsi ambil ikon
  const getIcon = (iconName) => {
    if (!iconName) return <Icons.Menu size={18} />;
    const formatted = iconName
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");
    const Icon = Icons[formatted] || Icons.Menu;
    return <Icon size={18} />;
  };

  const isChildActive = (children) =>
    children?.some((child) => url.startsWith(`/${child.url}`));

  // Filter permission dengan fallback
  const filterMenu = (menu) => {
    if (!menu.permissions) return true; // menu publik
    if (userPermissions.length === 0) return true; // fallback → tampilkan semua
    return userPermissions.includes(menu.permissions);
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-white border-r shadow-md flex flex-col transition-all duration-300`}
    >
      {/* === Header === */}
      <div className="relative p-6 border-b bg-gradient-to-r from-orange-600 to-orange-400 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white tracking-wide">
            Admin JDIH
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-gray-200 transition"
        >
          <Icons.Menu className="w-6 h-6" />
        </button>
      </div>

      {/* === Menu Utama === */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 text-gray-700">
        {menus.filter(filterMenu).map((menu) => {
          const activeParent =
            url.startsWith(`/${menu.url}`) || isChildActive(menu.children);

          return (
            <div key={menu.id}>
              {/* === MENU TANPA ANAK === */}
              {menu.children.length === 0 ? (
                <Link
                  href={`/${menu.url}`}
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } px-4 py-2 rounded-md transition-all duration-200 ${
                    activeParent
                      ? "bg-orange-50 text-orange-700 font-semibold border-l-4 border-orange-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {getIcon(menu.icon)}
                  {!collapsed && <span className="text-sm">{menu.name}</span>}
                </Link>
              ) : (
                // === MENU DENGAN ANAK ===
                <div>
                  {/* Tombol Parent */}
                  <button
                    onClick={() => {
                      if (openMenu === menu.id) {
                        setOpenMenu(null);
                        setManuallyClosed((prev) => [...prev, menu.id]); // tandai ditutup manual
                      } else {
                        setOpenMenu(menu.id);
                        setManuallyClosed((prev) =>
                          prev.filter((id) => id !== menu.id)
                        );
                      }
                    }}
                    className={`w-full flex items-center ${
                      collapsed ? "justify-center" : "justify-between"
                    } px-4 py-2 rounded-md transition-all duration-200 ${
                      activeParent
                        ? "bg-orange-50 text-orange-700 font-semibold border-l-4 border-orange-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getIcon(menu.icon)}
                      {!collapsed && (
                        <span className="text-sm">{menu.name}</span>
                      )}
                    </div>
                    {!collapsed && (
                      <Icons.ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          openMenu === menu.id ||
                          (activeParent &&
                            !manuallyClosed.includes(menu.id))
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown anak dengan animasi */}
                  {!collapsed && (
                    <div
                      className={`
                        ml-6 overflow-hidden transition-all duration-500 ease-in-out
                        ${
                          openMenu === menu.id ||
                          (activeParent &&
                            !manuallyClosed.includes(menu.id))
                            ? "max-h-96 opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      <div className="space-y-1">
                        {menu.children.filter(filterMenu).map((child) => (
                          <Link
                            key={child.id}
                            href={`/${child.url}`}
                            className={`flex items-center ${
                              collapsed ? "justify-center" : "gap-2"
                            } px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                              url.startsWith(`/${child.url}`)
                                ? "bg-orange-100 text-orange-700 font-semibold"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {getIcon(child.icon)}
                            {!collapsed && child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* === Logout di bawah === */}
      <div className="p-4 border-t">
        <Link
          href="/logout"
          method="post"
          as="button"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-all font-medium w-full`}
        >
          <Icons.LogOut size={18} />
          {!collapsed && <span className="text-sm">Logout</span>}
        </Link>
      </div>
    </aside>
  );
}
