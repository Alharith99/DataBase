import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

const empty = {
  civil_id: '', full_name: '', gender: 'Male', date_of_birth: '', mobile_no: '',
  email: '', blood_group: 'O+', address: '', emergency_contact_name: '', emergency_contact_no: '',
};

export default function Patients() {
  const [rows, setRows] = useState([]);
  const [lookups, setLookups] = useState(null);
  const [q, setQ] = useState('');
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  async function load(search = q) {
    setRows(await api.patients(search));
  }

  useEffect(() => {
    Promise.all([api.patients(), api.lookups()]).then(([p, l]) => {
      setRows(p);
      setLookups(l);
    });
  }, []);

  async function save(e) {
    e.preventDefault();
    setError('');
    try {
      if (form.patient_id) await api.updatePatient(form.patient_id, form);
      else await api.createPatient(form);
      setForm(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!confirm('Delete this patient?')) return;
    await api.deletePatient(id);
    await load();
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Patients</h1>
          <p>Register and manage patient records</p>
        </div>
        <button type="button" onClick={() => { setError(''); setForm({ ...empty }); }}>Add Patient</button>
      </div>

      <div className="toolbar">
        <input
          placeholder="Search name, Civil ID, mobile…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ minWidth: 260 }}
        />
        <button type="button" className="secondary" onClick={() => load(q)}>Search</button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Civil ID</th><th>Name</th><th>Gender</th><th>Age</th><th>Mobile</th><th>Blood</th><th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.patient_id}>
                <td>{p.civil_id}</td>
                <td>{p.full_name}</td>
                <td>{p.gender}</td>
                <td>{p.age}</td>
                <td>{p.mobile_no}</td>
                <td>{p.blood_group}</td>
                <td className="row-actions">
                  <Link className="btn secondary" to={`/patients/${p.patient_id}`}>Profile</Link>
                  <button type="button" className="secondary" onClick={() => { setError(''); setForm({ ...p }); }}>Edit</button>
                  <button type="button" className="danger" onClick={() => remove(p.patient_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={save}>
            <h3>{form.patient_id ? 'Edit Patient' : 'New Patient'}</h3>
            {error && <div className="error">{error}</div>}
            <div className="form-grid">
              <label>Civil ID<input required value={form.civil_id} onChange={(e) => setForm({ ...form, civil_id: e.target.value })} /></label>
              <label>Full Name<input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label>
              <label>Gender
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                  {lookups?.genders.map((g) => <option key={g}>{g}</option>)}
                </select>
              </label>
              <label>Date of Birth<input type="date" required value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} /></label>
              <label>Mobile<input required value={form.mobile_no} onChange={(e) => setForm({ ...form, mobile_no: e.target.value })} /></label>
              <label>Blood Group
                <select value={form.blood_group || ''} onChange={(e) => setForm({ ...form, blood_group: e.target.value })}>
                  {lookups?.bloodGroups.map((g) => <option key={g}>{g}</option>)}
                </select>
              </label>
              <label className="full">Email<input value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
              <label className="full">Address<input value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} /></label>
              <label>Emergency Contact<input value={form.emergency_contact_name || ''} onChange={(e) => setForm({ ...form, emergency_contact_name: e.target.value })} /></label>
              <label>Emergency Phone<input value={form.emergency_contact_no || ''} onChange={(e) => setForm({ ...form, emergency_contact_no: e.target.value })} /></label>
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
