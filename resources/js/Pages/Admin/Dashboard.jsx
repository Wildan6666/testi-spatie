import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ auth }) {
  console.log(auth.user); // 👈 cek apakah ada "permissions" & "roles"

  return (
    <AdminLayout user={auth.user}>
      <h1 className="text-2xl font-bold">
        Welcome, {auth.user.name} 👋
      </h1>

      {/* Debug tampilkan user full */}
      <pre className="mt-4 bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(auth.user, null, 2)}
      </pre>
    </AdminLayout>
  );
}
