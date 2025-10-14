import { useState, useRef, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { ChevronDown, User, Settings } from "lucide-react";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { props } = usePage();
  const currentUser = props.auth?.user;

  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        user={currentUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Area */}
      <div className="flex flex-col flex-1 bg-gray-100 transition-all duration-300">
        {/* HEADER */}
        <header className="bg-white shadow-sm flex items-center justify-between px-6 py-3 border-b border-gray-200 sticky top-0 z-30">
          <h1 className="text-lg font-semibold text-gray-800">
        
          </h1>

          {currentUser && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-3 focus:outline-none group"
              >
                <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                  {userInitial}
                </div>

                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-semibold text-gray-800">
                    {currentUser.name}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {currentUser.roles?.[0]?.name ?? "user"}
                  </span>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-gray-500 transition-transform ${
                    openMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="px-3 py-2 border-b text-xs text-gray-500">
                    Akun Anda
                  </div>

                  {/* ✅ Profil (route bawaan Breeze) */}
                  <Link
                    href={route("profile.edit")}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  >
                    <User size={16} className="text-gray-500" /> Profil
                  </Link>

                  {/* ⚙️ Settings: sementara nonaktif atau arahkan ke halaman dummy */}
                  <Link
                    href="/admin/settings" // gunakan path biasa dulu
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  >
                    <Settings size={16} className="text-gray-500" /> Pengaturan
                  </Link>
                </div>
              )}
            </div>
          )}
        </header>

        {/* Konten Halaman */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
