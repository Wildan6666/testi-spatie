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
      } h-screen bg-gradient-to-b from-white via-[#fff9f5] to-[#fef3eb] border-r border-gray-200 shadow-md flex flex-col transition-all duration-300`}
    >
      {/* === Header === */}
      <div className="relative p-6 border-b bg-gradient-to-r from-orange-600 to-orange-400 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white tracking-wide">
            JDIH UNJA
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-gray-200 transition"
        >
          <Icons.Menu className="w-6 h-6" />
        </button>
      </div>

      {/* === Menu === */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 text-gray-700">
        {menus.filter(filterMenu).map((menu) => {
          const activeParent =
            url.startsWith(`/${menu.url}`) || isChildActive(menu.children);

          return (
            <div key={menu.id}>
              {/* MENU TANPA ANAK */}
              {menu.children.length === 0 ? (
                <Link
                  href={`/${menu.url}`}
                  className={`group flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } px-4 py-2 rounded-md transition-all duration-200 relative ${
                    activeParent
                      ? "bg-orange-50 text-orange-700 font-semibold border-l-4 border-orange-500 shadow-sm"
                      : "hover:bg-orange-50/50 hover:text-orange-600"
                  }`}
                >
                  {getIcon(menu.icon)}
                  {!collapsed && <span className="text-sm">{menu.name}</span>}
                  {collapsed && (
                    <span className="absolute left-16 bg-gray-800 text-xs text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                      {menu.name}
                    </span>
                  )}
                </Link>
              ) : (
                // MENU DENGAN ANAK
                <div>
                  <button
                    onClick={() => {
                      if (openMenu === menu.id) {
                        setOpenMenu(null);
                        setManuallyClosed((prev) => [...prev, menu.id]);
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
                        ? "bg-orange-50 text-orange-700 font-semibold border-l-4 border-orange-500 shadow-sm"
                        : "hover:bg-orange-50/50 hover:text-orange-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getIcon(menu.icon)}
                      {!collapsed && <span className="text-sm">{menu.name}</span>}
                    </div>
                    {!collapsed && (
                      <Icons.ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          openMenu === menu.id ||
                          (activeParent && !manuallyClosed.includes(menu.id))
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </button>

                  {!collapsed && (
                    <div
                      className={`ml-5 overflow-hidden transition-all duration-500 ease-in-out ${
                        openMenu === menu.id ||
                        (activeParent && !manuallyClosed.includes(menu.id))
                          ? "max-h-96 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="space-y-1">
                        {menu.children.filter(filterMenu).map((child) => (
                          <Link
                            key={child.id}
                            href={`/${child.url}`}
                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                              url.startsWith(`/${child.url}`)
                                ? "bg-orange-100 text-orange-700 font-semibold border-l-4 border-orange-500"
                                : "hover:bg-orange-50 hover:text-orange-600"
                            }`}
                          >
                            {getIcon(child.icon)}
                            <span>{child.name}</span>
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
