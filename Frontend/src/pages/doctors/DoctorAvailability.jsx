import { useState } from "react";
import { getDoctors } from "./doctorStorage";
import "./DoctorAvailability.css";

function DoctorAvailability() {
  const doctors = getDoctors();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [status, setStatus] = useState("Available");

  const handleDayChange = (day) => {
    setSelectedDays((previousDays) =>
      previousDays.includes(day)
        ? previousDays.filter((item) => item !== day)
        : [...previousDays, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }

    if (selectedDays.length === 0) {
      alert("Please select at least one working day.");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be later than start time.");
      return;
    }

    const availability = {
      doctorId: Number(selectedDoctor),
      days: selectedDays,
      startTime,
      endTime,
      status,
    };

    const savedAvailability = JSON.parse(
      localStorage.getItem("doctorAvailability") || "[]"
    );

    const updatedAvailability = [
      ...savedAvailability.filter(
        (item) => item.doctorId !== availability.doctorId
      ),
      availability,
    ];

    localStorage.setItem(
      "doctorAvailability",
      JSON.stringify(updatedAvailability)
    );

    alert("Doctor availability saved successfully!");
    setSelectedDoctor("");
    setSelectedDays([]);
    setStartTime("09:00");
    setEndTime("17:00");
    setStatus("Available");
  };

  return (
    <div className="availability-page">
      <div className="availability-header">
        <div>
          <h1>Doctor Availability</h1>
          <p>Manage doctors' working days and hours.</p>
        </div>
      </div>

      <div className="availability-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Working Days</label>
            <div className="days-container">
              {days.map((day) => (
                <label className="day-option" key={day}>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDayChange(day)}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="time-container">
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Availability Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <button type="submit" className="save-availability-btn">
            Save Availability
          </button>
        </form>
      </div>
    </div>
  );
}

export default DoctorAvailability;