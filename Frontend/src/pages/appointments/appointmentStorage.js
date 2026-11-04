import { getDoctors } from '../doctors/doctorStorage';
import { getPatients } from '../patients/patientStorage';

const initialAppointments = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    date: '2026-11-05',
    time: '10:00',
    department: 'Cardiology',
    reason: 'Regular Checkup',
    status: 'Confirmed',
  },
  {
    id: 2,
    patientId: 2,
    doctorId: 2,
    date: '2026-11-05',
    time: '11:30',
    department: 'Neurology',
    reason: 'Headache',
    status: 'Pending',
  },
  {
    id: 3,
    patientId: 3,
    doctorId: 3,
    date: '2026-11-06',
    time: '12:00',
    department: 'Orthopedic',
    reason: 'Joint Pain',
    status: 'Completed',
  },
];

// Get appointments from localStorage
export const getAppointments = () => {
  const savedAppointments = localStorage.getItem('appointments');

  if (savedAppointments) {
    return JSON.parse(savedAppointments);
  }

  // Initialize doctors and patients before appointments
  getDoctors();
  getPatients();

  localStorage.setItem(
    'appointments',
    JSON.stringify(initialAppointments)
  );

  return initialAppointments;
};

// Save appointments to localStorage
export const saveAppointments = (appointments) => {
  localStorage.setItem('appointments', JSON.stringify(appointments));
};