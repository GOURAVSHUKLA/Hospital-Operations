import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, saveEmployees } from './employeeStorage';
import './AddEmployee.css';

function AddEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    phone: '',
    salary: '',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employees = getEmployees();

    const newEmployee = {
      id: Date.now(),
      ...formData,
      salary: Number(formData.salary),
    };

    saveEmployees([...employees, newEmployee]);

    alert('Employee added successfully!');
    navigate('/admin/employees');
  };

  return (
    <div className="add-employee-page">
      <div className="add-employee-header">
        <h1>Add Employee</h1>
        <p>Enter the employee details below.</p>
      </div>

      <form className="add-employee-form" onSubmit={handleSubmit}>
        <div className="employee-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter employee name"
            required
          />
        </div>

        <div className="employee-form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Nurse">Nurse</option>
            <option value="Lab Technician">Lab Technician</option>
            <option value="Accountant">Accountant</option>
            <option value="Ward Boy">Ward Boy</option>
            <option value="Security Guard">Security Guard</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="employee-form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter department"
            required
          />
        </div>

        <div className="employee-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="employee-form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />
        </div>

        <div className="employee-form-group">
          <label>Monthly Salary (₹)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter monthly salary"
            min="1"
            required
          />
        </div>

        <div className="employee-form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="employee-form-actions">
          <button type="submit" className="save-employee-btn">
            Save Employee
          </button>

          <button
            type="button"
            className="cancel-employee-btn"
            onClick={() => navigate('/admin/employees')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;