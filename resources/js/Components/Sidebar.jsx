import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { LayoutDashboard, Settings, LogOut, Users, Shield, List, Menu } from "lucide-react";

export default function Sidebar() {
  const { url } = usePage(); 
  const [openConfig, setOpenConfig] = useState(false);

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">Admin JDIH</h1>
      </div>

      <nav className="p-4 space-y-2 text-gray-700">
        {/* Dashboard */}
        <Link
          href="/admin"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
            url.startsWith("/admin")
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        {/* Konfigurasi Dropdown */}
        <div>
          <button
            onClick={() => setOpenConfig(!openConfig)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
              url.startsWith("/konfigurasi")
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <Menu size={18} />
              <span>Konfigurasi</span>
            </div>
            <span>{openConfig ? "▲" : "▼"}</span>
          </button>

          {openConfig && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                href="/konfigurasi/users"
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  url.startsWith("/konfigurasi/users")
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <Users size={16} /> Users
              </Link>
              <Link
                href="/konfigurasi/roles"
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  url.startsWith("/konfigurasi/roles")
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <Shield size={16} /> Roles
              </Link>
              <Link
                href="/konfigurasi/permissions"
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  url.startsWith("/konfigurasi/permissions")
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <Shield size={16} /> Permissions
              </Link>
              <Link
                href="/konfigurasi/menus"
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  url.startsWith("/konfigurasi/menus")
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <List size={16} /> Menus
              </Link>
            </div>
          )}
        </div>

        {/* Settings */}
        <Link
          href="/setting"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
            url.startsWith("/setting")
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          <Settings size={18} />
          <span>Settings</span>
        </Link>

        {/* Logout */}
        <Link
          href="/logout"
          method="post"
          as="button"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </nav>
    </aside>
  );
}
