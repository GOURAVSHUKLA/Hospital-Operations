const initialEmployees = [
  {
    id: 1,
    name: 'Rohit Sharma',
    role: 'Receptionist',
    department: 'Front Desk',
    email: 'rohit@gmail.com',
    phone: '9876543210',
    salary: 20000,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Priya Singh',
    role: 'Nurse',
    department: 'Emergency',
    email: 'priya@gmail.com',
    phone: '9876543211',
    salary: 25000,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Amit Verma',
    role: 'Lab Technician',
    department: 'Laboratory',
    email: 'amit@gmail.com',
    phone: '9876543212',
    salary: 22000,
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Neha Patel',
    role: 'Accountant',
    department: 'Finance',
    email: 'neha@gmail.com',
    phone: '9876543213',
    salary: 28000,
    status: 'Active',
  },
];

// Get employees from localStorage
export const getEmployees = () => {
  const savedEmployees = localStorage.getItem('employees');

  if (savedEmployees) {
    return JSON.parse(savedEmployees);
  }

  localStorage.setItem('employees', JSON.stringify(initialEmployees));

  return initialEmployees;
};

// Save employees to localStorage
export const saveEmployees = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};