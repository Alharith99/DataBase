#!/usr/bin/env python3
"""Generate beginner Oracle APEX Hospital Management System guide PDF."""

from fpdf import FPDF
from pathlib import Path


class GuidePDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "I", 9)
        self.set_text_color(90, 90, 90)
        self.cell(0, 8, "Al Noor Hospital - Oracle APEX Beginner Guide", align="L")
        self.cell(0, 8, f"Page {self.page_no()}", align="R", new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(180, 180, 180)
        self.line(15, 16, 195, 16)
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, "For trainee use - follow every step in order", align="C")

    def h1(self, text):
        self.set_font("Helvetica", "B", 18)
        self.set_text_color(15, 107, 92)
        self.multi_cell(0, 10, text)
        self.ln(2)

    def h2(self, text):
        self.ln(3)
        self.set_font("Helvetica", "B", 13)
        self.set_text_color(26, 46, 40)
        self.multi_cell(0, 8, text)
        self.ln(1)

    def h3(self, text):
        self.ln(2)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(15, 107, 92)
        self.multi_cell(0, 7, text)
        self.ln(1)

    def body(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(30, 30, 30)
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def bullet(self, text):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(30, 30, 30)
        self.multi_cell(0, 5.5, f"- {text}")

    def step(self, num, text):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(30, 30, 30)
        self.multi_cell(0, 5.5, f"Step {num}: {text}")
        self.ln(0.5)

    def tip(self, text):
        self.set_fill_color(232, 243, 239)
        self.set_font("Helvetica", "I", 9)
        self.set_text_color(15, 80, 70)
        self.multi_cell(0, 5.5, f"TIP: {text}", fill=True)
        self.ln(2)

    def warn(self, text):
        self.set_fill_color(253, 232, 216)
        self.set_font("Helvetica", "I", 9)
        self.set_text_color(140, 60, 20)
        self.multi_cell(0, 5.5, f"IMPORTANT: {text}", fill=True)
        self.ln(2)

    def code(self, text):
        self.set_font("Courier", "", 8)
        self.set_text_color(20, 20, 20)
        self.set_fill_color(245, 245, 245)
        self.multi_cell(0, 4.2, text, fill=True)
        self.ln(2)


def build():
    pdf = GuidePDF()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.set_margins(15, 18, 15)

    # Cover
    pdf.add_page()
    pdf.ln(30)
    pdf.set_font("Helvetica", "B", 26)
    pdf.set_text_color(15, 107, 92)
    pdf.multi_cell(0, 12, "Al Noor Hospital\nManagement System", align="C")
    pdf.ln(6)
    pdf.set_font("Helvetica", "", 14)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 8, "Oracle APEX Step-by-Step Guide\nfor Beginner Trainees", align="C")
    pdf.ln(12)
    pdf.set_font("Helvetica", "", 11)
    pdf.multi_cell(
        0,
        6,
        "This guide shows you exactly what to click in Oracle APEX.\n"
        "Follow the steps in order. Do not skip any section.\n\n"
        "You need:\n"
        "1. An Oracle APEX account (apex.oracle.com)\n"
        "2. The SQL file: 99_complete_script.sql\n"
        "3. About 3 to 5 hours of focused work",
        align="C",
    )
    pdf.ln(20)
    pdf.set_font("Helvetica", "I", 10)
    pdf.set_text_color(100, 100, 100)
    pdf.multi_cell(0, 6, "Assignment: Build a Hospital Operations System using Oracle APEX", align="C")

    # Chapter 1
    pdf.add_page()
    pdf.h1("Chapter 1 - Create Your APEX Workspace")
    pdf.body(
        "A workspace is your private area in Oracle APEX where your tables and "
        "application will live."
    )
    pdf.step(1, "Open your browser and go to: https://apex.oracle.com")
    pdf.step(2, "Click Get Started for Free (or Sign In if you already have an account).")
    pdf.step(3, "Enter your email and complete verification.")
    pdf.step(4, "When asked for Workspace Name, type: ALNOOR_HMS")
    pdf.step(5, "Create a Workspace Username and Password. Write them down.")
    pdf.step(6, "Wait for the email that says your workspace is ready.")
    pdf.step(7, "Sign in with Workspace = ALNOOR_HMS, your username, and password.")
    pdf.tip("After login you should see three big areas: App Builder, SQL Workshop, Team Development.")

    # Chapter 2
    pdf.h1("Chapter 2 - Load the Database (SQL)")
    pdf.body(
        "Before building screens, you must create tables and sample data. "
        "Use the file 99_complete_script.sql from your project folder:\n"
        "hospital-management-apex/sql/99_complete_script.sql"
    )
    pdf.step(1, "In APEX home, click SQL Workshop.")
    pdf.step(2, "Click SQL Scripts.")
    pdf.step(3, "Click Upload.")
    pdf.step(4, "Choose the file 99_complete_script.sql from your computer.")
    pdf.step(5, "Click Upload (or Create).")
    pdf.step(6, "Click the script name, then click Run.")
    pdf.step(7, "Click Run Now / Submit and wait until it finishes.")
    pdf.warn(
        "If your SQL Scripts upload fails because the file is long, open SQL Workshop > "
        "SQL Commands instead. Copy-paste the file in parts: first schema tables, then "
        "views, then triggers, then sample data. Or paste the full file if it fits."
    )
    pdf.h3("Check that data loaded")
    pdf.step(8, "Go to SQL Workshop > SQL Commands.")
    pdf.step(9, "Paste this and click Run:")
    pdf.code(
        "SELECT 'patients' e, COUNT(*) c FROM patients\n"
        "UNION ALL SELECT 'doctors', COUNT(*) FROM doctors\n"
        "UNION ALL SELECT 'medicines', COUNT(*) FROM medicines\n"
        "UNION ALL SELECT 'appointments', COUNT(*) FROM appointments\n"
        "UNION ALL SELECT 'visits', COUNT(*) FROM patient_visits;"
    )
    pdf.body(
        "Expected results (approximately):\n"
        "patients 22 | doctors 12 | medicines 22 | appointments 33 | visits 12"
    )
    pdf.tip("If counts are zero, the script did not run correctly. Run it again.")

    # Chapter 3
    pdf.add_page()
    pdf.h1("Chapter 3 - Create the Application")
    pdf.step(1, "Click App Builder (top menu).")
    pdf.step(2, "Click Create.")
    pdf.step(3, "Choose New Application.")
    pdf.step(4, "Application Name: Al Noor Hospital Management")
    pdf.step(5, "Keep the default Home page.")
    pdf.step(6, "Click Create Application.")
    pdf.step(7, "You will see your app. Click its name to open it.")
    pdf.body(
        "You now have an empty app with a Home page. Next we rename Home to Dashboard "
        "and add more pages one by one."
    )
    pdf.h3("Rename Home to Dashboard")
    pdf.step(8, "Click page 1 (Home).")
    pdf.step(9, "In Page Designer, find Page Name / Title on the left (or page properties).")
    pdf.step(10, "Change Name and Title to: Dashboard")
    pdf.step(11, "Click Save (top right).")

    # Chapter 4 LOVs
    pdf.h1("Chapter 4 - Create Shared Lists of Values (LOVs)")
    pdf.body(
        "LOVs are dropdown lists. Create them once, then reuse on forms. "
        "Path: App Builder > your app > Shared Components > Lists of Values > Create"
    )
    pdf.h3("How to create ONE dynamic LOV (example: Departments)")
    pdf.step(1, "Open Shared Components > Lists of Values.")
    pdf.step(2, "Click Create > From Scratch > Next.")
    pdf.step(3, "Name: LOV_DEPARTMENTS")
    pdf.step(4, "Type: Dynamic")
    pdf.step(5, "Paste this SQL:")
    pdf.code(
        "SELECT department_name d, department_id r\n"
        "FROM departments\n"
        "WHERE status = 'Active'\n"
        "ORDER BY 1"
    )
    pdf.step(6, "Click Create List of Values.")
    pdf.body("Repeat the same method for these LOVs:")
    pdf.bullet("LOV_SPECIALTIES - specialty_name / specialty_id from doctor_specialties")
    pdf.bullet("LOV_MED_CATEGORIES - category_name / category_id from medicine_categories")
    pdf.bullet("LOV_APPT_STATUS - status_name / status_id from appointment_statuses")
    pdf.bullet("LOV_PATIENTS - full_name || ' (' || civil_id || ')' / patient_id from patients")
    pdf.bullet("LOV_DOCTORS - full_name / doctor_id from doctors WHERE status='Active'")
    pdf.bullet("LOV_MEDICINES - medicine_name / medicine_id from medicines WHERE status='Active'")
    pdf.bullet(
        "LOV_ROOMS_AVAILABLE - room_no || ' - ' || room_type / room_id from rooms "
        "WHERE status='Available'"
    )
    pdf.h3("Static LOVs (no SQL)")
    pdf.body(
        "Create From Scratch > Static. Add display/return values:\n"
        "LOV_GENDER: Male, Female\n"
        "LOV_BLOOD: A+, A-, B+, B-, O+, O-, AB+, AB-\n"
        "LOV_YES_STATUS: Active, Inactive\n"
        "LOV_ADM_STATUS: Admitted, Discharged\n"
        "LOV_MED_UNIT: Tablet, Syrup, Injection, Capsule, Inhaler, Sachet"
    )
    pdf.tip("d = what the user sees, r = the ID stored in the table.")

    # Chapter 5 Patients
    pdf.add_page()
    pdf.h1("Chapter 5 - Page: Patients (CRUD)  [EASIEST]")
    pdf.body("This creates a list page and a form page automatically.")
    pdf.step(1, "Inside your app, click Create Page.")
    pdf.step(2, "Choose Report.")
    pdf.step(3, "Choose Report with Form (or Interactive Report + Form).")
    pdf.step(4, "Table / View: PATIENTS")
    pdf.step(5, "Primary Key: PATIENT_ID")
    pdf.step(6, "Finish the wizard (Next, Next, Create).")
    pdf.step(7, "Click Save and Run Page (play button) to test.")
    pdf.body("You should see sample patients. Try Create, Edit, Delete.")

    pdf.h3("Add Age to the report")
    pdf.step(8, "Open the Patients report page in Page Designer.")
    pdf.step(9, "Select the Interactive Report region > Source.")
    pdf.step(10, "Replace the query with:")
    pdf.code(
        "SELECT p.*,\n"
        "  TRUNC(MONTHS_BETWEEN(SYSDATE, p.date_of_birth) / 12) AS age\n"
        "FROM patients p"
    )
    pdf.step(11, "Save and Run. Age column should appear (enable it in Actions > Columns if needed).")

    pdf.h3("Form validations (Civil ID unique + mobile required)")
    pdf.step(12, "Open the Patient Form page.")
    pdf.step(13, "On the left, open Validations > Create Validation.")
    pdf.step(14, "Validation type: Rows returned / No Rows Returned (or Function Body).")
    pdf.body("For unique Civil ID, use SQL that finds duplicates:")
    pdf.code(
        "SELECT 1 FROM patients\n"
        "WHERE civil_id = :PXX_CIVIL_ID\n"
        "  AND patient_id <> NVL(:PXX_PATIENT_ID, -1)"
    )
    pdf.body(
        "Replace PXX with your real page item prefix (example: P3_CIVIL_ID). "
        "Error message: Civil ID already exists."
    )
    pdf.step(15, "Add Not Null validations for FULL_NAME and MOBILE_NO.")
    pdf.step(16, "Set GENDER item to use LOV_GENDER. Set BLOOD_GROUP to LOV_BLOOD.")
    pdf.tip("To find item names, click an item in Page Designer and read its Name property.")

    # Doctors Medicines
    pdf.h1("Chapter 6 - Doctors and Medicines CRUD")
    pdf.h3("Doctors")
    pdf.step(1, "Create Page > Report with Form > table DOCTORS.")
    pdf.step(2, "On the form: set DEPARTMENT_ID to Select List = LOV_DEPARTMENTS (required).")
    pdf.step(3, "Set SPECIALTY_ID to Select List = LOV_SPECIALTIES (required).")
    pdf.step(4, "Set STATUS to Select List = LOV_YES_STATUS.")
    pdf.body(
        "Optional: change report source to view V_DOCTORS so department and specialty "
        "names show instead of IDs."
    )
    pdf.h3("Medicines")
    pdf.step(5, "Create Page > Report with Form > table MEDICINES.")
    pdf.step(6, "Form: CATEGORY_ID = LOV_MED_CATEGORIES, UNIT = LOV_MED_UNIT.")
    pdf.step(7, "On the Interactive Report: Actions > Format > Highlight.")
    pdf.step(8, "Rule: highlight row when CURRENT_STOCK < REORDER_LEVEL (orange/red).")
    pdf.step(9, "Optional: create another report page for low stock using:")
    pdf.code("SELECT * FROM v_medicines WHERE stock_status = 'Low Stock'")

    # Appointments
    pdf.add_page()
    pdf.h1("Chapter 7 - Appointments Booking Page")
    pdf.step(1, "Create Page > Report with Form on table APPOINTMENTS.")
    pdf.step(2, "Better report source (shows names):")
    pdf.code("SELECT * FROM v_appointments ORDER BY appointment_date DESC")
    pdf.step(3, "On the form set lookups:")
    pdf.bullet("PATIENT_ID -> LOV_PATIENTS (required)")
    pdf.bullet("DOCTOR_ID -> LOV_DOCTORS (required)")
    pdf.bullet("STATUS_ID -> LOV_APPT_STATUS (default Scheduled)")
    pdf.step(4, "APPOINTMENT_DATE = Date Picker. APPOINTMENT_TIME = text or select list.")
    pdf.h3("Validation: no past dates")
    pdf.step(5, "Create Validation > Function Body returning Boolean:")
    pdf.code(
        "BEGIN\n"
        "  IF :PXX_APPOINTMENT_DATE < TRUNC(SYSDATE) THEN\n"
        "    RETURN FALSE;\n"
        "  END IF;\n"
        "  RETURN TRUE;\n"
        "END;"
    )
    pdf.body("Error text: Cannot book an appointment in the past.")
    pdf.h3("Show doctor department after selecting doctor")
    pdf.step(6, "Add a Display Only region or items for department/specialty.")
    pdf.step(7, "Create Dynamic Action: When DOCTOR_ID changes > Refresh / Set Value using SQL:")
    pdf.code(
        "SELECT dep.department_name, s.specialty_name\n"
        "FROM doctors d\n"
        "JOIN departments dep ON dep.department_id = d.department_id\n"
        "JOIN doctor_specialties s ON s.specialty_id = d.specialty_id\n"
        "WHERE d.doctor_id = :PXX_DOCTOR_ID"
    )

    # Patient profile
    pdf.h1("Chapter 8 - Patient Profile (Master + Details)")
    pdf.body("One patient on top, three related lists below.")
    pdf.step(1, "Create Page > Blank Page. Name: Patient Profile.")
    pdf.step(2, "Create a Form region on PATIENTS (or Display Only fields).")
    pdf.step(3, "Add page item PXX_PATIENT_ID (Hidden). Pass it from Patients report link.")
    pdf.step(4, "Add Interactive Report region: Appointments")
    pdf.code(
        "SELECT * FROM v_appointments\n"
        "WHERE patient_id = :PXX_PATIENT_ID\n"
        "ORDER BY appointment_date DESC"
    )
    pdf.step(5, "Add region: Visits")
    pdf.code(
        "SELECT * FROM v_patient_visits\n"
        "WHERE patient_id = :PXX_PATIENT_ID\n"
        "ORDER BY visit_date DESC"
    )
    pdf.step(6, "Add region: Admissions")
    pdf.code(
        "SELECT * FROM v_admissions\n"
        "WHERE patient_id = :PXX_PATIENT_ID\n"
        "ORDER BY admission_date DESC"
    )
    pdf.step(7, "On Patients report, add a link column to this page with PATIENT_ID.")
    pdf.warn("Child reports must filter by the selected patient only.")

    # Visit prescription
    pdf.add_page()
    pdf.h1("Chapter 9 - Visit and Prescription (3 levels)")
    pdf.body("Level 1 Visit -> Level 2 Prescription -> Level 3 Prescription Items.")
    pdf.step(1, "Create Report page on V_PATIENT_VISITS (list of visits).")
    pdf.step(2, "Create Form page on PATIENT_VISITS.")
    pdf.step(3, "On visit form, show patient name and doctor name with a SQL query region.")
    pdf.step(4, "Add region for PRESCRIPTIONS filtered by VISIT_ID.")
    pdf.step(5, "Add Interactive Grid for PRESCRIPTION_ITEMS filtered by PRESCRIPTION_ID.")
    pdf.step(6, "Medicine column uses LOV_MEDICINES.")
    pdf.step(7, "Enter dosage, frequency, duration_days, instructions.")
    pdf.tip(
        "If no prescription exists for a visit, create a Process that inserts one "
        "prescription row for that visit first."
    )

    # Clinical workspace
    pdf.h1("Chapter 10 - Clinical Visit Workspace (Important)")
    pdf.body("Complex page opened from an appointment. Patient/doctor auto-fill.")
    pdf.step(1, "Create Blank Page named Clinical Visit Workspace.")
    pdf.step(2, "Create hidden items: PXX_APPOINTMENT_ID, PXX_PATIENT_ID, PXX_DOCTOR_ID, PXX_VISIT_ID.")
    pdf.step(3, "From Appointments report, link: Open Visit -> this page, set PXX_APPOINTMENT_ID.")
    pdf.step(4, "Before Header Process: load patient_id and doctor_id from appointments.")
    pdf.code(
        "SELECT patient_id, doctor_id\n"
        "INTO :PXX_PATIENT_ID, :PXX_DOCTOR_ID\n"
        "FROM appointments\n"
        "WHERE appointment_id = :PXX_APPOINTMENT_ID;"
    )
    pdf.step(5, "Add regions:")
    pdf.bullet("A) Patient summary from PATIENTS")
    pdf.bullet("B) Appointment summary from V_APPOINTMENTS")
    pdf.bullet("C) Doctor summary from V_DOCTORS")
    pdf.bullet("D) Visit form (symptoms, diagnosis, notes, follow-up)")
    pdf.bullet("E) Prescription items grid")
    pdf.bullet("F) Previous visits for same patient only")
    pdf.step(6, "Process: if visit for this appointment does not exist, INSERT one.")
    pdf.code(
        "BEGIN\n"
        "  SELECT visit_id INTO :PXX_VISIT_ID FROM patient_visits\n"
        "  WHERE appointment_id = :PXX_APPOINTMENT_ID;\n"
        "EXCEPTION WHEN NO_DATA_FOUND THEN\n"
        "  INSERT INTO patient_visits\n"
        "    (appointment_id, patient_id, doctor_id, visit_date)\n"
        "  VALUES\n"
        "    (:PXX_APPOINTMENT_ID, :PXX_PATIENT_ID, :PXX_DOCTOR_ID, SYSDATE)\n"
        "  RETURNING visit_id INTO :PXX_VISIT_ID;\n"
        "END;"
    )

    # Admissions
    pdf.add_page()
    pdf.h1("Chapter 11 - Admissions Page")
    pdf.step(1, "Create Report with Form on ADMISSIONS.")
    pdf.step(2, "Lookups: Patient=LOV_PATIENTS, Doctor=LOV_DOCTORS, Room=LOV_ROOMS_AVAILABLE.")
    pdf.step(3, "Default STATUS = Admitted.")
    pdf.step(4, "Validation: prevent occupied rooms:")
    pdf.code(
        "SELECT 1 FROM rooms\n"
        "WHERE room_id = :PXX_ROOM_ID AND status = 'Occupied'"
    )
    pdf.body("If row found -> error: Room is already occupied.")
    pdf.step(5, "Room status updates automatically by database trigger trg_admission_room_status.")
    pdf.step(6, "When discharging: set STATUS=Discharged and enter DISCHARGE_DATE (required).")
    pdf.code(
        "BEGIN\n"
        "  IF :PXX_STATUS = 'Discharged' AND :PXX_DISCHARGE_DATE IS NULL THEN\n"
        "    RETURN FALSE;\n"
        "  END IF;\n"
        "  RETURN TRUE;\n"
        "END;"
    )

    # Dashboard
    pdf.h1("Chapter 12 - Finish the Dashboard")
    pdf.step(1, "Open Dashboard page (page 1).")
    pdf.step(2, "Create Region > Classic Report (or Cards) for each KPI.")
    pdf.body("KPI SQL examples:")
    pdf.code("SELECT COUNT(*) AS value FROM patients")
    pdf.code(
        "SELECT COUNT(*) AS value FROM appointments\n"
        "WHERE appointment_date = TRUNC(SYSDATE)"
    )
    pdf.code("SELECT COUNT(*) AS value FROM doctors WHERE status = 'Active'")
    pdf.code("SELECT COUNT(*) AS value FROM admissions WHERE status = 'Admitted'")
    pdf.code(
        "SELECT COUNT(*) AS value FROM medicines\n"
        "WHERE current_stock < reorder_level AND status = 'Active'"
    )
    pdf.step(3, "Create Region > Chart (at least 3 charts).")
    pdf.h3("Chart SQL examples")
    pdf.body("Appointments by Department (Bar):")
    pdf.code(
        "SELECT dep.department_name AS label, COUNT(*) AS value\n"
        "FROM appointments a\n"
        "JOIN doctors d ON d.doctor_id = a.doctor_id\n"
        "JOIN departments dep ON dep.department_id = d.department_id\n"
        "GROUP BY dep.department_name"
    )
    pdf.body("Patients by Gender (Pie):")
    pdf.code("SELECT gender AS label, COUNT(*) AS value FROM patients GROUP BY gender")
    pdf.body("Medicine Stock Status (Pie):")
    pdf.code(
        "SELECT CASE WHEN current_stock < reorder_level THEN 'Low Stock'\n"
        "            ELSE 'Normal' END AS label,\n"
        "       COUNT(*) AS value\n"
        "FROM medicines WHERE status = 'Active'\n"
        "GROUP BY CASE WHEN current_stock < reorder_level THEN 'Low Stock'\n"
        "              ELSE 'Normal' END"
    )

    # Reports
    pdf.add_page()
    pdf.h1("Chapter 13 - Four Report Pages")
    pdf.body("Create Interactive Report pages. Source = views. Add page items as filters.")
    pdf.bullet("Appointment Report -> V_APPOINTMENTS (filters: date range, dept, doctor, status)")
    pdf.bullet("Patient Visit Report -> V_PATIENT_VISITS")
    pdf.bullet("Medicine Stock Report -> V_MEDICINES (show stock_status, highlight Low Stock)")
    pdf.bullet("Admission Report -> V_ADMISSIONS")
    pdf.h3("Example filter WHERE clause for appointments")
    pdf.code(
        "WHERE appointment_date BETWEEN NVL(:PXX_FROM, DATE '1900-01-01')\n"
        "                           AND NVL(:PXX_TO, DATE '2999-12-31')\n"
        "  AND (:PXX_DEPT IS NULL OR department_id = :PXX_DEPT)\n"
        "  AND (:PXX_DOCTOR IS NULL OR doctor_id = :PXX_DOCTOR)\n"
        "  AND (:PXX_STATUS IS NULL OR status_id = :PXX_STATUS)"
    )

    # Navigation
    pdf.h1("Chapter 14 - Navigation Menu")
    pdf.step(1, "Shared Components > Navigation Menu.")
    pdf.step(2, "Add entries for: Dashboard, Patients, Doctors, Medicines, Appointments,")
    pdf.body("Patient Profile, Visits, Clinical Workspace, Admissions, Reports.")
    pdf.step(3, "Link each menu entry to the correct page number.")
    pdf.step(4, "Save. Run Application from App Builder.")

    # Export
    pdf.h1("Chapter 15 - Export for Submission")
    pdf.step(1, "App Builder > your app > Export / Import > Export.")
    pdf.step(2, "Download the application .sql file.")
    pdf.step(3, "Also keep sql/99_complete_script.sql for table + sample data.")
    pdf.step(4, "Prepare a short demo using the sample user journey below.")

    pdf.h2("Demo flow (what to show your instructor)")
    pdf.bullet("1. Open Dashboard - show KPIs and charts")
    pdf.bullet("2. Patients - search and open a profile")
    pdf.bullet("3. Book an appointment for today/future")
    pdf.bullet("4. Open Clinical Visit Workspace from that appointment")
    pdf.bullet("5. Enter diagnosis and add 2 medicines")
    pdf.bullet("6. Admit a patient - show room becomes Occupied")
    pdf.bullet("7. Discharge - room becomes Available")
    pdf.bullet("8. Show Low Stock medicines and one report")

    # Checklist
    pdf.add_page()
    pdf.h1("Beginner Checklist")
    pdf.body("Tick each item when done:")
    items = [
        "Workspace created and signed in",
        "99_complete_script.sql run successfully",
        "Counts checked (patients/doctors/medicines/appointments/visits)",
        "Application created: Al Noor Hospital Management",
        "Shared LOVs created",
        "Patients CRUD + age + validations",
        "Doctors CRUD + lookups",
        "Medicines CRUD + low stock highlight",
        "Appointments + no past date validation",
        "Patient Profile master-detail",
        "Visit + Prescription + items",
        "Clinical Visit Workspace",
        "Admissions + room rules",
        "Dashboard KPIs + charts",
        "Four reports",
        "Navigation menu linked",
        "Application exported",
    ]
    for i, t in enumerate(items, 1):
        pdf.body(f"[ ] {i}. {t}")

    pdf.ln(6)
    pdf.h2("If you get stuck")
    pdf.bullet("Always Save before Run.")
    pdf.bullet("Check item names (P3_ vs P4_) carefully in validations.")
    pdf.bullet("If a page is blank, check region Source SQL for errors (SQL Workshop can test).")
    pdf.bullet("Use sample patient Abdullah Al-Maskari for demos.")
    pdf.bullet("More detail SQL is also in APEX_BUILD_GUIDE.md in your project.")

    pdf.ln(8)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(15, 107, 92)
    pdf.multi_cell(0, 7, "You can do this. Go step by step. One page at a time.")

    out = Path("/Users/mac/Downloads/Al_Noor_Hospital_Oracle_APEX_Beginner_Guide.pdf")
    pdf.output(str(out))
    return out


if __name__ == "__main__":
    path = build()
    print(path)
