import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, saveEmployees } from './employeeStorage';
import './EmployeeList.css';

function EmployeeList() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState(getEmployees());
  const [searchTerm, setSearchTerm] = useState('');

  // Search employees by name, role or department
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete employee
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (confirmDelete) {
      const updatedEmployees = employees.filter(
        (employee) => employee.id !== id
      );

      setEmployees(updatedEmployees);
      saveEmployees(updatedEmployees);
    }
  };

  return (
    <div className="employee-list-page">

      <div className="employee-list-header">
        <div>
          <h1>Employees</h1>
          <p>Manage all hospital employees here.</p>
        </div>

        <button
          className="add-employee-btn"
          onClick={() => navigate('/admin/employees/add')}
        >
          + Add Employee
        </button>
      </div>

      <div className="employee-search">
        <input
          type="text"
          placeholder="Search by name, role or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>₹{employee.salary.toLocaleString('en-IN')}</td>

                  <td>
                    <span
                      className={`employee-status ${employee.status.toLowerCase()}`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="employee-actions">
                    <button
                      className="employee-view-btn"
                      onClick={() =>
                        navigate(`/admin/employees/details/${employee.id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className="employee-edit-btn"
                      onClick={() =>
                        navigate(`/admin/employees/edit/${employee.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="employee-delete-btn"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-employees">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default EmployeeList;