import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSeed } from './seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

let db = createSeed();

function age(dob) {
  const birth = new Date(dob);
  const now = new Date();
  let a = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) a--;
  return a;
}

function deptName(id) {
  return db.departments.find((d) => d.department_id === id)?.department_name || '';
}
function specName(id) {
  return db.specialties.find((s) => s.specialty_id === id)?.specialty_name || '';
}
function catName(id) {
  return db.medicineCategories.find((c) => c.category_id === id)?.category_name || '';
}
function statusName(id) {
  return db.appointmentStatuses.find((s) => s.status_id === id)?.status_name || '';
}
function patientName(id) {
  return db.patients.find((p) => p.patient_id === id)?.full_name || '';
}
function doctorName(id) {
  return db.doctors.find((d) => d.doctor_id === id)?.full_name || '';
}
function medicineName(id) {
  return db.medicines.find((m) => m.medicine_id === id)?.medicine_name || '';
}
function room(id) {
  return db.rooms.find((r) => r.room_id === id);
}

function enrichDoctor(d) {
  return { ...d, department_name: deptName(d.department_id), specialty_name: specName(d.specialty_id) };
}
function enrichPatient(p) {
  return { ...p, age: age(p.date_of_birth) };
}
function enrichMedicine(m) {
  return {
    ...m,
    category_name: catName(m.category_id),
    stock_status: m.current_stock < m.reorder_level ? 'Low Stock' : 'Normal',
  };
}
function enrichAppointment(a) {
  const doc = db.doctors.find((d) => d.doctor_id === a.doctor_id);
  return {
    ...a,
    patient_name: patientName(a.patient_id),
    doctor_name: doctorName(a.doctor_id),
    department_id: doc?.department_id,
    department_name: doc ? deptName(doc.department_id) : '',
    specialty_name: doc ? specName(doc.specialty_id) : '',
    status_name: statusName(a.status_id),
  };
}
function enrichVisit(v) {
  const doc = db.doctors.find((d) => d.doctor_id === v.doctor_id);
  return {
    ...v,
    patient_name: patientName(v.patient_id),
    doctor_name: doctorName(v.doctor_id),
    department_name: doc ? deptName(doc.department_id) : '',
  };
}
function enrichAdmission(a) {
  const r = room(a.room_id);
  return {
    ...a,
    patient_name: patientName(a.patient_id),
    doctor_name: doctorName(a.doctor_id),
    room_no: r?.room_no,
    room_type: r?.room_type,
    daily_rate: r?.daily_rate,
  };
}

// ---- Lookups ----
app.get('/api/lookups', (_req, res) => {
  res.json({
    departments: db.departments,
    specialties: db.specialties,
    medicineCategories: db.medicineCategories,
    appointmentStatuses: db.appointmentStatuses,
    rooms: db.rooms,
    bloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    genders: ['Male', 'Female'],
    units: ['Tablet', 'Syrup', 'Injection', 'Capsule', 'Inhaler', 'Sachet'],
  });
});

app.post('/api/reset', (_req, res) => {
  db = createSeed();
  res.json({ ok: true });
});

// ---- Dashboard ----
app.get('/api/dashboard', (_req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const byDept = {};
  for (const a of db.appointments) {
    const doc = db.doctors.find((d) => d.doctor_id === a.doctor_id);
    const name = doc ? deptName(doc.department_id) : 'Unknown';
    byDept[name] = (byDept[name] || 0) + 1;
  }
  const byGender = {};
  for (const p of db.patients) byGender[p.gender] = (byGender[p.gender] || 0) + 1;
  let low = 0;
  let normal = 0;
  for (const m of db.medicines.filter((x) => x.status === 'Active')) {
    if (m.current_stock < m.reorder_level) low++;
    else normal++;
  }
  const byRoomType = {};
  for (const a of db.admissions) {
    const t = room(a.room_id)?.room_type || 'Unknown';
    byRoomType[t] = (byRoomType[t] || 0) + 1;
  }
  const byMonth = {};
  for (const v of db.visits) {
    const label = v.visit_date.slice(0, 7);
    byMonth[label] = (byMonth[label] || 0) + 1;
  }

  res.json({
    kpis: {
      totalPatients: db.patients.length,
      todaysAppointments: db.appointments.filter((a) => a.appointment_date === today).length,
      activeDoctors: db.doctors.filter((d) => d.status === 'Active').length,
      currentAdmissions: db.admissions.filter((a) => a.status === 'Admitted').length,
      lowStockMedicines: low,
    },
    charts: {
      appointmentsByDepartment: Object.entries(byDept).map(([label, value]) => ({ label, value })),
      patientsByGender: Object.entries(byGender).map(([label, value]) => ({ label, value })),
      medicineStockStatus: [
        { label: 'Normal', value: normal },
        { label: 'Low Stock', value: low },
      ],
      admissionsByRoomType: Object.entries(byRoomType).map(([label, value]) => ({ label, value })),
      monthlyVisits: Object.entries(byMonth)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([label, value]) => ({ label, value })),
    },
  });
});

// ---- Patients ----
app.get('/api/patients', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  let list = db.patients.map(enrichPatient);
  if (q) {
    list = list.filter(
      (p) =>
        p.full_name.toLowerCase().includes(q) ||
        p.civil_id.includes(q) ||
        (p.mobile_no || '').includes(q)
    );
  }
  res.json(list);
});

app.get('/api/patients/:id', (req, res) => {
  const p = db.patients.find((x) => x.patient_id === Number(req.params.id));
  if (!p) return res.status(404).json({ error: 'Patient not found' });
  const id = p.patient_id;
  res.json({
    patient: enrichPatient(p),
    appointments: db.appointments.filter((a) => a.patient_id === id).map(enrichAppointment),
    visits: db.visits.filter((v) => v.patient_id === id).map(enrichVisit),
    admissions: db.admissions.filter((a) => a.patient_id === id).map(enrichAdmission),
  });
});

app.post('/api/patients', (req, res) => {
  const body = req.body;
  if (!body.full_name || !body.mobile_no || !body.civil_id) {
    return res.status(400).json({ error: 'Name, mobile, and Civil ID are required' });
  }
  if (db.patients.some((p) => p.civil_id === body.civil_id)) {
    return res.status(400).json({ error: 'Civil ID already exists' });
  }
  db.seq.patient += 1;
  const row = {
    patient_id: db.seq.patient,
    civil_id: body.civil_id,
    full_name: body.full_name,
    gender: body.gender || 'Male',
    date_of_birth: body.date_of_birth,
    mobile_no: body.mobile_no,
    email: body.email || null,
    blood_group: body.blood_group || null,
    address: body.address || null,
    emergency_contact_name: body.emergency_contact_name || null,
    emergency_contact_no: body.emergency_contact_no || null,
    created_at: new Date().toISOString().slice(0, 10),
  };
  db.patients.push(row);
  res.status(201).json(enrichPatient(row));
});

app.put('/api/patients/:id', (req, res) => {
  const idx = db.patients.findIndex((x) => x.patient_id === Number(req.params.id));
  if (idx < 0) return res.status(404).json({ error: 'Patient not found' });
  const body = req.body;
  if (db.patients.some((p) => p.civil_id === body.civil_id && p.patient_id !== Number(req.params.id))) {
    return res.status(400).json({ error: 'Civil ID already exists' });
  }
  db.patients[idx] = { ...db.patients[idx], ...body, patient_id: Number(req.params.id) };
  res.json(enrichPatient(db.patients[idx]));
});

app.delete('/api/patients/:id', (req, res) => {
  const id = Number(req.params.id);
  db.patients = db.patients.filter((p) => p.patient_id !== id);
  res.json({ ok: true });
});

// ---- Doctors ----
app.get('/api/doctors', (_req, res) => res.json(db.doctors.map(enrichDoctor)));

app.post('/api/doctors', (req, res) => {
  const b = req.body;
  if (!b.full_name || !b.department_id || !b.specialty_id) {
    return res.status(400).json({ error: 'Name, department, and specialty are required' });
  }
  db.seq.doctor += 1;
  const row = {
    doctor_id: db.seq.doctor,
    full_name: b.full_name,
    department_id: Number(b.department_id),
    specialty_id: Number(b.specialty_id),
    mobile_no: b.mobile_no || null,
    email: b.email || null,
    consultation_fee: Number(b.consultation_fee || 0),
    status: b.status || 'Active',
  };
  db.doctors.push(row);
  res.status(201).json(enrichDoctor(row));
});

app.put('/api/doctors/:id', (req, res) => {
  const idx = db.doctors.findIndex((x) => x.doctor_id === Number(req.params.id));
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  db.doctors[idx] = {
    ...db.doctors[idx],
    ...req.body,
    doctor_id: Number(req.params.id),
    department_id: Number(req.body.department_id),
    specialty_id: Number(req.body.specialty_id),
    consultation_fee: Number(req.body.consultation_fee),
  };
  res.json(enrichDoctor(db.doctors[idx]));
});

app.delete('/api/doctors/:id', (req, res) => {
  db.doctors = db.doctors.filter((d) => d.doctor_id !== Number(req.params.id));
  res.json({ ok: true });
});

// ---- Medicines ----
app.get('/api/medicines', (req, res) => {
  let list = db.medicines.map(enrichMedicine);
  if (req.query.lowStock === '1') list = list.filter((m) => m.stock_status === 'Low Stock');
  res.json(list);
});

app.post('/api/medicines', (req, res) => {
  const b = req.body;
  if (Number(b.current_stock) < 0) return res.status(400).json({ error: 'Stock cannot be negative' });
  db.seq.medicine += 1;
  const row = {
    medicine_id: db.seq.medicine,
    medicine_name: b.medicine_name,
    category_id: Number(b.category_id),
    unit: b.unit,
    current_stock: Number(b.current_stock),
    reorder_level: Number(b.reorder_level),
    status: b.status || 'Active',
  };
  db.medicines.push(row);
  res.status(201).json(enrichMedicine(row));
});

app.put('/api/medicines/:id', (req, res) => {
  const idx = db.medicines.findIndex((x) => x.medicine_id === Number(req.params.id));
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  if (Number(req.body.current_stock) < 0) return res.status(400).json({ error: 'Stock cannot be negative' });
  db.medicines[idx] = {
    ...db.medicines[idx],
    ...req.body,
    medicine_id: Number(req.params.id),
    category_id: Number(req.body.category_id),
    current_stock: Number(req.body.current_stock),
    reorder_level: Number(req.body.reorder_level),
  };
  res.json(enrichMedicine(db.medicines[idx]));
});

app.delete('/api/medicines/:id', (req, res) => {
  db.medicines = db.medicines.filter((m) => m.medicine_id !== Number(req.params.id));
  res.json({ ok: true });
});

// ---- Appointments ----
app.get('/api/appointments', (_req, res) => {
  res.json(db.appointments.map(enrichAppointment).sort((a, b) => b.appointment_date.localeCompare(a.appointment_date)));
});

app.post('/api/appointments', (req, res) => {
  const b = req.body;
  if (!b.patient_id || !b.doctor_id) return res.status(400).json({ error: 'Patient and doctor are required' });
  const today = new Date().toISOString().slice(0, 10);
  if (b.appointment_date < today) return res.status(400).json({ error: 'Cannot book an appointment in the past' });
  db.seq.appointment += 1;
  const row = {
    appointment_id: db.seq.appointment,
    patient_id: Number(b.patient_id),
    doctor_id: Number(b.doctor_id),
    appointment_date: b.appointment_date,
    appointment_time: b.appointment_time,
    status_id: Number(b.status_id || 1),
    reason_for_visit: b.reason_for_visit || '',
    created_at: today,
  };
  db.appointments.push(row);
  res.status(201).json(enrichAppointment(row));
});

app.put('/api/appointments/:id', (req, res) => {
  const idx = db.appointments.findIndex((x) => x.appointment_id === Number(req.params.id));
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  db.appointments[idx] = {
    ...db.appointments[idx],
    ...req.body,
    appointment_id: Number(req.params.id),
    patient_id: Number(req.body.patient_id),
    doctor_id: Number(req.body.doctor_id),
    status_id: Number(req.body.status_id),
  };
  res.json(enrichAppointment(db.appointments[idx]));
});

app.delete('/api/appointments/:id', (req, res) => {
  db.appointments = db.appointments.filter((a) => a.appointment_id !== Number(req.params.id));
  res.json({ ok: true });
});

// ---- Visits list ----
app.get('/api/visits', (_req, res) => {
  res.json(db.visits.map(enrichVisit).sort((a, b) => b.visit_date.localeCompare(a.visit_date)));
});

// ---- Visit workspace ----
app.get('/api/workspace/:appointmentId', (req, res) => {
  const appointmentId = Number(req.params.appointmentId);
  const appt = db.appointments.find((a) => a.appointment_id === appointmentId);
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });

  let visit = db.visits.find((v) => v.appointment_id === appointmentId);
  if (!visit) {
    db.seq.visit += 1;
    visit = {
      visit_id: db.seq.visit,
      appointment_id: appointmentId,
      patient_id: appt.patient_id,
      doctor_id: appt.doctor_id,
      visit_date: new Date().toISOString().slice(0, 10),
      symptoms: '',
      diagnosis: '',
      notes: '',
      follow_up_date: null,
    };
    db.visits.push(visit);
  }

  let prescription = db.prescriptions.find((p) => p.visit_id === visit.visit_id);
  if (!prescription) {
    db.seq.prescription += 1;
    prescription = {
      prescription_id: db.seq.prescription,
      visit_id: visit.visit_id,
      patient_id: visit.patient_id,
      doctor_id: visit.doctor_id,
      prescription_date: visit.visit_date,
      notes: '',
    };
    db.prescriptions.push(prescription);
  }

  const items = db.prescriptionItems
    .filter((i) => i.prescription_id === prescription.prescription_id)
    .map((i) => ({ ...i, medicine_name: medicineName(i.medicine_id) }));

  const patient = enrichPatient(db.patients.find((p) => p.patient_id === appt.patient_id));
  const doctor = enrichDoctor(db.doctors.find((d) => d.doctor_id === appt.doctor_id));
  const previousVisits = db.visits
    .filter((v) => v.patient_id === appt.patient_id && v.visit_id !== visit.visit_id)
    .map(enrichVisit)
    .sort((a, b) => b.visit_date.localeCompare(a.visit_date));

  res.json({
    appointment: enrichAppointment(appt),
    patient,
    doctor,
    visit,
    prescription,
    items,
    previousVisits,
  });
});

app.put('/api/visits/:id', (req, res) => {
  const idx = db.visits.findIndex((v) => v.visit_id === Number(req.params.id));
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  db.visits[idx] = { ...db.visits[idx], ...req.body, visit_id: Number(req.params.id) };
  const apptIdx = db.appointments.findIndex((a) => a.appointment_id === db.visits[idx].appointment_id);
  if (apptIdx >= 0) db.appointments[apptIdx].status_id = 2; // Completed
  res.json(enrichVisit(db.visits[idx]));
});

app.post('/api/prescriptions/:id/items', (req, res) => {
  const prescriptionId = Number(req.params.id);
  if (!db.prescriptions.some((p) => p.prescription_id === prescriptionId)) {
    return res.status(404).json({ error: 'Prescription not found' });
  }
  db.seq.prescriptionItem += 1;
  const row = {
    prescription_item_id: db.seq.prescriptionItem,
    prescription_id: prescriptionId,
    medicine_id: Number(req.body.medicine_id),
    dosage: req.body.dosage || '',
    frequency: req.body.frequency || '',
    duration_days: Number(req.body.duration_days || 0),
    instructions: req.body.instructions || '',
  };
  db.prescriptionItems.push(row);
  res.status(201).json({ ...row, medicine_name: medicineName(row.medicine_id) });
});

app.delete('/api/prescription-items/:id', (req, res) => {
  db.prescriptionItems = db.prescriptionItems.filter(
    (i) => i.prescription_item_id !== Number(req.params.id)
  );
  res.json({ ok: true });
});

// ---- Admissions ----
app.get('/api/admissions', (_req, res) => {
  res.json(db.admissions.map(enrichAdmission).sort((a, b) => b.admission_date.localeCompare(a.admission_date)));
});

app.post('/api/admissions', (req, res) => {
  const b = req.body;
  const r = room(Number(b.room_id));
  if (!r) return res.status(400).json({ error: 'Room not found' });
  if (r.status === 'Occupied') return res.status(400).json({ error: 'Room is already occupied' });
  if (r.status === 'Maintenance') return res.status(400).json({ error: 'Room is under maintenance' });

  db.seq.admission += 1;
  const row = {
    admission_id: db.seq.admission,
    patient_id: Number(b.patient_id),
    doctor_id: Number(b.doctor_id),
    room_id: Number(b.room_id),
    admission_date: b.admission_date || new Date().toISOString().slice(0, 10),
    discharge_date: null,
    admission_reason: b.admission_reason || '',
    status: 'Admitted',
  };
  db.admissions.push(row);
  r.status = 'Occupied';
  res.status(201).json(enrichAdmission(row));
});

app.put('/api/admissions/:id/discharge', (req, res) => {
  const idx = db.admissions.findIndex((a) => a.admission_id === Number(req.params.id));
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  const dischargeDate = req.body.discharge_date || new Date().toISOString().slice(0, 10);
  if (!dischargeDate) return res.status(400).json({ error: 'Discharge date is required' });
  db.admissions[idx].status = 'Discharged';
  db.admissions[idx].discharge_date = dischargeDate;
  const r = room(db.admissions[idx].room_id);
  if (r) r.status = 'Available';
  res.json(enrichAdmission(db.admissions[idx]));
});

// Static client (production)
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Al Noor Hospital running at http://localhost:${PORT}`);
});
