import { useEffect, useState } from 'react';
import { api } from '../api/client';

const empty = {
  full_name: '', department_id: '', specialty_id: '', mobile_no: '',
  email: '', consultation_fee: 20, status: 'Active',
};

export default function Doctors() {
  const [rows, setRows] = useState([]);
  const [lookups, setLookups] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    const [d, l] = await Promise.all([api.doctors(), api.lookups()]);
    setRows(d);
    setLookups(l);
  }

  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    setError('');
    try {
      if (form.doctor_id) await api.updateDoctor(form.doctor_id, form);
      else await api.createDoctor(form);
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
          <h1>Doctors</h1>
          <p>Manage doctors with department and specialty lookups</p>
        </div>
        <button type="button" onClick={() => setForm({
          ...empty,
          department_id: lookups?.departments[0]?.department_id || '',
          specialty_id: lookups?.specialties[0]?.specialty_id || '',
        })}>Add Doctor</button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr><th>Name</th><th>Department</th><th>Specialty</th><th>Fee (OMR)</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.doctor_id}>
                <td>{d.full_name}</td>
                <td>{d.department_name}</td>
                <td>{d.specialty_name}</td>
                <td>{d.consultation_fee}</td>
                <td>{d.status}</td>
                <td className="row-actions">
                  <button type="button" className="secondary" onClick={() => setForm({ ...d })}>Edit</button>
                  <button type="button" className="danger" onClick={async () => { await api.deleteDoctor(d.doctor_id); load(); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={save}>
            <h3>{form.doctor_id ? 'Edit Doctor' : 'New Doctor'}</h3>
            {error && <div className="error">{error}</div>}
            <div className="form-grid">
              <label className="full">Full Name<input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label>
              <label>Department
                <select required value={form.department_id} onChange={(e) => setForm({ ...form, department_id: e.target.value })}>
                  {lookups?.departments.map((d) => <option key={d.department_id} value={d.department_id}>{d.department_name}</option>)}
                </select>
              </label>
              <label>Specialty
                <select required value={form.specialty_id} onChange={(e) => setForm({ ...form, specialty_id: e.target.value })}>
                  {lookups?.specialties.map((s) => <option key={s.specialty_id} value={s.specialty_id}>{s.specialty_name}</option>)}
                </select>
              </label>
              <label>Mobile<input value={form.mobile_no || ''} onChange={(e) => setForm({ ...form, mobile_no: e.target.value })} /></label>
              <label>Fee<input type="number" step="0.001" value={form.consultation_fee} onChange={(e) => setForm({ ...form, consultation_fee: e.target.value })} /></label>
              <label>Status
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </label>
              <label className="full">Email<input value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            </div>
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
