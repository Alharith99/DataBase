import { NavLink, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientProfile from './pages/PatientProfile';
import Doctors from './pages/Doctors';
import Medicines from './pages/Medicines';
import Appointments from './pages/Appointments';
import VisitWorkspace from './pages/VisitWorkspace';
import Admissions from './pages/Admissions';
import Reports from './pages/Reports';

const links = [
  ['/', 'Dashboard'],
  ['/patients', 'Patients'],
  ['/doctors', 'Doctors'],
  ['/medicines', 'Medicines'],
  ['/appointments', 'Appointments'],
  ['/admissions', 'Admissions'],
  ['/reports', 'Reports'],
];

export default function App() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <p className="brand-mark">Al Noor</p>
          <p className="brand-sub">Hospital Operations</p>
        </div>
        <nav>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <p className="sidebar-note">Local demo of the APEX assignment screens</p>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientProfile />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/workspace/:appointmentId" element={<VisitWorkspace />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}
