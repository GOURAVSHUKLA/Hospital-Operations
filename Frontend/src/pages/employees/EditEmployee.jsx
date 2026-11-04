import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployees, saveEmployees } from './employeeStorage';
import './EditEmployee.css';

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const employees = getEmployees();

  const employee = employees.find(
    (item) => Number(item.id) === Number(id)
  );

  const [formData, setFormData] = useState(() => {
    if (!employee) return null;

    return {
      name: employee.name,
      role: employee.role,
      department: employee.department,
      email: employee.email,
      phone: employee.phone,
      salary: employee.salary,
      status: employee.status,
    };
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

    const updatedEmployees = employees.map((item) =>
      Number(item.id) === Number(id)
        ? {
            ...item,
            ...formData,
            salary: Number(formData.salary),
          }
        : item
    );

    saveEmployees(updatedEmployees);

    alert('Employee updated successfully!');
    navigate('/admin/employees');
  };

  if (!employee) {
    return (
      <div className="edit-employee-page">
        <h2>Employee not found!</h2>
        <button onClick={() => navigate('/admin/employees')}>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="edit-employee-page">
      <div className="edit-employee-header">
        <h1>Edit Employee</h1>
        <p>Update employee information below.</p>
      </div>

      <form className="edit-employee-form" onSubmit={handleSubmit}>
        <div className="employee-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            Update Employee
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

export default EditEmployee;