# Al Noor Hospital — Oracle APEX Build Guide

Follow these steps in **apex.oracle.com** (or your campus APEX workspace) after running the SQL scripts.

---

## Part A — Database setup (15 minutes)

1. Sign in to your APEX workspace.
2. Open **SQL Workshop → SQL Scripts**.
3. Upload and run in this order (or paste contents into **SQL Commands**):
   1. `sql/00_drop_tables.sql` (only if re-installing)
   2. `sql/01_schema.sql`
   3. `sql/03_views.sql`
   4. `sql/04_triggers.sql`
   5. `sql/02_sample_data.sql`
4. Confirm counts (SQL Commands):

```sql
SELECT 'patients' e, COUNT(*) c FROM patients
UNION ALL SELECT 'doctors', COUNT(*) FROM doctors
UNION ALL SELECT 'medicines', COUNT(*) FROM medicines
UNION ALL SELECT 'appointments', COUNT(*) FROM appointments
UNION ALL SELECT 'visits', COUNT(*) FROM patient_visits;
```

Expected: patients ≥ 20, doctors ≥ 10, medicines ≥ 20, appointments ≥ 30, visits ≥ 10.

---

## Part B — Create the application

1. **App Builder → Create → New Application**
2. Name: `Al Noor Hospital Management`
3. Features: Navigation Menu, add blank home page
4. Create Application

Rename Home to **Dashboard** (Page 1).

Create a **Navigation Menu** with entries for every page below.

---

## Part C — Shared Lists of Values (LOVs)

Create these Shared Components → Lists of Values:

| LOV Name | Type | SQL |
|----------|------|-----|
| LOV_DEPARTMENTS | Dynamic | `SELECT department_name d, department_id r FROM departments WHERE status='Active' ORDER BY 1` |
| LOV_SPECIALTIES | Dynamic | `SELECT specialty_name d, specialty_id r FROM doctor_specialties WHERE status='Active' ORDER BY 1` |
| LOV_MED_CATEGORIES | Dynamic | `SELECT category_name d, category_id r FROM medicine_categories WHERE status='Active' ORDER BY 1` |
| LOV_APPT_STATUS | Dynamic | `SELECT status_name d, status_id r FROM appointment_statuses ORDER BY status_id` |
| LOV_PATIENTS | Dynamic | `SELECT full_name \|\| ' (' \|\| civil_id \|\| ')' d, patient_id r FROM patients ORDER BY 1` |
| LOV_DOCTORS | Dynamic | `SELECT full_name d, doctor_id r FROM doctors WHERE status='Active' ORDER BY 1` |
| LOV_MEDICINES | Dynamic | `SELECT medicine_name d, medicine_id r FROM medicines WHERE status='Active' ORDER BY 1` |
| LOV_ROOMS_AVAILABLE | Dynamic | `SELECT room_no \|\| ' - ' \|\| room_type d, room_id r FROM rooms WHERE status='Available' ORDER BY 1` |
| LOV_ROOMS_ALL | Dynamic | `SELECT room_no \|\| ' - ' \|\| room_type d, room_id r FROM rooms ORDER BY 1` |
| LOV_GENDER | Static | Male / Female |
| LOV_BLOOD | Static | A+, A-, B+, B-, O+, O-, AB+, AB- |
| LOV_YES_STATUS | Static | Active / Inactive |
| LOV_ROOM_TYPE | Static | General / Private / ICU |
| LOV_ROOM_STATUS | Static | Available / Occupied / Maintenance |
| LOV_ADM_STATUS | Static | Admitted / Discharged |
| LOV_MED_UNIT | Static | Tablet / Syrup / Injection / Capsule / Inhaler / Sachet |

Also create lookup CRUD pages (optional but useful) for:
- Departments, Doctor Specialties, Medicine Categories, Rooms

Use **Create Page → Report and Form** for each.

---

## Page 1 — Home Dashboard

### KPI Cards (5 regions)

Create 5 **Cards** or **Value Attribute Pairs** / **Classic Report** single-value regions:

**Total Patients**
```sql
SELECT COUNT(*) AS value FROM patients
```

**Today's Appointments**
```sql
SELECT COUNT(*) AS value FROM appointments
WHERE appointment_date = TRUNC(SYSDATE)
```

**Active Doctors**
```sql
SELECT COUNT(*) AS value FROM doctors WHERE status = 'Active'
```

**Current Admissions**
```sql
SELECT COUNT(*) AS value FROM admissions WHERE status = 'Admitted'
```

**Low Stock Medicines**
```sql
SELECT COUNT(*) AS value FROM medicines
WHERE current_stock < reorder_level AND status = 'Active'
```

### Charts (create at least 3; assignment lists 5)

**Chart — Appointments by Department** (Bar)
```sql
SELECT dep.department_name AS label, COUNT(*) AS value
FROM appointments a
JOIN doctors d ON d.doctor_id = a.doctor_id
JOIN departments dep ON dep.department_id = d.department_id
GROUP BY dep.department_name
ORDER BY value DESC
```

**Chart — Patients by Gender** (Pie / Donut)
```sql
SELECT gender AS label, COUNT(*) AS value
FROM patients
GROUP BY gender
```

**Chart — Medicine Stock Status** (Pie)
```sql
SELECT
  CASE WHEN current_stock < reorder_level THEN 'Low Stock' ELSE 'Normal' END AS label,
  COUNT(*) AS value
FROM medicines
WHERE status = 'Active'
GROUP BY CASE WHEN current_stock < reorder_level THEN 'Low Stock' ELSE 'Normal' END
```

**Chart — Admissions by Room Type** (Bar)
```sql
SELECT r.room_type AS label, COUNT(*) AS value
FROM admissions a
JOIN rooms r ON r.room_id = a.room_id
GROUP BY r.room_type
```

**Chart — Monthly Patient Visits** (Line)
```sql
SELECT TO_CHAR(visit_date, 'YYYY-MM') AS label, COUNT(*) AS value
FROM patient_visits
GROUP BY TO_CHAR(visit_date, 'YYYY-MM')
ORDER BY label
```

---

## Page 2 — Patient Management CRUD

1. **Create Page → Report and Form** on table `PATIENTS`
2. Interactive Report columns: Civil ID, Full Name, Gender, Mobile, Blood Group, Age (add)
3. Add age column to IR with SQL:

```sql
SELECT p.*,
       TRUNC(MONTHS_BETWEEN(SYSDATE, p.date_of_birth) / 12) AS age
FROM patients p
```

4. Form validations:
   - **Civil ID unique**: Function Body / SQL Exists

```sql
SELECT 1 FROM patients
WHERE civil_id = :P2_CIVIL_ID
  AND patient_id <> NVL(:P2_PATIENT_ID, -1)
```
Error if rows found: `Civil ID already exists.`

   - **Mobile not empty**: Item Not Null on `MOBILE_NO`
   - **Full name not empty**: Item Not Null on `FULL_NAME`

5. Enable search on Name, Civil ID, Mobile (IR filters / search).

6. Display-only computed Age on form:

```sql
TRUNC(MONTHS_BETWEEN(SYSDATE, :P2_DATE_OF_BIRTH) / 12)
```

Use LOVs for Gender and Blood Group.

---

## Page 3 — Doctor Management CRUD

1. **Report and Form** on `DOCTORS`
2. Report source use `v_doctors` so Department Name and Specialty Name show
3. Form items:
   - Department → Select List `LOV_DEPARTMENTS` (required)
   - Specialty → Select List `LOV_SPECIALTIES` (required)
   - Status → Select List `LOV_YES_STATUS`
4. Validations: Department and Specialty Not Null

---

## Page 4 — Medicine Management CRUD

1. **Report and Form** on `MEDICINES` (or `v_medicines`)
2. Category → `LOV_MED_CATEGORIES`
3. Unit → `LOV_MED_UNIT`
4. **Highlight low stock** on Interactive Report:
   - Actions → Format → Highlight
   - When `CURRENT_STOCK` < `REORDER_LEVEL` → red/orange background
5. Extra page or region: **Low Stock Report**

```sql
SELECT * FROM v_medicines WHERE stock_status = 'Low Stock'
```

6. Validation: Current stock ≥ 0 (database constraint already enforces)

---

## Page 5 — Appointment Booking

1. Create **Interactive Report** on `v_appointments` + **Form** on `APPOINTMENTS`
2. Form items:
   - Patient → Popup LOV / Select List `LOV_PATIENTS` (required)
   - Doctor → Select List `LOV_DOCTORS` (required)
   - Date → Date Picker (required)
   - Time → Text or Select List (e.g. 08:00–17:00)
   - Status → `LOV_APPT_STATUS` (default Scheduled = 1)
   - Reason → Textarea
3. **Display region** for doctor details (Dynamic Action):
   - When Doctor changes → Set Value / Refresh region:

```sql
SELECT d.full_name, dep.department_name, s.specialty_name, d.consultation_fee
FROM doctors d
JOIN departments dep ON dep.department_id = d.department_id
JOIN doctor_specialties s ON s.specialty_id = d.specialty_id
WHERE d.doctor_id = :P5_DOCTOR_ID
```

4. Validations:
   - Patient and Doctor Not Null
   - Appointment not in the past:

```sql
-- Validation type: Function Body returning Boolean
BEGIN
  IF :P5_APPOINTMENT_DATE < TRUNC(SYSDATE) THEN
    RETURN FALSE;
  END IF;
  RETURN TRUE;
END;
```
Error: `Cannot book an appointment in the past.`

---

## Page 6 — Patient Profile (Master + 3 Details)

1. Create page with **Form** (or Display Only) on `PATIENTS` — master
2. Pass `PATIENT_ID` from Patients IR link
3. Three Interactive Report regions filtered by master PK:

**Appointments**
```sql
SELECT * FROM v_appointments
WHERE patient_id = :P6_PATIENT_ID
ORDER BY appointment_date DESC
```

**Visits**
```sql
SELECT * FROM v_patient_visits
WHERE patient_id = :P6_PATIENT_ID
ORDER BY visit_date DESC
```

**Admissions**
```sql
SELECT * FROM v_admissions
WHERE patient_id = :P6_PATIENT_ID
ORDER BY admission_date DESC
```

---

## Page 7 — Visit & Prescription (3-level master-detail)

Recommended approach:

1. **Page 7a**: Interactive Report of `v_patient_visits` with link to Visit ID
2. **Page 7b**: Form on `PATIENT_VISITS` (master)
3. Region: Form / IR on `PRESCRIPTIONS` where `visit_id = :P7_VISIT_ID`
   - One prescription per visit (unique constraint exists)
4. Child Interactive Grid on `PRESCRIPTION_ITEMS` where `prescription_id = :P7_PRESCRIPTION_ID`
   - Medicine → `LOV_MEDICINES`
   - Dosage, Frequency, Duration Days, Instructions

Create Process: if no prescription exists for visit, insert one on save, then allow items.

**Show names:**
```sql
SELECT p.full_name AS patient_name, d.full_name AS doctor_name
FROM patient_visits v
JOIN patients p ON p.patient_id = v.patient_id
JOIN doctors d ON d.doctor_id = v.doctor_id
WHERE v.visit_id = :P7_VISIT_ID
```

---

## Page 8 — Clinical Visit Workspace (complex screen)

Create a blank page. Opened from Appointments IR with `APPOINTMENT_ID`.

### Hidden items
`P8_APPOINTMENT_ID`, `P8_PATIENT_ID`, `P8_DOCTOR_ID`, `P8_VISIT_ID`, `P8_PRESCRIPTION_ID`

### Before Header process — load IDs
```sql
SELECT patient_id, doctor_id
INTO :P8_PATIENT_ID, :P8_DOCTOR_ID
FROM appointments
WHERE appointment_id = :P8_APPOINTMENT_ID;
```

### Region A — Patient Summary (Classic Report / Display)
```sql
SELECT full_name, civil_id,
       TRUNC(MONTHS_BETWEEN(SYSDATE, date_of_birth)/12) AS age,
       gender, blood_group, mobile_no
FROM patients WHERE patient_id = :P8_PATIENT_ID
```

### Region B — Appointment Summary
```sql
SELECT appointment_date, appointment_time, status_name, reason_for_visit
FROM v_appointments WHERE appointment_id = :P8_APPOINTMENT_ID
```

### Region C — Doctor Summary
```sql
SELECT full_name, department_name, specialty_name
FROM v_doctors WHERE doctor_id = :P8_DOCTOR_ID
```

### Region D — Visit Details Form
- On first open: if no visit for this appointment, create one (Process):

```sql
BEGIN
  SELECT visit_id INTO :P8_VISIT_ID
  FROM patient_visits WHERE appointment_id = :P8_APPOINTMENT_ID;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    INSERT INTO patient_visits (appointment_id, patient_id, doctor_id, visit_date)
    VALUES (:P8_APPOINTMENT_ID, :P8_PATIENT_ID, :P8_DOCTOR_ID, SYSDATE)
    RETURNING visit_id INTO :P8_VISIT_ID;
END;
```

- Form fields: Symptoms, Diagnosis, Notes, Follow-up Date bound to `PATIENT_VISITS`

### Region E — Prescription
Same as Page 7 child: ensure prescription for visit, Interactive Grid for items.

### Region F — Previous Visits
```sql
SELECT visit_date, symptoms, diagnosis, follow_up_date
FROM patient_visits
WHERE patient_id = :P8_PATIENT_ID
  AND visit_id <> NVL(:P8_VISIT_ID, -1)
ORDER BY visit_date DESC
```

### Link from Appointments
Add column link: `f?p=&APP_ID.:8:&SESSION.::&DEBUG.:RP,8:P8_APPOINTMENT_ID:#APPOINTMENT_ID#`

After completing visit, optionally set appointment status to Completed.

---

## Page 9 — Patient Admission

1. Form on `ADMISSIONS` + IR of current admissions (`status = 'Admitted'`)
2. Lookups:
   - Patient → `LOV_PATIENTS`
   - Doctor → `LOV_DOCTORS`
   - Room → `LOV_ROOMS_AVAILABLE` (only Available)
3. Default Status = `Admitted`
4. Validation — room not occupied:

```sql
SELECT 1 FROM rooms
WHERE room_id = :P9_ROOM_ID AND status = 'Occupied'
```
Error if found: `Room is already occupied.`

5. Room status updates automatically via `trg_admission_room_status`
6. On discharge: set Status = Discharged + Discharge Date (Not Null validation when Discharged)

```sql
-- Function Body returning Boolean
BEGIN
  IF :P9_STATUS = 'Discharged' AND :P9_DISCHARGE_DATE IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN TRUE;
END;
```

---

## Reports pages

### Report 1 — Appointment Report
Source: `v_appointments`  
Page items for filters: Date From, Date To, Department, Doctor, Status  
Where clause:

```sql
WHERE appointment_date BETWEEN NVL(:P10_FROM, DATE '1900-01-01')
                           AND NVL(:P10_TO, DATE '2999-12-31')
  AND (:P10_DEPT IS NULL OR department_id = :P10_DEPT)
  AND (:P10_DOCTOR IS NULL OR doctor_id = :P10_DOCTOR)
  AND (:P10_STATUS IS NULL OR status_id = :P10_STATUS)
```

### Report 2 — Patient Visit Report
Source: `v_patient_visits` with filters Doctor, Department, Visit Date

### Report 3 — Medicine Stock Report
Source: `v_medicines` — include `stock_status`  
Highlight Low Stock rows

### Report 4 — Admission Report
Source: `v_admissions`

---

## Part D — Navigation & polish

1. Wire Navigation Menu to all pages
2. Set Dashboard as Home
3. Theme: choose a clean theme (e.g. Vita)
4. Application alias: `ALNOOR_HMS`

---

## Part E — Export deliverables

1. **App Builder → Export / Import → Export** → download `.sql` app export
2. Zip together:
   - Exported APEX application
   - Entire `sql/` folder
   - This guide / README
3. Prepare a short demo script (see README)

---

## Business rules checklist

| # | Rule | How enforced |
|---|------|--------------|
| 1 | Unique Civil ID | Unique constraint + APEX validation |
| 2 | Name & mobile mandatory | NOT NULL + validations |
| 3 | Doctor has department | NOT NULL FK |
| 4 | Doctor has specialty | NOT NULL FK |
| 5 | No past appointments | APEX validation |
| 6 | Appointment needs patient & doctor | NOT NULL + validations |
| 7 | Visit linked to appointment | FK + unique |
| 8 | Rx item needs prescription | FK |
| 9 | Stock not negative | CHECK constraint |
| 10 | No occupied room assign | LOV + validation |
| 11 | Discharged needs discharge date | CHECK + validation |
| 12 | Low stock visible | Highlight + stock_status |
