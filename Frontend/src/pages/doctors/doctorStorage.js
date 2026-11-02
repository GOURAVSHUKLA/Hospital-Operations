const initialDoctors = [
  {
    id: 1,
    name: 'Dr. Amit Sharma',
    specialization: 'Cardiologist',
    email: 'amit@gmail.com',
    phone: '9876543210',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Dr. Neha Verma',
    specialization: 'Neurologist',
    email: 'neha@gmail.com',
    phone: '9876543211',
    status: 'Available',
  },
  {
    id: 3,
    name: 'Dr. Raj Patel',
    specialization: 'Orthopedic',
    email: 'raj@gmail.com',
    phone: '9876543212',
    status: 'Unavailable',
  },
  {
    id: 4,
    name: 'Dr. Karan Singh',
    specialization: 'Dermatologist',
    email: 'karan@gmail.com',
    phone: '9876543213',
    status: 'Available',
  },
];

// Get doctors from localStorage
export const getDoctors = () => {
  const savedDoctors = localStorage.getItem('doctors');

  if (savedDoctors) {
    return JSON.parse(savedDoctors);
  }

  localStorage.setItem('doctors', JSON.stringify(initialDoctors));

  return initialDoctors;
};

// Save doctors in localStorage
export const saveDoctors = (doctors) => {
  localStorage.setItem('doctors', JSON.stringify(doctors));
};