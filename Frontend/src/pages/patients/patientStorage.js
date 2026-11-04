const initialPatients = [
  {
    id: 1,
    name: 'Rahul Sharma',
    age: 28,
    gender: 'Male',
    phone: '9876543210',
    email: 'rahul@gmail.com',
    disease: 'Fever',
    status: 'Admitted',
  },
  {
    id: 2,
    name: 'Priya Verma',
    age: 35,
    gender: 'Female',
    phone: '9876543211',
    email: 'priya@gmail.com',
    disease: 'Migraine',
    status: 'Discharged',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    age: 42,
    gender: 'Male',
    phone: '9876543212',
    email: 'amit@gmail.com',
    disease: 'Diabetes',
    status: 'Admitted',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    age: 25,
    gender: 'Female',
    phone: '9876543213',
    email: 'sneha@gmail.com',
    disease: 'Viral Infection',
    status: 'Under Treatment',
  },
];

// Get patients from Local Storage
export const getPatients = () => {
  const savedPatients = localStorage.getItem('patients');

  if (savedPatients) {
    return JSON.parse(savedPatients);
  }

  localStorage.setItem('patients', JSON.stringify(initialPatients));

  return initialPatients;
};

// Save patients to Local Storage
export const savePatients = (patients) => {
  localStorage.setItem('patients', JSON.stringify(patients));
};