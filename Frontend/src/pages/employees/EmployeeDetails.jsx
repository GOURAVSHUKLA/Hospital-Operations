import { useNavigate, useParams } from 'react-router-dom';
import { getEmployees } from './employeeStorage';
import './EmployeeDetails.css';

function EmployeeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const employees = getEmployees();

  const employee = employees.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!employee) {
    return (
      <div className="employee-details-page">
        <h2>Employee not found!</h2>
        <button onClick={() => navigate('/admin/employees')}>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="employee-details-page">
      <div className="employee-details-header">
        <div>
          <h1>Employee Details</h1>
          <p>Complete information about the employee.</p>
        </div>

        <button
          className="back-employee-btn"
          onClick={() => navigate('/admin/employees')}
        >
          Back to Employees
        </button>
      </div>

      <div className="employee-details-card">
        <div className="employee-profile">
          <div className="employee-avatar">
            {employee.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{employee.name}</h2>
            <p>Employee ID: {employee.id}</p>
          </div>
        </div>

        <div className="employee-details-grid">
          <div className="detail-item">
            <label>Role</label>
            <p>{employee.role}</p>
          </div>

          <div className="detail-item">
            <label>Department</label>
            <p>{employee.department}</p>
          </div>

          <div className="detail-item">
            <label>Email</label>
            <p>{employee.email}</p>
          </div>

          <div className="detail-item">
            <label>Phone</label>
            <p>{employee.phone}</p>
          </div>

          <div className="detail-item">
            <label>Monthly Salary</label>
            <p>₹{employee.salary.toLocaleString('en-IN')}</p>
          </div>

          <div className="detail-item">
            <label>Status</label>
            <span className={`employee-status ${employee.status.toLowerCase()}`}>
              {employee.status}
            </span>
          </div>
        </div>

        <button
          className="edit-employee-details-btn"
          onClick={() => navigate(`/admin/employees/edit/${employee.id}`)}
        >
          Edit Employee
        </button>
      </div>
    </div>
  );
}

export default EmployeeDetails;