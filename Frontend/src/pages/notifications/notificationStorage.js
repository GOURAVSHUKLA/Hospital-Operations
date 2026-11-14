const initialNotifications = [
  {
    id: 1,
    title: 'New Appointment Booked',
    message: 'Rahul Sharma has booked an appointment with Dr. Amit.',
    type: 'Appointment',
    date: '2026-11-04',
    isRead: false,
  },
  {
    id: 2,
    title: 'New Patient Registered',
    message: 'Priya Verma has been successfully registered.',
    type: 'Patient',
    date: '2026-11-04',
    isRead: false,
  },
  {
    id: 3,
    title: 'Payment Received',
    message: 'Payment of ₹2,000 received from Rahul Sharma.',
    type: 'Payment',
    date: '2026-11-03',
    isRead: true,
  },
  {
    id: 4,
    title: 'Low Bed Availability',
    message: 'Only 5 beds are currently available.',
    type: 'Alert',
    date: '2026-11-03',
    isRead: false,
  },
];

export const getNotifications = () => {
  const savedNotifications = localStorage.getItem('notifications');

  if (savedNotifications) {
    return JSON.parse(savedNotifications);
  }

  localStorage.setItem(
    'notifications',
    JSON.stringify(initialNotifications)
  );

  return initialNotifications;
};

export const saveNotifications = (notifications) => {
  localStorage.setItem('notifications', JSON.stringify(notifications));
};