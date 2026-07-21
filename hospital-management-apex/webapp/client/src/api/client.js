const base = '';

async function request(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

export const api = {
  dashboard: () => request('/api/dashboard'),
  lookups: () => request('/api/lookups'),
  patients: (q) => request(`/api/patients${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  patient: (id) => request(`/api/patients/${id}`),
  createPatient: (body) => request('/api/patients', { method: 'POST', body: JSON.stringify(body) }),
  updatePatient: (id, body) => request(`/api/patients/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deletePatient: (id) => request(`/api/patients/${id}`, { method: 'DELETE' }),
  doctors: () => request('/api/doctors'),
  createDoctor: (body) => request('/api/doctors', { method: 'POST', body: JSON.stringify(body) }),
  updateDoctor: (id, body) => request(`/api/doctors/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteDoctor: (id) => request(`/api/doctors/${id}`, { method: 'DELETE' }),
  medicines: (low) => request(`/api/medicines${low ? '?lowStock=1' : ''}`),
  createMedicine: (body) => request('/api/medicines', { method: 'POST', body: JSON.stringify(body) }),
  updateMedicine: (id, body) => request(`/api/medicines/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteMedicine: (id) => request(`/api/medicines/${id}`, { method: 'DELETE' }),
  appointments: () => request('/api/appointments'),
  createAppointment: (body) => request('/api/appointments', { method: 'POST', body: JSON.stringify(body) }),
  deleteAppointment: (id) => request(`/api/appointments/${id}`, { method: 'DELETE' }),
  visits: () => request('/api/visits'),
  workspace: (id) => request(`/api/workspace/${id}`),
  updateVisit: (id, body) => request(`/api/visits/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  addRxItem: (rxId, body) => request(`/api/prescriptions/${rxId}/items`, { method: 'POST', body: JSON.stringify(body) }),
  deleteRxItem: (id) => request(`/api/prescription-items/${id}`, { method: 'DELETE' }),
  admissions: () => request('/api/admissions'),
  createAdmission: (body) => request('/api/admissions', { method: 'POST', body: JSON.stringify(body) }),
  discharge: (id, date) => request(`/api/admissions/${id}/discharge`, { method: 'PUT', body: JSON.stringify({ discharge_date: date }) }),
};
