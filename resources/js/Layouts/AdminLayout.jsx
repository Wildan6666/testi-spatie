// resources/js/Layouts/AdminLayout.jsx
import { useState } from "react";
import Sidebar from "@/Components/Sidebar";

export default function AdminLayout({ children, user }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        user={user}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
