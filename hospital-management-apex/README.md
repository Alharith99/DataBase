# Al Noor Hospital Management System (Oracle APEX)

Internal hospital operations app for **Al Noor Hospital**: patients, doctors, appointments, visits, prescriptions, admissions, and a KPI dashboard.

Built to match the Oracle APEX assignment requirements.

---

## What you get

| Deliverable | Location | Status |
|-------------|----------|--------|
| Database tables + relationships | `sql/01_schema.sql` | Ready |
| Sample data (meets minima) | `sql/02_sample_data.sql` | Ready |
| Views for reports/dashboard | `sql/03_views.sql` | Ready |
| Room status trigger | `sql/04_triggers.sql` | Ready |
| APEX page-by-page build guide | `docs/APEX_BUILD_GUIDE.md` | Ready |
| Demo talking points | `docs/DEMO_SCRIPT.md` | Ready |
| Working APEX app + export | Built in *your* APEX workspace | You create (guided) |

> Oracle APEX applications are built inside an APEX workspace (apex.oracle.com or campus server). This package gives you the full database and exact steps/SQL for every required page. After you build the pages, export the app for submission.

---

## Sample data minima (assignment §12)

| Entity | Required | Seeded |
|--------|----------|--------|
| Departments | ≥ 5 | 7 |
| Doctors | ≥ 10 | 12 |
| Patients | ≥ 20 | 22 |
| Medicines | ≥ 20 | 22 |
| Appointments | ≥ 30 | 33 |
| Visits with prescriptions | ≥ 10 | 12 visits / 10 prescriptions |

---

## See it in your browser now (local demo)

I cannot log into your Oracle APEX account, so a **local web app** is included with the same screens and data:

```bash
cd hospital-management-apex/webapp
npm run install:all
npm run dev
```

Open **http://localhost:5175**

Details: [webapp/README.md](webapp/README.md)

> For the **university APEX assignment**, you still build pages in Oracle APEX using the SQL + guide below.

---

## Quick start (Oracle APEX submission)

### 1. Create a free APEX workspace (if needed)

Go to [https://apex.oracle.com](https://apex.oracle.com) → **Get Started for Free** → create workspace.

### 2. Install the database

In **SQL Workshop → SQL Scripts**, run in order:

1. `sql/01_schema.sql`
2. `sql/03_views.sql`
3. `sql/04_triggers.sql`
4. `sql/02_sample_data.sql`

Or paste each file into **SQL Commands** and Run.

### 3. Build the APEX application

Follow **[docs/APEX_BUILD_GUIDE.md](docs/APEX_BUILD_GUIDE.md)** page by page:

1. Home Dashboard (KPIs + charts)
2. Patient CRUD
3. Doctor CRUD
4. Medicine CRUD (+ low stock highlight)
5. Appointment booking
6. Patient profile (master-detail × 3)
7. Visit + Prescription (3-level)
8. Clinical Visit Workspace
9. Admissions (+ room status)
10. Four operational reports

### 4. Export for submission

**App Builder → Export** the application, then zip with the `sql/` folder.

---

## Required screens (map)

```
Dashboard
  ├─ Patients (CRUD)
  ├─ Doctors (CRUD)
  ├─ Medicines (CRUD + Low Stock)
  ├─ Appointments (book + list → Visit Workspace)
  ├─ Patient Profile (master: patient / detail: appts, visits, admissions)
  ├─ Visits & Prescriptions (visit → Rx → items)
  ├─ Clinical Visit Workspace (complex multi-region)
  ├─ Admissions
  └─ Reports
        ├─ Appointments
        ├─ Patient Visits
        ├─ Medicine Stock
        └─ Admissions
```

---

## Business flow (assignment §11)

1. Admin seeds departments & specialties (already in sample data)
2. Admin adds doctors & medicines
3. Receptionist registers patient
4. Receptionist books appointment
5. Doctor opens appointment → Clinical Visit Workspace
6. Doctor records symptoms/diagnosis and adds prescription items
7. Receptionist admits patient if needed (room becomes Occupied)
8. On discharge, room becomes Available
9. Management views dashboard & reports

---

## Folder structure

```
hospital-management-apex/
├── README.md
├── sql/
│   ├── 00_drop_tables.sql
│   ├── 01_schema.sql
│   ├── 02_sample_data.sql
│   ├── 03_views.sql
│   ├── 04_triggers.sql
│   └── install_all.sql
├── docs/
│   ├── APEX_BUILD_GUIDE.md
│   └── DEMO_SCRIPT.md
└── apex/
    └── (place your exported .sql app file here after building)
```

---

## Need help?

If you have APEX workspace access and want me to walk you through building each page live (or check screenshots), say so and we can go page by page.
