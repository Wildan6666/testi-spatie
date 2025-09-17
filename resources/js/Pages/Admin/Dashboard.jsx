import AdminLayout from "@/Layouts/AdminLayout";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ auth, stats }) {
  // stats contoh struktur dari backend:
  // {
  //   total: 40,
  //   approved: 25,
  //   pending: 10,
  //   rejected: 5,
  //   perTahun: [{ tahun: 2023, jumlah: 12 }, { tahun: 2024, jumlah: 28 }],
  // }

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
  ];

  return (
    <AdminLayout user={auth.user}>
      {/* Welcome */}
      <h1 className="text-2xl font-bold text-gray-800">
        Selamat datang, {auth.user.name} 👋
      </h1>

      {/* Cards ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="p-4 bg-white rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Total Dokumen</p>
          <h2 className="text-2xl font-bold text-gray-800">{stats.total}</h2>
        </div>
        <div className="p-4 bg-white rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Approved</p>
          <h2 className="text-2xl font-bold text-green-600">{stats.approved}</h2>
        </div>
        <div className="p-4 bg-white rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">{stats.pending}</h2>
        </div>
        <div className="p-4 bg-white rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Rejected</p>
          <h2 className="text-2xl font-bold text-red-600">{stats.rejected}</h2>
        </div>
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Pie Chart Status */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <h3 className="text-lg font-semibold mb-4">Distribusi Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart per Tahun */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <h3 className="text-lg font-semibold mb-4">Dokumen per Tahun</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.perTahun}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tahun" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="jumlah" fill="#3b82f6" name="Jumlah Dokumen" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
