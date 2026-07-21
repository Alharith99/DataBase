import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function VisitWorkspace() {
  const { appointmentId } = useParams();
  const [data, setData] = useState(null);
  const [visit, setVisit] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [item, setItem] = useState({ medicine_id: '', dosage: '', frequency: '', duration_days: 7, instructions: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  async function load() {
    const [w, m] = await Promise.all([api.workspace(appointmentId), api.medicines()]);
    setData(w);
    setVisit({ ...w.visit });
    setMedicines(m.filter((x) => x.status === 'Active'));
    if (!item.medicine_id && m.length) setItem((prev) => ({ ...prev, medicine_id: m[0].medicine_id }));
  }

  useEffect(() => { load(); }, [appointmentId]);

  async function saveVisit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.updateVisit(visit.visit_id, visit);
      setMsg('Visit saved. Appointment marked Completed.');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function addItem(e) {
    e.preventDefault();
    await api.addRxItem(data.prescription.prescription_id, item);
    setItem({ medicine_id: medicines[0]?.medicine_id || '', dosage: '', frequency: '', duration_days: 7, instructions: '' });
    await load();
  }

  if (!data || !visit) return <p>Loading workspace…</p>;
  const { patient, doctor, appointment, items, previousVisits } = data;

  return (
    <div className="stack">
      <div className="page-head">
        <div>
          <h1>Clinical Visit Workspace</h1>
          <p>Manage the visit from one place — patient, appointment, diagnosis, prescription</p>
        </div>
        <Link className="btn secondary" to="/appointments">Back</Link>
      </div>

      {msg && <div className="panel" style={{ background: '#d9efe3' }}>{msg}</div>}
      {error && <div className="error">{error}</div>}

      <div className="workspace-grid">
        <div className="panel summary">
          <h2>Patient</h2>
          <dl>
            <dt>Name</dt><dd>{patient.full_name}</dd>
            <dt>Civil ID</dt><dd>{patient.civil_id}</dd>
            <dt>Age / Gender</dt><dd>{patient.age} / {patient.gender}</dd>
            <dt>Blood</dt><dd>{patient.blood_group}</dd>
            <dt>Mobile</dt><dd>{patient.mobile_no}</dd>
          </dl>
        </div>
        <div className="panel summary">
          <h2>Appointment</h2>
          <dl>
            <dt>Date</dt><dd>{appointment.appointment_date}</dd>
            <dt>Time</dt><dd>{appointment.appointment_time}</dd>
            <dt>Status</dt><dd>{appointment.status_name}</dd>
            <dt>Reason</dt><dd>{appointment.reason_for_visit || '—'}</dd>
          </dl>
        </div>
        <div className="panel summary">
          <h2>Doctor</h2>
          <dl>
            <dt>Name</dt><dd>{doctor.full_name}</dd>
            <dt>Department</dt><dd>{doctor.department_name}</dd>
            <dt>Specialty</dt><dd>{doctor.specialty_name}</dd>
          </dl>
        </div>
      </div>

      <form className="panel" onSubmit={saveVisit}>
        <h2>Visit Details</h2>
        <div className="form-grid">
          <label className="full">Symptoms<textarea value={visit.symptoms || ''} onChange={(e) => setVisit({ ...visit, symptoms: e.target.value })} /></label>
          <label className="full">Diagnosis<textarea value={visit.diagnosis || ''} onChange={(e) => setVisit({ ...visit, diagnosis: e.target.value })} /></label>
          <label className="full">Notes<textarea value={visit.notes || ''} onChange={(e) => setVisit({ ...visit, notes: e.target.value })} /></label>
          <label>Follow-up Date<input type="date" value={visit.follow_up_date || ''} onChange={(e) => setVisit({ ...visit, follow_up_date: e.target.value })} /></label>
        </div>
        <div className="modal-actions">
          <button type="submit">Save Visit</button>
        </div>
      </form>

      <div className="panel">
        <h2>Prescription</h2>
        <table>
          <thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Days</th><th>Instructions</th><th></th></tr></thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.prescription_item_id}>
                <td>{i.medicine_name}</td>
                <td>{i.dosage}</td>
                <td>{i.frequency}</td>
                <td>{i.duration_days}</td>
                <td>{i.instructions}</td>
                <td>
                  <button type="button" className="danger" onClick={async () => { await api.deleteRxItem(i.prescription_item_id); load(); }}>Remove</button>
                </td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan={6}>No medicines yet</td></tr>}
          </tbody>
        </table>

        <form className="form-grid" style={{ marginTop: '1rem' }} onSubmit={addItem}>
          <label>Medicine
            <select required value={item.medicine_id} onChange={(e) => setItem({ ...item, medicine_id: e.target.value })}>
              {medicines.map((m) => <option key={m.medicine_id} value={m.medicine_id}>{m.medicine_name}</option>)}
            </select>
          </label>
          <label>Dosage<input value={item.dosage} onChange={(e) => setItem({ ...item, dosage: e.target.value })} placeholder="500mg" /></label>
          <label>Frequency<input value={item.frequency} onChange={(e) => setItem({ ...item, frequency: e.target.value })} placeholder="Twice daily" /></label>
          <label>Days<input type="number" min="1" value={item.duration_days} onChange={(e) => setItem({ ...item, duration_days: e.target.value })} /></label>
          <label className="full">Instructions<input value={item.instructions} onChange={(e) => setItem({ ...item, instructions: e.target.value })} placeholder="After food" /></label>
          <div className="full"><button type="submit">Add Medicine</button></div>
        </form>
      </div>

      <div className="panel">
        <h2>Previous Visits (same patient)</h2>
        <table>
          <thead><tr><th>Date</th><th>Diagnosis</th><th>Symptoms</th><th>Follow-up</th></tr></thead>
          <tbody>
            {previousVisits.map((v) => (
              <tr key={v.visit_id}>
                <td>{v.visit_date}</td>
                <td>{v.diagnosis}</td>
                <td>{v.symptoms}</td>
                <td>{v.follow_up_date || '—'}</td>
              </tr>
            ))}
            {!previousVisits.length && <tr><td colSpan={4}>No previous visits</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
