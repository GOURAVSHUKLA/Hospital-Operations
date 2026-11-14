import { useState } from 'react';
import { getSettings, saveSettings } from './settingsStorage';
import './Settings.css';

function Settings() {
  const [settings, setSettings] = useState(getSettings);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage('');
  };

  const handleWorkingDay = (day) => {
    setSettings((prev) => {
      const workingDays = prev.workingDays.includes(day)
        ? prev.workingDays.filter((item) => item !== day)
        : [...prev.workingDays, day];

      return { ...prev, workingDays };
    });

    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!settings.hospitalName.trim() || !settings.email.trim() || !settings.phone.trim()) {
      setMessage('Please fill in all required fields.');
      return;
    }

    saveSettings(settings);
    setMessage('Hospital settings saved successfully!');
  };

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <h1>Hospital Settings</h1>
          <p>Manage your hospital information and working hours.</p>
        </div>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <section className="settings-section">
          <h2>Hospital Information</h2>

          <div className="settings-grid">
            <div className="settings-group">
              <label>Hospital Name *</label>
              <input
                type="text"
                name="hospitalName"
                value={settings.hospitalName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="settings-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="settings-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="settings-group">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={settings.website}
                onChange={handleChange}
              />
            </div>

            <div className="settings-group full-width">
              <label>Hospital Address</label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2>Working Hours</h2>

          <div className="settings-grid">
            <div className="settings-group">
              <label>Opening Time</label>
              <input
                type="time"
                name="openingTime"
                value={settings.openingTime}
                onChange={handleChange}
              />
            </div>

            <div className="settings-group">
              <label>Closing Time</label>
              <input
                type="time"
                name="closingTime"
                value={settings.closingTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="working-days">
            <label>Working Days</label>

            <div className="days-list">
              {days.map((day) => (
                <label className="day-option" key={day}>
                  <input
                    type="checkbox"
                    checked={settings.workingDays.includes(day)}
                    onChange={() => handleWorkingDay(day)}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        </section>

        {message && (
          <p className="settings-message" role="status">
            {message}
          </p>
        )}

        <div className="settings-actions">
          <button type="submit" className="save-settings-btn">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;