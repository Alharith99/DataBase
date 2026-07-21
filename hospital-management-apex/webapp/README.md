# Al Noor Hospital — Local Web App

Runnable browser demo of the Hospital Management System (same screens and sample data as the APEX assignment).

> This is **not** Oracle APEX. Use it to learn and demo the flow. For university submission you still need the APEX app built from `sql/` + `docs/APEX_BUILD_GUIDE.md`.

## Run it

```bash
cd hospital-management-apex/webapp
npm run install:all
npm run dev
```

Then open:

- **App UI:** http://localhost:5175  
- **API:** http://localhost:5050  

## What you can do

| Screen | Features |
|--------|----------|
| Dashboard | KPIs + charts |
| Patients | CRUD, search, age, profile with 3 child histories |
| Doctors | CRUD + department/specialty lookups |
| Medicines | CRUD + low-stock highlight |
| Appointments | Book (no past dates) + Open Visit workspace |
| Visit Workspace | Patient/doctor/appointment summary, diagnosis, prescription items |
| Admissions | Admit / discharge + room status |
| Reports | Appointments, visits, stock, admissions |

## Try this flow

1. Open **Dashboard**
2. **Appointments** → pick today’s row → **Open Visit**
3. Enter diagnosis → add a medicine → **Save Visit**
4. **Admissions** → admit a patient to an available room
5. Check **Medicines** → Low Stock Only
