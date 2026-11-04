const initialEmergencyCases = [
  {
    id: 1,
    patientName: 'Rahul Sharma',
    age: 28,
    gender: 'Male',
    phone: '9876543210',
    emergencyType: 'Accident',
    priority: 'Critical',
    doctorId: 1,
    admissionDate: '2026-11-04',
    admissionTime: '09:30',
    description: 'Road accident with leg injury.',
    status: 'Under Treatment',
  },
  {
    id: 2,
    patientName: 'Priya Verma',
    age: 35,
    gender: 'Female',
    phone: '9876543211',
    emergencyType: 'Cardiac',
    priority: 'High',
    doctorId: 1,
    admissionDate: '2026-11-04',
    admissionTime: '10:15',
    description: 'Chest pain and breathing difficulty.',
    status: 'Admitted',
  },
  {
    id: 3,
    patientName: 'Amit Kumar',
    age: 42,
    gender: 'Male',
    phone: '9876543212',
    emergencyType: 'Fever',
    priority: 'Medium',
    doctorId: 2,
    admissionDate: '2026-11-04',
    admissionTime: '11:00',
    description: 'High fever and weakness.',
    status: 'Discharged',
  },
];

export const getEmergencyCases = () => {
  const savedCases = localStorage.getItem('emergencyCases');

  if (savedCases) {
    return JSON.parse(savedCases);
  }

  localStorage.setItem(
    'emergencyCases',
    JSON.stringify(initialEmergencyCases)
  );

  return initialEmergencyCases;
};

export const saveEmergencyCases = (cases) => {
  localStorage.setItem('emergencyCases', JSON.stringify(cases));
};