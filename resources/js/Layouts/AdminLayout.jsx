// resources/js/Layouts/AdminLayout.jsx
import Sidebar from "@/Components/Sidebar";

export default function AdminLayout({ children, user }) {
  return (
    <div className="flex h-screen overflow-hidden"> {/* Body wrapper */}
      {/* Sidebar fixed di kiri */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg">
        <Sidebar user={user} />
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 h-screen overflow-y-auto p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
