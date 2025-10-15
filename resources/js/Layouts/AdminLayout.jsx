import { useState, useRef, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { Search, Bell, Settings } from "lucide-react";
import { Toaster, toast } from "react-hot-toast"; // ✅ Toaster

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { props } = usePage();
  const currentUser = props.auth?.user;
  const flash = props.flash;

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

  // ✅ Tampilkan flash message (tema UNJA)
  useEffect(() => {
    if (flash?.message) {
      if (flash.type === "success") {
        toast.success(flash.message, {
          duration: 2500,
          style: {
            background: "#fff7ed", // oranye muda lembut
            color: "#9a3412", // cokelat tua hangat
            border: "1px solid #fed7aa",
            fontWeight: "500",
            fontFamily: "Inter, sans-serif",
          },
          iconTheme: { primary: "#ea580c", secondary: "#fff7ed" }, // warna utama UNJA
        });
      } else if (flash.type === "error") {
        toast.error(flash.message, {
          duration: 3000,
          style: {
            background: "#fef2f2",
            color: "#7f1d1d",
            border: "1px solid #fecaca",
            fontWeight: "500",
            fontFamily: "Inter, sans-serif",
          },
          iconTheme: { primary: "#dc2626", secondary: "#fef2f2" },
        });
      } else {
        toast(flash.message, {
          duration: 2500,
          style: {
            background: "#fff7ed",
            color: "#7c2d12",
            border: "1px solid #fed7aa",
          },
        });
      }
    }
  }, [flash]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* === TOASTER (tema UNJA, posisi tengah atas) === */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "Inter, sans-serif",
            borderRadius: "10px",
            padding: "10px 18px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          },
        }}
      />

      {/* Sidebar */}
      <Sidebar
        user={currentUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Area */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        {/* === HEADER === */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-30 shadow-sm">
          {/* 🔍 Search Bar */}
          <div className="flex justify-end flex-1">
            <div className="flex items-center bg-gray-50 rounded-full px-4 py-1.5 w-full max-w-xs shadow-sm border border-transparent focus-within:border-orange-300 focus-within:shadow-[0_0_0_2px_rgba(234,88,12,0.15)] transition-all duration-200">
              <Search className="text-orange-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Cari sesuatu..."
                className="appearance-none bg-transparent border-none w-full text-sm text-gray-700 placeholder-orange-400 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* 🔧 Icon Section */}
          <div className="flex items-center gap-4 ml-6">
            <button className="p-2 bg-gray-50 hover:bg-orange-50 rounded-full border border-gray-100 transition">
              <Settings className="w-5 h-5 text-orange-400" />
            </button>

            <button className="p-2 bg-gray-50 hover:bg-orange-50 rounded-full border border-gray-100 transition">
              <Bell className="w-5 h-5 text-orange-400" />
            </button>

            {/* Avatar User */}
            {currentUser && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="flex items-center focus:outline-none"
                >
                  {currentUser.profile_photo_url ? (
                    <img
                      src={currentUser.profile_photo_url}
                      alt="User Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                      {currentUser.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="px-3 py-2 border-b text-xs text-gray-500">
                      {currentUser.name}
                    </div>

                    <Link
                      href={route("profile.edit")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profil
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Pengaturan
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* === MAIN CONTENT === */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
