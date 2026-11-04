const initialTransactions = [
  {
    id: 1,
    title: 'Patient Consultation',
    type: 'Income',
    category: 'Consultation',
    amount: 2500,
    paymentMethod: 'Cash',
    date: '2026-11-04',
    description: 'Consultation fees received.',
  },
  {
    id: 2,
    title: 'Medicine Purchase',
    type: 'Expense',
    category: 'Medical Supplies',
    amount: 5000,
    paymentMethod: 'Bank Transfer',
    date: '2026-11-04',
    description: 'Purchase of medicines.',
  },
  {
    id: 3,
    title: 'Room Charges',
    type: 'Income',
    category: 'Room Charges',
    amount: 8000,
    paymentMethod: 'UPI',
    date: '2026-11-03',
    description: 'Patient room charges received.',
  },
  {
    id: 4,
    title: 'Staff Salary',
    type: 'Expense',
    category: 'Salary',
    amount: 25000,
    paymentMethod: 'Bank Transfer',
    date: '2026-11-02',
    description: 'Monthly staff salary payment.',
  },
];

export const getTransactions = () => {
  const savedTransactions = localStorage.getItem('transactions');

  if (savedTransactions) {
    return JSON.parse(savedTransactions);
  }

  localStorage.setItem(
    'transactions',
    JSON.stringify(initialTransactions)
  );

  return initialTransactions;
};

export const saveTransactions = (transactions) => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};