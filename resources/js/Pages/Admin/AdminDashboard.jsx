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
  const COLORS = ["#facc15", "#22c55e", "#ef4444"]; // kuning, hijau, merah
  const pieData = [
    { name: "Belum Diverifikasi", value: stats.pending },
    { name: "Disetujui", value: stats.approved },
    { name: "Ditolak", value: stats.rejected },
  ];

  // Format tooltip angka dengan pemisah ribuan
  const formatNumber = (num) =>
    new Intl.NumberFormat("id-ID").format(num ?? 0);

  return (
    <AdminLayout user={auth.user}>
      {/* === HEADER WELCOME === */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Selamat Datang, <span className="text-orange-600">{auth.user.name}</span>
        </h1>
        <p className="text-gray-500 mt-2 md:mt-0 text-sm md:text-base">
          Ringkasan data dan aktivitas dokumen hukum terbaru
        </p>
      </div>

      {/* === RINGKASAN CARD === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Total Dokumen</p>
          <h2 className="text-3xl font-extrabold text-orange-600 mt-1">
            {formatNumber(stats.total)}
          </h2>
        </div>
        <div className="p-5 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-sm border border-green-100 hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Disetujui</p>
          <h2 className="text-3xl font-extrabold text-green-600 mt-1">
            {formatNumber(stats.approved)}
          </h2>
        </div>
        <div className="p-5 bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-sm border border-yellow-100 hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Belum Diverifikasi</p>
          <h2 className="text-3xl font-extrabold text-yellow-600 mt-1">
            {formatNumber(stats.pending)}
          </h2>
        </div>
        <div className="p-5 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-sm border border-red-100 hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Ditolak</p>
          <h2 className="text-3xl font-extrabold text-red-600 mt-1">
            {formatNumber(stats.rejected)}
          </h2>
        </div>
      </div>

      {/* === GRAFIK === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* === PIE CHART STATUS === */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Distribusi Status Dokumen
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) =>
                  `${name} (${formatNumber(value)})`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [formatNumber(value), name]}
                contentStyle={{
                  borderRadius: "8px",
                  borderColor: "#f3f4f6",
                  backgroundColor: "#fff",
                  color: "#374151",
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                formatter={(value) => <span className="text-gray-700">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* === BAR CHART PER TAHUN === */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Jumlah Dokumen per Tahun
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stats.perTahun}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="tahun" tick={{ fill: "#6b7280" }} />
              <YAxis tick={{ fill: "#6b7280" }} />
              <Tooltip
                formatter={(value) => formatNumber(value)}
                contentStyle={{
                  borderRadius: "8px",
                  borderColor: "#f3f4f6",
                  backgroundColor: "#fff",
                  color: "#374151",
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                formatter={() => (
                  <span className="text-gray-700">Jumlah Dokumen</span>
                )}
              />
              <Bar dataKey="jumlah" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
