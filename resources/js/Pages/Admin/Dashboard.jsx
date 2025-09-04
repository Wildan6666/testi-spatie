// resources/js/Pages/Dashboard.jsx
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ auth }) {
  return (
    <AdminLayout user={auth.user}>
      <h1 className="text-2xl font-bold">Welcome, {auth.user.name} 👋</h1>
      <p className="mt-2 text-gray-600"></p>
    </AdminLayout>
  );
}