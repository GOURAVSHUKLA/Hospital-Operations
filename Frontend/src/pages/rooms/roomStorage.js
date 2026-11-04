const initialRooms = [
  {
    id: 1,
    roomNumber: '101',
    roomType: 'General',
    floor: 1,
    capacity: 2,
    occupiedBeds: 1,
    pricePerDay: 1000,
    status: 'Available',
  },
  {
    id: 2,
    roomNumber: '102',
    roomType: 'Private',
    floor: 1,
    capacity: 1,
    occupiedBeds: 1,
    pricePerDay: 2500,
    status: 'Occupied',
  },
  {
    id: 3,
    roomNumber: '201',
    roomType: 'ICU',
    floor: 2,
    capacity: 1,
    occupiedBeds: 0,
    pricePerDay: 5000,
    status: 'Available',
  },
  {
    id: 4,
    roomNumber: '202',
    roomType: 'General',
    floor: 2,
    capacity: 3,
    occupiedBeds: 2,
    pricePerDay: 1000,
    status: 'Available',
  },
];

export const getRooms = () => {
  const savedRooms = localStorage.getItem('rooms');

  if (savedRooms) {
    return JSON.parse(savedRooms);
  }

  localStorage.setItem('rooms', JSON.stringify(initialRooms));
  return initialRooms;
};

export const saveRooms = (rooms) => {
  localStorage.setItem('rooms', JSON.stringify(rooms));
};