import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { usePage } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Statistik() {
  const { props } = usePage();
  const yearlyData = props.yearlyData || [];
  const monthlyData = props.monthlyData || [];
  const pieData = props.pieData || [];
  const totalDocs = props.stats?.total ?? props.total ?? 0; // total bisa dari dashboard

  const COLORS = ['#ffffff', '#fed7aa', '#fdba74'];

  return (
    <section className="section-statistik">
      <div className="stats-container">
        <h2 className="font-inter font-bold text-[48px] leading-[58px] text-center text-orange-500" data-aos="fade-up">Statistik JDIH</h2>
        <p className="stats-subtitle" data-aos="fade-up" data-aos-delay="200">
          Data visualisasi dokumentasi dan informasi hukum yang tersedia di sistem kami
        </p>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Pie Chart */}
          <div className="chart-card" data-aos="fade-up">
            <h3 className="chart-title">Distribusi Jenis Dokumen</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={30}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || COLORS[index % COLORS.length]}
                      stroke="rgba(51, 47, 47, 0.562)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #ea580c',
                    borderRadius: '8px',
                    color: '#333',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                  formatter={(value, name) => [`${value} dokumen`, name]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '14px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="chart-card" data-aos="fade-up" data-aos-delay="200">
            <h3 className="chart-title">Dokumen per Tahun</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="grey" />
                <XAxis dataKey="tahun" tick={{ fill: 'grey' }} axisLine={{ stroke: 'grey' }} />
                <YAxis tick={{ fill: 'grey' }} axisLine={{ stroke: 'grey' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #ea580c',
                    borderRadius: '8px',
                    color: '#333',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                />
                <Bar dataKey="documents" fill="orange" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="single-chart" data-aos="fade-up" data-aos-delay="400">
          <h3 className="chart-title">Trend Dokumen 6 Bulan Terakhir</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="grey" />
              <XAxis dataKey="month" tick={{ fill: 'black' }} axisLine={{ stroke: 'gray' }} />
              <YAxis tick={{ fill: 'black' }} axisLine={{ stroke: 'grey' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #ea580c',
                  borderRadius: '8px',
                  color: '#333',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="orange"
                strokeWidth={3}
                dot={{ fill: 'white', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="stats-summary" data-aos="fade-up" data-aos-delay="100">
          <div className="summary-item">
            <div className="summary-number">{totalDocs}</div>
            <div className="summary-label">Total Dokumen</div>
          </div>
          {/* kalau mau tambahkan summary lain, bisa ambil dari props juga */}
        </div>
      </div>
    </section>
  );
}
