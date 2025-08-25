// resources/js/Layouts/AdminLayout.jsx
import Sidebar from "@/Components/Sidebar";

export default function AdminLayout({ children, user }) {
  return (
    <div className="flex">
      <Sidebar user={user} />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}
