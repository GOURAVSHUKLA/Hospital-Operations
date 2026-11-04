const initialBills = [
  {
    id: 1,
    billNumber: 'BILL-001',
    patientId: 1,
    patientName: 'Rahul Sharma',
    billDate: '2026-11-04',
    dueDate: '2026-11-10',
    items: [
      { name: 'Consultation Fees', quantity: 1, price: 1000 },
      { name: 'Medicine Charges', quantity: 2, price: 500 },
    ],
    totalAmount: 2000,
    paidAmount: 2000,
    paymentStatus: 'Paid',
    paymentHistory: [
      {
        id: 1,
        amount: 2000,
        method: 'UPI',
        date: '2026-11-04',
      },
    ],
  },
  {
    id: 2,
    billNumber: 'BILL-002',
    patientId: 2,
    patientName: 'Priya Verma',
    billDate: '2026-11-04',
    dueDate: '2026-11-12',
    items: [
      { name: 'Consultation Fees', quantity: 1, price: 1500 },
      { name: 'Laboratory Tests', quantity: 1, price: 2000 },
    ],
    totalAmount: 3500,
    paidAmount: 1000,
    paymentStatus: 'Partially Paid',
    paymentHistory: [
      {
        id: 1,
        amount: 1000,
        method: 'Cash',
        date: '2026-11-04',
      },
    ],
  },
];

export const getBills = () => {
  const savedBills = localStorage.getItem('bills');

  if (savedBills) {
    return JSON.parse(savedBills);
  }

  localStorage.setItem('bills', JSON.stringify(initialBills));

  return initialBills;
};

export const saveBills = (bills) => {
  localStorage.setItem('bills', JSON.stringify(bills));
};