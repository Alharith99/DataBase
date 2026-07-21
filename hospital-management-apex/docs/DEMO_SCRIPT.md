# Al Noor Hospital — Demo Script (2–3 minutes)

Use this when presenting the assignment.

---

## 1. Opening (15 sec)

> “This is Al Noor Hospital’s operations system built in Oracle APEX. It covers patients, doctors, appointments, clinical visits, prescriptions, admissions, and a management dashboard.”

Open **Dashboard**. Point at KPIs: Total Patients, Today’s Appointments, Active Doctors, Current Admissions, Low Stock.

Show 2–3 charts briefly.

---

## 2. Master data (20 sec)

Open **Doctors** — show department & specialty lookups.  
Open **Medicines** — show a red/highlighted **Low Stock** row (e.g. Insulin, Folic Acid).

---

## 3. Patient journey (90 sec)

1. **Patients** — search by name or Civil ID; open a patient; note **Age** calculated from DOB.
2. **Appointments** — create or open today’s appointment; show doctor department/specialty after selecting doctor; mention past-date validation.
3. Click **Open Visit Workspace** (link from appointment).
4. Show regions: Patient summary, Appointment, Doctor — all auto-filled.
5. Enter/update Symptoms & Diagnosis.
6. Add 2 prescription medicines with dosage and frequency.
7. Show **Previous Visits** for the same patient only.

---

## 4. Patient profile master-detail (20 sec)

Open **Patient Profile** for one patient.  
Show three child reports: Appointments, Visits, Admissions — filtered to that patient only.

---

## 5. Admissions (20 sec)

Open **Admissions** — admit a patient to an **Available** room.  
Show room becomes **Occupied**.  
Discharge → room becomes **Available** again.

---

## 6. Reports (15 sec)

Open **Appointment Report** — filter by date/department.  
Open **Medicine Stock Report** — show Normal vs Low Stock.

---

## Closing (10 sec)

> “Deliverables include the live APEX app, table relationships, sample data meeting the assignment minima, and the SQL scripts for recreation.”

---

## Tips

- Use seeded patient **Abdullah Al-Maskari** or today’s appointments for a smooth demo.
- Have one low-stock medicine already highlighted before you start.
- Keep the browser zoom at 90–100% so KPI cards stay visible.
