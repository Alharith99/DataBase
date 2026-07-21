import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';

export default function Reports() {
  const [tab, setTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [visits, setVisits] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [lookups, setLookups] = useState(null);
  const [filters, setFilters] = useState({ dept: '', doctor: '', status: '', from: '', to: '' });

  useEffect(() => {
    Promise.all([
      api.appointments(),
      api.visits(),
      api.medicines(),
      api.admissions(),
      api.lookups(),
    ]).then(([a, v, m, adm, l]) => {
      setAppointments(a);
      setVisits(v);
      setMedicines(m);
      setAdmissions(adm);
      setLookups(l);
    });
  }, []);

  const filteredAppts = useMemo(() => appointments.filter((a) => {
    if (filters.dept && String(a.department_id) !== String(filters.dept)) return false;
    if (filters.doctor && String(a.doctor_id) !== String(filters.doctor)) return false;
    if (filters.status && String(a.status_id) !== String(filters.status)) return false;
    if (filters.from && a.appointment_date < filters.from) return false;
    if (filters.to && a.appointment_date > filters.to) return false;
    return true;
  }), [appointments, filters]);

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Reports</h1>
          <p>Appointments, visits, medicine stock, and admissions</p>
        </div>
      </div>

      <div className="toolbar">
        {['appointments', 'visits', 'medicines', 'admissions'].map((t) => (
          <button key={t} type="button" className={tab === t ? '' : 'secondary'} onClick={() => setTab(t)}>
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'appointments' && (
        <div className="stack">
          <div className="toolbar">
            <input type="date" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} />
            <input type="date" value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value })} />
            <select value={filters.dept} onChange={(e) => setFilters({ ...filters, dept: e.target.value })}>
              <option value="">All departments</option>
              {lookups?.departments.map((d) => <option key={d.department_id} value={d.department_id}>{d.department_name}</option>)}
            </select>
            <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All statuses</option>
              {lookups?.appointmentStatuses.map((s) => <option key={s.status_id} value={s.status_id}>{s.status_name}</option>)}
            </select>
          </div>
          <div className="panel">
            <table>
              <thead>
                <tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Dept</th><th>Date</th><th>Time</th><th>Status</th><th>Reason</th></tr>
              </thead>
              <tbody>
                {filteredAppts.map((a) => (
                  <tr key={a.appointment_id}>
                    <td>{a.appointment_id}</td><td>{a.patient_name}</td><td>{a.doctor_name}</td>
                    <td>{a.department_name}</td><td>{a.appointment_date}</td><td>{a.appointment_time}</td>
                    <td>{a.status_name}</td><td>{a.reason_for_visit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'visits' && (
        <div className="panel">
          <table>
            <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Symptoms</th><th>Diagnosis</th><th>Follow-up</th></tr></thead>
            <tbody>
              {visits.map((v) => (
                <tr key={v.visit_id}>
                  <td>{v.patient_name}</td><td>{v.doctor_name}</td><td>{v.visit_date}</td>
                  <td>{v.symptoms}</td><td>{v.diagnosis}</td><td>{v.follow_up_date || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'medicines' && (
        <div className="panel">
          <table>
            <thead><tr><th>Medicine</th><th>Category</th><th>Stock</th><th>Reorder</th><th>Status</th></tr></thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m.medicine_id} style={m.stock_status === 'Low Stock' ? { background: '#fde8d8' } : undefined}>
                  <td>{m.medicine_name}</td><td>{m.category_name}</td>
                  <td>{m.current_stock}</td><td>{m.reorder_level}</td>
                  <td><span className={`badge ${m.stock_status === 'Low Stock' ? 'low' : 'ok'}`}>{m.stock_status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'admissions' && (
        <div className="panel">
          <table>
            <thead><tr><th>Patient</th><th>Doctor</th><th>Room</th><th>Type</th><th>Admitted</th><th>Discharged</th><th>Status</th></tr></thead>
            <tbody>
              {admissions.map((a) => (
                <tr key={a.admission_id}>
                  <td>{a.patient_name}</td><td>{a.doctor_name}</td><td>{a.room_no}</td>
                  <td>{a.room_type}</td><td>{a.admission_date}</td><td>{a.discharge_date || '—'}</td><td>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
