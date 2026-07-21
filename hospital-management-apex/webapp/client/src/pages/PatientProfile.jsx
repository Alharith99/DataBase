import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function PatientProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.patient(id).then(setData).catch(console.error);
  }, [id]);

  if (!data) return <p>Loading profile…</p>;
  const { patient, appointments, visits, admissions } = data;

  return (
    <div className="stack">
      <div className="page-head">
        <div>
          <h1>{patient.full_name}</h1>
          <p>Patient profile — appointments, visits, admissions</p>
        </div>
        <Link className="btn secondary" to="/patients">Back</Link>
      </div>

      <div className="panel">
        <h2>Patient Information</h2>
        <div className="form-grid">
          <div><strong>Civil ID:</strong> {patient.civil_id}</div>
          <div><strong>Age:</strong> {patient.age}</div>
          <div><strong>Gender:</strong> {patient.gender}</div>
          <div><strong>Blood:</strong> {patient.blood_group}</div>
          <div><strong>Mobile:</strong> {patient.mobile_no}</div>
          <div><strong>Email:</strong> {patient.email || '—'}</div>
          <div className="full"><strong>Address:</strong> {patient.address || '—'}</div>
        </div>
      </div>

      <div className="panel">
        <h2>Appointment History</h2>
        <table>
          <thead><tr><th>Date</th><th>Time</th><th>Doctor</th><th>Status</th><th>Reason</th></tr></thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.appointment_id}>
                <td>{a.appointment_date}</td><td>{a.appointment_time}</td>
                <td>{a.doctor_name}</td><td>{a.status_name}</td><td>{a.reason_for_visit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <h2>Visit History</h2>
        <table>
          <thead><tr><th>Date</th><th>Doctor</th><th>Diagnosis</th><th>Follow-up</th></tr></thead>
          <tbody>
            {visits.map((v) => (
              <tr key={v.visit_id}>
                <td>{v.visit_date}</td><td>{v.doctor_name}</td>
                <td>{v.diagnosis}</td><td>{v.follow_up_date || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <h2>Admission History</h2>
        <table>
          <thead><tr><th>Admitted</th><th>Room</th><th>Doctor</th><th>Status</th><th>Discharged</th></tr></thead>
          <tbody>
            {admissions.map((a) => (
              <tr key={a.admission_id}>
                <td>{a.admission_date}</td><td>{a.room_no} ({a.room_type})</td>
                <td>{a.doctor_name}</td><td>{a.status}</td><td>{a.discharge_date || '—'}</td>
              </tr>
            ))}
            {!admissions.length && <tr><td colSpan={5}>No admissions</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
