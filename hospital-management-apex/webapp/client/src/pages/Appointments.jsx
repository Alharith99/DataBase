import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default function Appointments() {
  const [rows, setRows] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [lookups, setLookups] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    const [a, p, d, l] = await Promise.all([
      api.appointments(), api.patients(), api.doctors(), api.lookups(),
    ]);
    setRows(a);
    setPatients(p);
    setDoctors(d.filter((x) => x.status === 'Active'));
    setLookups(l);
  }

  useEffect(() => { load(); }, []);

  const selectedDoctor = useMemo(
    () => doctors.find((d) => String(d.doctor_id) === String(form?.doctor_id)),
    [doctors, form]
  );

  async function save(e) {
    e.preventDefault();
    setError('');
    try {
      await api.createAppointment(form);
      setForm(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Appointments</h1>
          <p>Book appointments and open the clinical visit workspace</p>
        </div>
        <button type="button" onClick={() => setForm({
          patient_id: patients[0]?.patient_id || '',
          doctor_id: doctors[0]?.doctor_id || '',
          appointment_date: new Date().toISOString().slice(0, 10),
          appointment_time: '09:00',
          status_id: 1,
          reason_for_visit: '',
        })}>Book Appointment</button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Time</th><th>Patient</th><th>Doctor</th><th>Department</th><th>Status</th><th>Reason</th><th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.appointment_id}>
                <td>{a.appointment_date}</td>
                <td>{a.appointment_time}</td>
                <td>{a.patient_name}</td>
                <td>{a.doctor_name}</td>
                <td>{a.department_name}</td>
                <td>{a.status_name}</td>
                <td>{a.reason_for_visit}</td>
                <td className="row-actions">
                  <Link className="btn" to={`/workspace/${a.appointment_id}`}>Open Visit</Link>
                  <button type="button" className="danger" onClick={async () => { await api.deleteAppointment(a.appointment_id); load(); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={save}>
            <h3>Book Appointment</h3>
            {error && <div className="error">{error}</div>}
            <div className="form-grid">
              <label>Patient
                <select required value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })}>
                  {patients.map((p) => <option key={p.patient_id} value={p.patient_id}>{p.full_name} ({p.civil_id})</option>)}
                </select>
              </label>
              <label>Doctor
                <select required value={form.doctor_id} onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}>
                  {doctors.map((d) => <option key={d.doctor_id} value={d.doctor_id}>{d.full_name}</option>)}
                </select>
              </label>
              <label>Date<input type="date" required value={form.appointment_date} onChange={(e) => setForm({ ...form, appointment_date: e.target.value })} /></label>
              <label>Time<input type="time" required value={form.appointment_time} onChange={(e) => setForm({ ...form, appointment_time: e.target.value })} /></label>
              <label>Status
                <select value={form.status_id} onChange={(e) => setForm({ ...form, status_id: e.target.value })}>
                  {lookups?.appointmentStatuses.map((s) => <option key={s.status_id} value={s.status_id}>{s.status_name}</option>)}
                </select>
              </label>
              <label className="full">Reason<textarea value={form.reason_for_visit} onChange={(e) => setForm({ ...form, reason_for_visit: e.target.value })} /></label>
            </div>
            {selectedDoctor && (
              <div className="panel" style={{ marginTop: '0.8rem', boxShadow: 'none' }}>
                <strong>Doctor details:</strong> {selectedDoctor.department_name} · {selectedDoctor.specialty_name} · Fee {selectedDoctor.consultation_fee} OMR
              </div>
            )}
            <div className="modal-actions">
              <button type="button" className="secondary" onClick={() => setForm(null)}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
