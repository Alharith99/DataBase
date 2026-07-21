import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function Admissions() {
  const [rows, setRows] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [lookups, setLookups] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    const [a, p, d, l] = await Promise.all([
      api.admissions(), api.patients(), api.doctors(), api.lookups(),
    ]);
    setRows(a);
    setPatients(p);
    setDoctors(d.filter((x) => x.status === 'Active'));
    setLookups(l);
  }

  useEffect(() => { load(); }, []);

  const availableRooms = (lookups?.rooms || []).filter((r) => r.status === 'Available');

  async function save(e) {
    e.preventDefault();
    setError('');
    try {
      await api.createAdmission(form);
      setForm(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function discharge(id) {
    const date = new Date().toISOString().slice(0, 10);
    await api.discharge(id, date);
    await load();
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Admissions</h1>
          <p>Admit patients to rooms — room status updates automatically</p>
        </div>
        <button type="button" onClick={() => setForm({
          patient_id: patients[0]?.patient_id || '',
          doctor_id: doctors[0]?.doctor_id || '',
          room_id: availableRooms[0]?.room_id || '',
          admission_date: new Date().toISOString().slice(0, 10),
          admission_reason: '',
        })}>Admit Patient</button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Patient</th><th>Doctor</th><th>Room</th><th>Type</th><th>Admitted</th><th>Discharged</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.admission_id}>
                <td>{a.patient_name}</td>
                <td>{a.doctor_name}</td>
                <td>{a.room_no}</td>
                <td>{a.room_type}</td>
                <td>{a.admission_date}</td>
                <td>{a.discharge_date || '—'}</td>
                <td>
                  <span className={`badge ${a.status === 'Admitted' ? 'warn' : 'ok'}`}>{a.status}</span>
                </td>
                <td>
                  {a.status === 'Admitted' && (
                    <button type="button" className="secondary" onClick={() => discharge(a.admission_id)}>Discharge</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={save}>
            <h3>Admit Patient</h3>
            {error && <div className="error">{error}</div>}
            <div className="form-grid">
              <label>Patient
                <select required value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })}>
                  {patients.map((p) => <option key={p.patient_id} value={p.patient_id}>{p.full_name}</option>)}
                </select>
              </label>
              <label>Doctor
                <select required value={form.doctor_id} onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}>
                  {doctors.map((d) => <option key={d.doctor_id} value={d.doctor_id}>{d.full_name}</option>)}
                </select>
              </label>
              <label>Available Room
                <select required value={form.room_id} onChange={(e) => setForm({ ...form, room_id: e.target.value })}>
                  {availableRooms.map((r) => (
                    <option key={r.room_id} value={r.room_id}>{r.room_no} — {r.room_type}</option>
                  ))}
                </select>
              </label>
              <label>Admission Date<input type="date" required value={form.admission_date} onChange={(e) => setForm({ ...form, admission_date: e.target.value })} /></label>
              <label className="full">Reason<textarea value={form.admission_reason} onChange={(e) => setForm({ ...form, admission_reason: e.target.value })} /></label>
            </div>
            <div className="modal-actions">
              <button type="button" className="secondary" onClick={() => setForm(null)}>Cancel</button>
              <button type="submit">Admit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
