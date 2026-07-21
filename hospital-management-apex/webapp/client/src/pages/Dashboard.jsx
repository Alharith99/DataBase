import { useEffect, useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { api } from '../api/client';

const COLORS = ['#0f6b5c', '#c45c26', '#3d6b8c', '#8b5e3c', '#1f7a4d', '#6b4f8c'];

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.dashboard().then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading dashboard…</p>;
  const { kpis, charts } = data;

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Al Noor Hospital daily operations overview</p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi"><span>Total Patients</span><strong>{kpis.totalPatients}</strong></div>
        <div className="kpi"><span>Today&apos;s Appointments</span><strong>{kpis.todaysAppointments}</strong></div>
        <div className="kpi"><span>Active Doctors</span><strong>{kpis.activeDoctors}</strong></div>
        <div className="kpi"><span>Current Admissions</span><strong>{kpis.currentAdmissions}</strong></div>
        <div className="kpi"><span>Low Stock Medicines</span><strong>{kpis.lowStockMedicines}</strong></div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h2>Appointments by Department</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={charts.appointmentsByDepartment}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c5d4cc" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#0f6b5c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="panel">
          <h2>Patients by Gender</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={charts.patientsByGender} dataKey="value" nameKey="label" outerRadius={90} label>
                {charts.patientsByGender.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="panel">
          <h2>Medicine Stock Status</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={charts.medicineStockStatus} dataKey="value" nameKey="label" outerRadius={90} label>
                <Cell fill="#1f7a4d" />
                <Cell fill="#c45c26" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="panel">
          <h2>Monthly Patient Visits</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={charts.monthlyVisits}>
              <CartesianGrid strokeDasharray="3 3" stroke="#c5d4cc" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#c45c26" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
