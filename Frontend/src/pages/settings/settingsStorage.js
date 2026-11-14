const defaultSettings = {
  hospitalName: 'City Care Hospital',
  email: 'info@citycarehospital.com',
  phone: '9876543210',
  address: 'Bengaluru, Karnataka, India',
  website: 'www.citycarehospital.com',
  openingTime: '09:00',
  closingTime: '18:00',
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

export const getSettings = () => {
  const savedSettings = localStorage.getItem('hospitalSettings');

  if (savedSettings) {
    return JSON.parse(savedSettings);
  }

  localStorage.setItem(
    'hospitalSettings',
    JSON.stringify(defaultSettings)
  );

  return defaultSettings;
};

export const saveSettings = (settings) => {
  localStorage.setItem('hospitalSettings', JSON.stringify(settings));
};