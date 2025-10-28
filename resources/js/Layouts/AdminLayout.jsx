import { useState, useRef, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import {
  Search,
  Bell,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import FontProvider from "@/Components/Font";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { props } = usePage();
  const currentUser = props.auth?.user;
  const flash = props.flash;

  // === Dropdown Profil ===
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef(null);

  // === Notifikasi ===
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const notifRef = useRef(null);

  // === Fetch Notifikasi secara berkala ===
  useEffect(() => {
    const fetchNotifications = () => {
      axios.get("/notifications").then((res) => {
        setNotifications(res.data);
        setHasUnread(res.data.length > 0);
      });
    };

    fetchNotifications(); // load awal
    const interval = setInterval(fetchNotifications, 60000); // auto-refresh tiap 60 detik
    return () => clearInterval(interval);
  }, []);

  // === Tutup dropdown saat klik di luar area ===
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === Flash Message (tema UNJA) ===
  useEffect(() => {
    if (flash?.message) {
      const baseStyle = {
        fontWeight: "500",
        fontFamily: "Inter, sans-serif",
      };

      if (flash.type === "success") {
        toast.success(flash.message, {
          duration: 2500,
          style: {
            ...baseStyle,
            background: "#fff7ed",
            color: "#9a3412",
            border: "1px solid #fed7aa",
          },
          iconTheme: { primary: "#ea580c", secondary: "#fff7ed" },
        });
      } else if (flash.type === "error") {
        toast.error(flash.message, {
          duration: 3000,
          style: {
            ...baseStyle,
            background: "#fef2f2",
            color: "#7f1d1d",
            border: "1px solid #fecaca",
          },
          iconTheme: { primary: "#dc2626", secondary: "#fef2f2" },
        });
      } else {
        toast(flash.message, {
          duration: 2500,
          style: {
            ...baseStyle,
            background: "#fff7ed",
            color: "#7c2d12",
            border: "1px solid #fed7aa",
          },
        });
      }
    }
  }, [flash]);

  // === Ambil notifikasi awal ===
  useEffect(() => {
    axios.get("/notifications").then((res) => {
      setNotifications(res.data);
      setHasUnread(res.data.length > 0);
    });
  }, []);

  return (
    <FontProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* === TOASTER (tema UNJA) === */}
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
              {/* 🔔 Notifikasi */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    if (hasUnread) setHasUnread(false); // Hilangkan badge merah setelah dibuka
                  }}
                  className="relative p-2 bg-gray-50 hover:bg-orange-50 rounded-full border border-gray-100 transition"
                >
                  <Bell className="w-5 h-5 text-orange-400" />
                  {hasUnread && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-100 z-50">
                    <div className="p-3 font-semibold text-sm border-b text-gray-700">
                      Notifikasi
                    </div>

                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <Link
                          key={notif.id}
                          href={notif.link}
                          className="flex items-start gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition"
                        >
                          {/* Ikon status */}
                          {notif.status === "approved" && (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          )}
                          {notif.status === "rejected" && (
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          )}
                          {notif.status === "pending" && (
                            <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          )}

                          <div className="flex-1">
                            <div className="font-medium text-orange-600 truncate">
                              {notif.judul}
                            </div>
                            <div className="text-xs text-gray-500">
                              {notif.pesan}
                            </div>
                            <div className="text-[11px] text-gray-400 italic mt-0.5">
                              {notif.updated_at}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500 text-sm text-center">
                        Tidak ada notifikasi
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 👤 Avatar User */}
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
    </FontProvider>
  );
}
