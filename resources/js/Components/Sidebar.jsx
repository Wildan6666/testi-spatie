import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import * as Icons from "lucide-react";

export default function Sidebar() {
  const { url, props } = usePage();
  const menus = (props.menus || []).slice().sort((a, b) => a.id - b.id);
  const [openMenu, setOpenMenu] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

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

 return (
   <aside
  className={`${
    collapsed ? "w-20" : "w-64"
  } h-screen bg-white border-r shadow-md flex flex-col transition-all duration-300`}
>
  {/* Header */}
  <div className="relative p-6 border-b bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-between">
    {!collapsed && (
      <h1 className="text-xl font-bold text-white tracking-wide">
        Admin JDIH
      </h1>
    )}
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="text-white hover:text-gray-200"
    >
      <Icons.Menu className="w-6 h-6" />
    </button>
  </div>

  {/* Menu utama */}
  <nav className="flex-1 overflow-y-auto p-4 space-y-2 text-gray-700">
    {menus.map((menu) => {
      const activeParent =
        url.startsWith(`/${menu.url}`) || isChildActive(menu.children);

      return (
        <div key={menu.id}>
          {menu.children.length === 0 ? (
            <Link
              href={`/${menu.url}`}
              className={`flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              } px-4 py-2 rounded-md transition-all duration-200 ${
                activeParent
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              {getIcon(menu.icon)}
              {!collapsed && <span className="text-sm">{menu.name}</span>}
            </Link>
          ) : (
            // menu dengan anak (sama logikanya)
            <div>
              <button
                onClick={() =>
                  setOpenMenu(openMenu === menu.id ? null : menu.id)
                }
                className={`w-full flex items-center ${
                  collapsed ? "justify-center" : "justify-between"
                } px-4 py-2 rounded-md transition-all duration-200 ${
                  activeParent
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600"
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
                    className={`transition-transform ${
                      openMenu === menu.id ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {!collapsed && openMenu === menu.id && (
                <div className="ml-6 mt-2 space-y-1">
                  {menu.children.map((child) => (
                    <Link
                      key={child.id}
                      href={`/${child.url}`}
                      className={`flex items-center ${
                        collapsed ? "justify-center" : "gap-2"
                      } px-3 py-2 text-sm rounded-md ${
                        url.startsWith(`/${child.url}`)
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {getIcon(child.icon)}
                      {!collapsed && child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      );
    })}
  </nav>

  {/* Logout di bawah */}
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
