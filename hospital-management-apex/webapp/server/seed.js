// Al Noor Hospital — seed data (mirrors SQL sample)
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}
function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function today() {
  return new Date().toISOString().slice(0, 10);
}

export function createSeed() {
  const departments = [
    { department_id: 1, department_name: 'Cardiology', floor_no: 2, status: 'Active' },
    { department_id: 2, department_name: 'Pediatrics', floor_no: 1, status: 'Active' },
    { department_id: 3, department_name: 'Emergency', floor_no: 0, status: 'Active' },
    { department_id: 4, department_name: 'Orthopedics', floor_no: 3, status: 'Active' },
    { department_id: 5, department_name: 'Internal Medicine', floor_no: 2, status: 'Active' },
    { department_id: 6, department_name: 'Obstetrics & Gynecology', floor_no: 4, status: 'Active' },
    { department_id: 7, department_name: 'Neurology', floor_no: 3, status: 'Active' },
  ];

  const specialties = [
    { specialty_id: 1, specialty_name: 'Cardiologist', status: 'Active' },
    { specialty_id: 2, specialty_name: 'Pediatrician', status: 'Active' },
    { specialty_id: 3, specialty_name: 'Emergency Physician', status: 'Active' },
    { specialty_id: 4, specialty_name: 'Orthopedic Surgeon', status: 'Active' },
    { specialty_id: 5, specialty_name: 'Internist', status: 'Active' },
    { specialty_id: 6, specialty_name: 'Gynecologist', status: 'Active' },
    { specialty_id: 7, specialty_name: 'Neurologist', status: 'Active' },
    { specialty_id: 8, specialty_name: 'General Surgeon', status: 'Active' },
  ];

  const medicineCategories = [
    { category_id: 1, category_name: 'Antibiotic', status: 'Active' },
    { category_id: 2, category_name: 'Painkiller', status: 'Active' },
    { category_id: 3, category_name: 'Diabetes', status: 'Active' },
    { category_id: 4, category_name: 'Cardiac', status: 'Active' },
    { category_id: 5, category_name: 'Vitamins', status: 'Active' },
    { category_id: 6, category_name: 'Respiratory', status: 'Active' },
    { category_id: 7, category_name: 'Gastrointestinal', status: 'Active' },
  ];

  const appointmentStatuses = [
    { status_id: 1, status_name: 'Scheduled' },
    { status_id: 2, status_name: 'Completed' },
    { status_id: 3, status_name: 'Cancelled' },
    { status_id: 4, status_name: 'No Show' },
  ];

  const doctors = [
    { doctor_id: 1, full_name: 'Dr. Ahmed Al-Balushi', department_id: 1, specialty_id: 1, mobile_no: '96891234501', email: 'ahmed.balushi@alnoor.om', consultation_fee: 25, status: 'Active' },
    { doctor_id: 2, full_name: 'Dr. Fatima Al-Hinai', department_id: 2, specialty_id: 2, mobile_no: '96891234502', email: 'fatima.hinai@alnoor.om', consultation_fee: 20, status: 'Active' },
    { doctor_id: 3, full_name: 'Dr. Omar Al-Riyami', department_id: 3, specialty_id: 3, mobile_no: '96891234503', email: 'omar.riyami@alnoor.om', consultation_fee: 30, status: 'Active' },
    { doctor_id: 4, full_name: 'Dr. Sara Al-Harthy', department_id: 4, specialty_id: 4, mobile_no: '96891234504', email: 'sara.harthy@alnoor.om', consultation_fee: 28, status: 'Active' },
    { doctor_id: 5, full_name: 'Dr. Khalid Al-Maawali', department_id: 5, specialty_id: 5, mobile_no: '96891234505', email: 'khalid.maawali@alnoor.om', consultation_fee: 22, status: 'Active' },
    { doctor_id: 6, full_name: 'Dr. Maryam Al-Siyabi', department_id: 6, specialty_id: 6, mobile_no: '96891234506', email: 'maryam.siyabi@alnoor.om', consultation_fee: 25, status: 'Active' },
    { doctor_id: 7, full_name: 'Dr. Yousuf Al-Kindi', department_id: 7, specialty_id: 7, mobile_no: '96891234507', email: 'yousuf.kindi@alnoor.om', consultation_fee: 35, status: 'Active' },
    { doctor_id: 8, full_name: 'Dr. Nasser Al-Abri', department_id: 1, specialty_id: 1, mobile_no: '96891234508', email: 'nasser.abri@alnoor.om', consultation_fee: 25, status: 'Active' },
    { doctor_id: 9, full_name: 'Dr. Aisha Al-Zadjali', department_id: 2, specialty_id: 2, mobile_no: '96891234509', email: 'aisha.zadjali@alnoor.om', consultation_fee: 20, status: 'Active' },
    { doctor_id: 10, full_name: 'Dr. Hassan Al-Farsi', department_id: 5, specialty_id: 5, mobile_no: '96891234510', email: 'hassan.farsi@alnoor.om', consultation_fee: 22, status: 'Active' },
    { doctor_id: 11, full_name: 'Dr. Layla Al-Amri', department_id: 3, specialty_id: 3, mobile_no: '96891234511', email: 'layla.amri@alnoor.om', consultation_fee: 30, status: 'Active' },
    { doctor_id: 12, full_name: 'Dr. Salim Al-Busaidi', department_id: 4, specialty_id: 4, mobile_no: '96891234512', email: 'salim.busaidi@alnoor.om', consultation_fee: 28, status: 'Inactive' },
  ];

  const patients = [
    { patient_id: 1, civil_id: '12345671', full_name: 'Abdullah Al-Maskari', gender: 'Male', date_of_birth: '1985-03-12', mobile_no: '96899110001', email: 'abdullah.m@email.om', blood_group: 'O+', address: 'Al Khuwair, Muscat', emergency_contact_name: 'Fatima Al-Maskari', emergency_contact_no: '96899110002', created_at: daysAgo(60) },
    { patient_id: 2, civil_id: '12345672', full_name: 'Muna Al-Ghafri', gender: 'Female', date_of_birth: '1990-07-22', mobile_no: '96899110003', email: 'muna.g@email.om', blood_group: 'A+', address: 'Qurum, Muscat', emergency_contact_name: 'Ali Al-Ghafri', emergency_contact_no: '96899110004', created_at: daysAgo(55) },
    { patient_id: 3, civil_id: '12345673', full_name: 'Said Al-Shanfari', gender: 'Male', date_of_birth: '1978-11-05', mobile_no: '96899110005', email: null, blood_group: 'B+', address: 'Seeb, Muscat', emergency_contact_name: 'Huda Al-Shanfari', emergency_contact_no: '96899110006', created_at: daysAgo(50) },
    { patient_id: 4, civil_id: '12345674', full_name: 'Nadia Al-Toubi', gender: 'Female', date_of_birth: '2001-01-18', mobile_no: '96899110007', email: 'nadia.t@email.om', blood_group: 'AB+', address: 'Bawshar, Muscat', emergency_contact_name: 'Rashid Al-Toubi', emergency_contact_no: '96899110008', created_at: daysAgo(48) },
    { patient_id: 5, civil_id: '12345675', full_name: 'Ibrahim Al-Ajmi', gender: 'Male', date_of_birth: '1965-09-30', mobile_no: '96899110009', email: 'ibrahim.a@email.om', blood_group: 'O-', address: 'Al Amerat, Muscat', emergency_contact_name: 'Salma Al-Ajmi', emergency_contact_no: '96899110010', created_at: daysAgo(45) },
    { patient_id: 6, civil_id: '12345676', full_name: 'Hanan Al-Mahrouqi', gender: 'Female', date_of_birth: '1995-04-08', mobile_no: '96899110011', email: 'hanan.m@email.om', blood_group: 'A-', address: 'Muttrah, Muscat', emergency_contact_name: 'Yahya Al-Mahrouqi', emergency_contact_no: '96899110012', created_at: daysAgo(40) },
    { patient_id: 7, civil_id: '12345677', full_name: 'Rashid Al-Habsi', gender: 'Male', date_of_birth: '1988-12-25', mobile_no: '96899110013', email: null, blood_group: 'B-', address: 'Al Khoud, Muscat', emergency_contact_name: 'Amal Al-Habsi', emergency_contact_no: '96899110014', created_at: daysAgo(38) },
    { patient_id: 8, civil_id: '12345678', full_name: 'Amina Al-Rawahi', gender: 'Female', date_of_birth: '2015-06-14', mobile_no: '96899110015', email: null, blood_group: 'O+', address: 'Ruwi, Muscat', emergency_contact_name: 'Khalifa Al-Rawahi', emergency_contact_no: '96899110016', created_at: daysAgo(35) },
    { patient_id: 9, civil_id: '12345679', full_name: 'Tariq Al-Nabhani', gender: 'Male', date_of_birth: '1972-02-28', mobile_no: '96899110017', email: 'tariq.n@email.om', blood_group: 'A+', address: 'Sohar', emergency_contact_name: 'Laila Al-Nabhani', emergency_contact_no: '96899110018', created_at: daysAgo(32) },
    { patient_id: 10, civil_id: '12345680', full_name: 'Zainab Al-Saadi', gender: 'Female', date_of_birth: '1998-08-03', mobile_no: '96899110019', email: 'zainab.s@email.om', blood_group: 'AB-', address: 'Nizwa', emergency_contact_name: 'Mohammed Al-Saadi', emergency_contact_no: '96899110020', created_at: daysAgo(30) },
    { patient_id: 11, civil_id: '12345681', full_name: 'Hamad Al-Jabri', gender: 'Male', date_of_birth: '1982-05-17', mobile_no: '96899110021', email: 'hamad.j@email.om', blood_group: 'O+', address: 'Sur', emergency_contact_name: 'Noor Al-Jabri', emergency_contact_no: '96899110022', created_at: daysAgo(28) },
    { patient_id: 12, civil_id: '12345682', full_name: 'Latifa Al-Shehhi', gender: 'Female', date_of_birth: '1993-10-09', mobile_no: '96899110023', email: 'latifa.s@email.om', blood_group: 'B+', address: 'Salalah', emergency_contact_name: 'Sultan Al-Shehhi', emergency_contact_no: '96899110024', created_at: daysAgo(25) },
    { patient_id: 13, civil_id: '12345683', full_name: 'Majid Al-Kalbani', gender: 'Male', date_of_birth: '2005-03-21', mobile_no: '96899110025', email: null, blood_group: 'A+', address: 'Ibri', emergency_contact_name: 'Wafa Al-Kalbani', emergency_contact_no: '96899110026', created_at: daysAgo(22) },
    { patient_id: 14, civil_id: '12345684', full_name: 'Bushra Al-Omairi', gender: 'Female', date_of_birth: '1987-07-11', mobile_no: '96899110027', email: 'bushra.o@email.om', blood_group: 'O-', address: 'Barka', emergency_contact_name: 'Fahad Al-Omairi', emergency_contact_no: '96899110028', created_at: daysAgo(20) },
    { patient_id: 15, civil_id: '12345685', full_name: 'Waleed Al-Dhuhli', gender: 'Male', date_of_birth: '1975-11-19', mobile_no: '96899110029', email: 'waleed.d@email.om', blood_group: 'B+', address: 'Al Khuwair, Muscat', emergency_contact_name: 'Rania Al-Dhuhli', emergency_contact_no: '96899110030', created_at: daysAgo(18) },
    { patient_id: 16, civil_id: '12345686', full_name: 'Reem Al-Ismaili', gender: 'Female', date_of_birth: '2010-01-30', mobile_no: '96899110031', email: null, blood_group: 'A-', address: 'Qurum, Muscat', emergency_contact_name: 'Juma Al-Ismaili', emergency_contact_no: '96899110032', created_at: daysAgo(15) },
    { patient_id: 17, civil_id: '12345687', full_name: 'Fahad Al-Qasmi', gender: 'Male', date_of_birth: '1991-09-07', mobile_no: '96899110033', email: 'fahad.q@email.om', blood_group: 'AB+', address: 'Seeb, Muscat', emergency_contact_name: 'Maha Al-Qasmi', emergency_contact_no: '96899110034', created_at: daysAgo(12) },
    { patient_id: 18, civil_id: '12345688', full_name: 'Shaima Al-Aufi', gender: 'Female', date_of_birth: '1984-04-26', mobile_no: '96899110035', email: 'shaima.a@email.om', blood_group: 'O+', address: 'Bawshar, Muscat', emergency_contact_name: 'Bader Al-Aufi', emergency_contact_no: '96899110036', created_at: daysAgo(10) },
    { patient_id: 19, civil_id: '12345689', full_name: 'Nasser Al-Suleimani', gender: 'Male', date_of_birth: '1969-12-01', mobile_no: '96899110037', email: 'nasser.s@email.om', blood_group: 'A+', address: 'Al Ghubra, Muscat', emergency_contact_name: 'Huda Al-Suleimani', emergency_contact_no: '96899110038', created_at: daysAgo(8) },
    { patient_id: 20, civil_id: '12345690', full_name: 'Maryam Al-Hadhrami', gender: 'Female', date_of_birth: '1996-06-15', mobile_no: '96899110039', email: 'maryam.h@email.om', blood_group: 'B-', address: 'Muttrah, Muscat', emergency_contact_name: 'Omar Al-Hadhrami', emergency_contact_no: '96899110040', created_at: daysAgo(6) },
    { patient_id: 21, civil_id: '12345691', full_name: 'Khalifa Al-Yaarubi', gender: 'Male', date_of_birth: '2000-02-14', mobile_no: '96899110041', email: null, blood_group: 'O+', address: 'Al Khoud, Muscat', emergency_contact_name: 'Asma Al-Yaarubi', emergency_contact_no: '96899110042', created_at: daysAgo(4) },
    { patient_id: 22, civil_id: '12345692', full_name: 'Asma Al-Kharusi', gender: 'Female', date_of_birth: '1979-08-20', mobile_no: '96899110043', email: 'asma.k@email.om', blood_group: 'A+', address: 'Ruwi, Muscat', emergency_contact_name: 'Said Al-Kharusi', emergency_contact_no: '96899110044', created_at: daysAgo(2) },
  ];

  const medicines = [
    { medicine_id: 1, medicine_name: 'Amoxicillin 500mg', category_id: 1, unit: 'Tablet', current_stock: 120, reorder_level: 30, status: 'Active' },
    { medicine_id: 2, medicine_name: 'Azithromycin 250mg', category_id: 1, unit: 'Tablet', current_stock: 8, reorder_level: 25, status: 'Active' },
    { medicine_id: 3, medicine_name: 'Ceftriaxone 1g', category_id: 1, unit: 'Injection', current_stock: 45, reorder_level: 20, status: 'Active' },
    { medicine_id: 4, medicine_name: 'Paracetamol 500mg', category_id: 2, unit: 'Tablet', current_stock: 200, reorder_level: 50, status: 'Active' },
    { medicine_id: 5, medicine_name: 'Ibuprofen 400mg', category_id: 2, unit: 'Tablet', current_stock: 15, reorder_level: 40, status: 'Active' },
    { medicine_id: 6, medicine_name: 'Diclofenac 50mg', category_id: 2, unit: 'Tablet', current_stock: 90, reorder_level: 30, status: 'Active' },
    { medicine_id: 7, medicine_name: 'Metformin 500mg', category_id: 3, unit: 'Tablet', current_stock: 150, reorder_level: 40, status: 'Active' },
    { medicine_id: 8, medicine_name: 'Insulin Glargine', category_id: 3, unit: 'Injection', current_stock: 5, reorder_level: 15, status: 'Active' },
    { medicine_id: 9, medicine_name: 'Gliclazide 80mg', category_id: 3, unit: 'Tablet', current_stock: 70, reorder_level: 20, status: 'Active' },
    { medicine_id: 10, medicine_name: 'Atenolol 50mg', category_id: 4, unit: 'Tablet', current_stock: 100, reorder_level: 25, status: 'Active' },
    { medicine_id: 11, medicine_name: 'Amlodipine 5mg', category_id: 4, unit: 'Tablet', current_stock: 12, reorder_level: 30, status: 'Active' },
    { medicine_id: 12, medicine_name: 'Aspirin 81mg', category_id: 4, unit: 'Tablet', current_stock: 180, reorder_level: 50, status: 'Active' },
    { medicine_id: 13, medicine_name: 'Vitamin D3 1000IU', category_id: 5, unit: 'Tablet', current_stock: 60, reorder_level: 20, status: 'Active' },
    { medicine_id: 14, medicine_name: 'Folic Acid 5mg', category_id: 5, unit: 'Tablet', current_stock: 3, reorder_level: 20, status: 'Active' },
    { medicine_id: 15, medicine_name: 'Multivitamin Syrup', category_id: 5, unit: 'Syrup', current_stock: 40, reorder_level: 15, status: 'Active' },
    { medicine_id: 16, medicine_name: 'Salbutamol Inhaler', category_id: 6, unit: 'Inhaler', current_stock: 55, reorder_level: 20, status: 'Active' },
    { medicine_id: 17, medicine_name: 'Ambroxol Syrup', category_id: 6, unit: 'Syrup', current_stock: 7, reorder_level: 25, status: 'Active' },
    { medicine_id: 18, medicine_name: 'Montelukast 10mg', category_id: 6, unit: 'Tablet', current_stock: 80, reorder_level: 25, status: 'Active' },
    { medicine_id: 19, medicine_name: 'Omeprazole 20mg', category_id: 7, unit: 'Capsule', current_stock: 110, reorder_level: 30, status: 'Active' },
    { medicine_id: 20, medicine_name: 'Domperidone 10mg', category_id: 7, unit: 'Tablet', current_stock: 95, reorder_level: 25, status: 'Active' },
    { medicine_id: 21, medicine_name: 'ORS Sachets', category_id: 7, unit: 'Sachet', current_stock: 4, reorder_level: 30, status: 'Active' },
    { medicine_id: 22, medicine_name: 'Ciprofloxacin 500mg', category_id: 1, unit: 'Tablet', current_stock: 65, reorder_level: 20, status: 'Active' },
  ];

  const rooms = [
    { room_id: 1, room_no: 'G-101', room_type: 'General', daily_rate: 40, status: 'Available' },
    { room_id: 2, room_no: 'G-102', room_type: 'General', daily_rate: 40, status: 'Available' },
    { room_id: 3, room_no: 'G-103', room_type: 'General', daily_rate: 40, status: 'Occupied' },
    { room_id: 4, room_no: 'P-201', room_type: 'Private', daily_rate: 80, status: 'Available' },
    { room_id: 5, room_no: 'P-202', room_type: 'Private', daily_rate: 80, status: 'Occupied' },
    { room_id: 6, room_no: 'P-203', room_type: 'Private', daily_rate: 90, status: 'Available' },
    { room_id: 7, room_no: 'ICU-01', room_type: 'ICU', daily_rate: 200, status: 'Available' },
    { room_id: 8, room_no: 'ICU-02', room_type: 'ICU', daily_rate: 200, status: 'Occupied' },
    { room_id: 9, room_no: 'G-104', room_type: 'General', daily_rate: 40, status: 'Maintenance' },
    { room_id: 10, room_no: 'P-204', room_type: 'Private', daily_rate: 85, status: 'Available' },
  ];

  const appointments = [
    { appointment_id: 1, patient_id: 1, doctor_id: 1, appointment_date: daysAgo(20), appointment_time: '09:00', status_id: 2, reason_for_visit: 'Chest pain follow-up', created_at: daysAgo(25) },
    { appointment_id: 2, patient_id: 2, doctor_id: 2, appointment_date: daysAgo(18), appointment_time: '10:00', status_id: 2, reason_for_visit: 'Child fever', created_at: daysAgo(20) },
    { appointment_id: 3, patient_id: 3, doctor_id: 5, appointment_date: daysAgo(15), appointment_time: '11:00', status_id: 2, reason_for_visit: 'Diabetes review', created_at: daysAgo(18) },
    { appointment_id: 4, patient_id: 4, doctor_id: 6, appointment_date: daysAgo(14), appointment_time: '09:30', status_id: 2, reason_for_visit: 'Routine checkup', created_at: daysAgo(16) },
    { appointment_id: 5, patient_id: 5, doctor_id: 1, appointment_date: daysAgo(12), appointment_time: '14:00', status_id: 2, reason_for_visit: 'Hypertension', created_at: daysAgo(14) },
    { appointment_id: 6, patient_id: 6, doctor_id: 7, appointment_date: daysAgo(10), appointment_time: '15:00', status_id: 2, reason_for_visit: 'Migraine', created_at: daysAgo(12) },
    { appointment_id: 7, patient_id: 7, doctor_id: 4, appointment_date: daysAgo(9), appointment_time: '10:30', status_id: 2, reason_for_visit: 'Knee pain', created_at: daysAgo(11) },
    { appointment_id: 8, patient_id: 8, doctor_id: 2, appointment_date: daysAgo(8), appointment_time: '11:30', status_id: 2, reason_for_visit: 'Vaccination', created_at: daysAgo(10) },
    { appointment_id: 9, patient_id: 9, doctor_id: 10, appointment_date: daysAgo(7), appointment_time: '09:00', status_id: 2, reason_for_visit: 'Abdominal pain', created_at: daysAgo(9) },
    { appointment_id: 10, patient_id: 10, doctor_id: 5, appointment_date: daysAgo(6), appointment_time: '13:00', status_id: 2, reason_for_visit: 'Fatigue and dizziness', created_at: daysAgo(8) },
    { appointment_id: 11, patient_id: 11, doctor_id: 8, appointment_date: daysAgo(5), appointment_time: '16:00', status_id: 2, reason_for_visit: 'ECG review', created_at: daysAgo(7) },
    { appointment_id: 12, patient_id: 12, doctor_id: 9, appointment_date: daysAgo(4), appointment_time: '10:00', status_id: 2, reason_for_visit: 'Growth check', created_at: daysAgo(6) },
    { appointment_id: 13, patient_id: 13, doctor_id: 3, appointment_date: daysAgo(3), appointment_time: '08:00', status_id: 4, reason_for_visit: 'Minor injury', created_at: daysAgo(5) },
    { appointment_id: 14, patient_id: 14, doctor_id: 6, appointment_date: daysAgo(2), appointment_time: '12:00', status_id: 3, reason_for_visit: 'Consultation cancelled', created_at: daysAgo(4) },
    { appointment_id: 15, patient_id: 15, doctor_id: 1, appointment_date: daysAgo(1), appointment_time: '09:00', status_id: 2, reason_for_visit: 'Cardiac follow-up', created_at: daysAgo(3) },
    { appointment_id: 16, patient_id: 16, doctor_id: 2, appointment_date: today(), appointment_time: '09:00', status_id: 1, reason_for_visit: 'Cough and cold', created_at: daysAgo(1) },
    { appointment_id: 17, patient_id: 17, doctor_id: 5, appointment_date: today(), appointment_time: '10:00', status_id: 1, reason_for_visit: 'Blood pressure check', created_at: daysAgo(1) },
    { appointment_id: 18, patient_id: 18, doctor_id: 4, appointment_date: today(), appointment_time: '11:00', status_id: 1, reason_for_visit: 'Back pain', created_at: daysAgo(1) },
    { appointment_id: 19, patient_id: 19, doctor_id: 7, appointment_date: today(), appointment_time: '14:00', status_id: 1, reason_for_visit: 'Headache', created_at: today() },
    { appointment_id: 20, patient_id: 20, doctor_id: 3, appointment_date: today(), appointment_time: '15:00', status_id: 1, reason_for_visit: 'Emergency review', created_at: today() },
    { appointment_id: 21, patient_id: 1, doctor_id: 8, appointment_date: daysFromNow(1), appointment_time: '09:30', status_id: 1, reason_for_visit: 'Follow-up cardiology', created_at: today() },
    { appointment_id: 22, patient_id: 2, doctor_id: 9, appointment_date: daysFromNow(1), appointment_time: '10:30', status_id: 1, reason_for_visit: 'Pediatric review', created_at: today() },
    { appointment_id: 23, patient_id: 3, doctor_id: 10, appointment_date: daysFromNow(2), appointment_time: '11:00', status_id: 1, reason_for_visit: 'Lab results review', created_at: today() },
    { appointment_id: 24, patient_id: 5, doctor_id: 1, appointment_date: daysFromNow(2), appointment_time: '14:30', status_id: 1, reason_for_visit: 'ECG appointment', created_at: today() },
    { appointment_id: 25, patient_id: 7, doctor_id: 4, appointment_date: daysFromNow(3), appointment_time: '09:00', status_id: 1, reason_for_visit: 'Physio referral', created_at: today() },
    { appointment_id: 26, patient_id: 9, doctor_id: 5, appointment_date: daysFromNow(3), appointment_time: '10:00', status_id: 1, reason_for_visit: 'Diabetes education', created_at: today() },
    { appointment_id: 27, patient_id: 11, doctor_id: 8, appointment_date: daysFromNow(4), appointment_time: '11:30', status_id: 1, reason_for_visit: 'Medication review', created_at: today() },
    { appointment_id: 28, patient_id: 12, doctor_id: 6, appointment_date: daysFromNow(5), appointment_time: '09:00', status_id: 1, reason_for_visit: 'Prenatal visit', created_at: today() },
    { appointment_id: 29, patient_id: 15, doctor_id: 7, appointment_date: daysFromNow(5), appointment_time: '15:00', status_id: 1, reason_for_visit: 'Neurology consult', created_at: today() },
    { appointment_id: 30, patient_id: 21, doctor_id: 11, appointment_date: daysFromNow(6), appointment_time: '08:30', status_id: 1, reason_for_visit: 'Trauma follow-up', created_at: today() },
    { appointment_id: 31, patient_id: 22, doctor_id: 10, appointment_date: daysFromNow(7), appointment_time: '13:00', status_id: 1, reason_for_visit: 'General checkup', created_at: today() },
    { appointment_id: 32, patient_id: 4, doctor_id: 2, appointment_date: daysAgo(25), appointment_time: '09:00', status_id: 2, reason_for_visit: 'Allergy consult', created_at: daysAgo(28) },
    { appointment_id: 33, patient_id: 8, doctor_id: 9, appointment_date: daysAgo(22), appointment_time: '10:00', status_id: 2, reason_for_visit: 'Ear infection', created_at: daysAgo(24) },
  ];

  const visits = [
    { visit_id: 1, appointment_id: 1, patient_id: 1, doctor_id: 1, visit_date: daysAgo(20), symptoms: 'Chest discomfort, mild shortness of breath', diagnosis: 'Stable angina', notes: 'Continue current medication.', follow_up_date: daysFromNow(10) },
    { visit_id: 2, appointment_id: 2, patient_id: 2, doctor_id: 2, visit_date: daysAgo(18), symptoms: 'High fever, cough for 3 days', diagnosis: 'Viral URI', notes: 'Hydration and rest.', follow_up_date: null },
    { visit_id: 3, appointment_id: 3, patient_id: 3, doctor_id: 5, visit_date: daysAgo(15), symptoms: 'Polyuria, fatigue', diagnosis: 'Type 2 Diabetes', notes: 'Adjust metformin.', follow_up_date: daysFromNow(30) },
    { visit_id: 4, appointment_id: 4, patient_id: 4, doctor_id: 6, visit_date: daysAgo(14), symptoms: 'Routine antenatal visit', diagnosis: 'Normal pregnancy', notes: 'Next visit in 4 weeks.', follow_up_date: daysFromNow(28) },
    { visit_id: 5, appointment_id: 5, patient_id: 5, doctor_id: 1, visit_date: daysAgo(12), symptoms: 'Elevated BP', diagnosis: 'Hypertension', notes: 'Started amlodipine.', follow_up_date: daysFromNow(14) },
    { visit_id: 6, appointment_id: 6, patient_id: 6, doctor_id: 7, visit_date: daysAgo(10), symptoms: 'Severe headache, photophobia', diagnosis: 'Migraine', notes: 'Acute therapy prescribed.', follow_up_date: daysFromNow(21) },
    { visit_id: 7, appointment_id: 7, patient_id: 7, doctor_id: 4, visit_date: daysAgo(9), symptoms: 'Right knee pain', diagnosis: 'Patellar tendinitis', notes: 'Physio referral.', follow_up_date: daysFromNow(14) },
    { visit_id: 8, appointment_id: 8, patient_id: 8, doctor_id: 2, visit_date: daysAgo(8), symptoms: 'Due for MMR booster', diagnosis: 'Routine immunization', notes: 'Vaccination given.', follow_up_date: null },
    { visit_id: 9, appointment_id: 9, patient_id: 9, doctor_id: 10, visit_date: daysAgo(7), symptoms: 'Epigastric pain', diagnosis: 'Gastritis', notes: 'PPI prescribed.', follow_up_date: daysFromNow(14) },
    { visit_id: 10, appointment_id: 10, patient_id: 10, doctor_id: 5, visit_date: daysAgo(6), symptoms: 'Fatigue, dizziness', diagnosis: 'Iron deficiency anemia', notes: 'Labs ordered.', follow_up_date: daysFromNow(21) },
    { visit_id: 11, appointment_id: 11, patient_id: 11, doctor_id: 8, visit_date: daysAgo(5), symptoms: 'Palpitations', diagnosis: 'Sinus tachycardia', notes: 'ECG normal.', follow_up_date: daysFromNow(30) },
    { visit_id: 12, appointment_id: 15, patient_id: 15, doctor_id: 1, visit_date: daysAgo(1), symptoms: 'Post-op cardiac review', diagnosis: 'Stable post angioplasty', notes: 'Continue DAPT.', follow_up_date: daysFromNow(30) },
  ];

  const prescriptions = [
    { prescription_id: 1, visit_id: 1, patient_id: 1, doctor_id: 1, prescription_date: daysAgo(20), notes: 'Cardiac medications' },
    { prescription_id: 2, visit_id: 2, patient_id: 2, doctor_id: 2, prescription_date: daysAgo(18), notes: 'Symptomatic relief' },
    { prescription_id: 3, visit_id: 3, patient_id: 3, doctor_id: 5, prescription_date: daysAgo(15), notes: 'Diabetes control' },
    { prescription_id: 4, visit_id: 5, patient_id: 5, doctor_id: 1, prescription_date: daysAgo(12), notes: 'BP control' },
    { prescription_id: 5, visit_id: 6, patient_id: 6, doctor_id: 7, prescription_date: daysAgo(10), notes: 'Migraine management' },
    { prescription_id: 6, visit_id: 7, patient_id: 7, doctor_id: 4, prescription_date: daysAgo(9), notes: 'Pain management' },
    { prescription_id: 7, visit_id: 9, patient_id: 9, doctor_id: 10, prescription_date: daysAgo(7), notes: 'Gastritis treatment' },
    { prescription_id: 8, visit_id: 10, patient_id: 10, doctor_id: 5, prescription_date: daysAgo(6), notes: 'Anemia support' },
    { prescription_id: 9, visit_id: 11, patient_id: 11, doctor_id: 8, prescription_date: daysAgo(5), notes: 'Supportive care' },
    { prescription_id: 10, visit_id: 12, patient_id: 15, doctor_id: 1, prescription_date: daysAgo(1), notes: 'Post cardiac care' },
  ];

  const prescriptionItems = [
    { prescription_item_id: 1, prescription_id: 1, medicine_id: 10, dosage: '50mg', frequency: 'Once daily', duration_days: 30, instructions: 'After breakfast' },
    { prescription_item_id: 2, prescription_id: 1, medicine_id: 12, dosage: '81mg', frequency: 'Once daily', duration_days: 30, instructions: 'After food' },
    { prescription_item_id: 3, prescription_id: 2, medicine_id: 4, dosage: '500mg', frequency: 'Every 6 hours', duration_days: 5, instructions: 'As needed for fever' },
    { prescription_item_id: 4, prescription_id: 2, medicine_id: 17, dosage: '5ml', frequency: 'Twice daily', duration_days: 5, instructions: 'After food' },
    { prescription_item_id: 5, prescription_id: 3, medicine_id: 7, dosage: '500mg', frequency: 'Twice daily', duration_days: 30, instructions: 'With meals' },
    { prescription_item_id: 6, prescription_id: 4, medicine_id: 11, dosage: '5mg', frequency: 'Once daily', duration_days: 30, instructions: 'Morning' },
    { prescription_item_id: 7, prescription_id: 5, medicine_id: 5, dosage: '400mg', frequency: 'Twice daily', duration_days: 7, instructions: 'With food' },
    { prescription_item_id: 8, prescription_id: 5, medicine_id: 4, dosage: '500mg', frequency: 'As needed', duration_days: 7, instructions: 'For headache' },
    { prescription_item_id: 9, prescription_id: 6, medicine_id: 6, dosage: '50mg', frequency: 'Twice daily', duration_days: 7, instructions: 'After food' },
    { prescription_item_id: 10, prescription_id: 7, medicine_id: 19, dosage: '20mg', frequency: 'Once daily', duration_days: 14, instructions: 'Before breakfast' },
    { prescription_item_id: 11, prescription_id: 7, medicine_id: 20, dosage: '10mg', frequency: 'Three times daily', duration_days: 7, instructions: 'Before meals' },
    { prescription_item_id: 12, prescription_id: 8, medicine_id: 14, dosage: '5mg', frequency: 'Once daily', duration_days: 30, instructions: 'With water' },
    { prescription_item_id: 13, prescription_id: 8, medicine_id: 13, dosage: '1000IU', frequency: 'Once daily', duration_days: 30, instructions: 'With food' },
    { prescription_item_id: 14, prescription_id: 9, medicine_id: 4, dosage: '500mg', frequency: 'As needed', duration_days: 5, instructions: 'For discomfort' },
    { prescription_item_id: 15, prescription_id: 10, medicine_id: 12, dosage: '81mg', frequency: 'Once daily', duration_days: 90, instructions: 'Lifelong unless advised' },
    { prescription_item_id: 16, prescription_id: 10, medicine_id: 10, dosage: '50mg', frequency: 'Once daily', duration_days: 30, instructions: 'After breakfast' },
  ];

  const admissions = [
    { admission_id: 1, patient_id: 5, doctor_id: 1, room_id: 3, admission_date: daysAgo(3), discharge_date: null, admission_reason: 'Uncontrolled hypertension observation', status: 'Admitted' },
    { admission_id: 2, patient_id: 1, doctor_id: 8, room_id: 5, admission_date: daysAgo(5), discharge_date: null, admission_reason: 'Cardiac monitoring', status: 'Admitted' },
    { admission_id: 3, patient_id: 9, doctor_id: 10, room_id: 8, admission_date: daysAgo(2), discharge_date: null, admission_reason: 'Severe dehydration / gastritis', status: 'Admitted' },
    { admission_id: 4, patient_id: 3, doctor_id: 5, room_id: 1, admission_date: daysAgo(20), discharge_date: daysAgo(17), admission_reason: 'Diabetes ketoacidosis risk', status: 'Discharged' },
    { admission_id: 5, patient_id: 7, doctor_id: 4, room_id: 4, admission_date: daysAgo(15), discharge_date: daysAgo(12), admission_reason: 'Post knee injury observation', status: 'Discharged' },
    { admission_id: 6, patient_id: 15, doctor_id: 1, room_id: 7, admission_date: daysAgo(30), discharge_date: daysAgo(25), admission_reason: 'Post angioplasty care', status: 'Discharged' },
  ];

  return {
    departments,
    specialties,
    medicineCategories,
    appointmentStatuses,
    doctors,
    patients,
    medicines,
    rooms,
    appointments,
    visits,
    prescriptions,
    prescriptionItems,
    admissions,
    seq: {
      patient: 22,
      doctor: 12,
      medicine: 22,
      appointment: 33,
      visit: 12,
      prescription: 10,
      prescriptionItem: 16,
      admission: 6,
      room: 10,
      department: 7,
      specialty: 8,
      category: 7,
    },
  };
}
