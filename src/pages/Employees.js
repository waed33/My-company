
import React, { useState } from "react";
import "../design/Employees.css";
import Navbar from "../components/Navbar";
import { useEmployees } from "../components/EmployeeContext";

function Employees({ onBack }) {

  // Get employees from Context
  const { employees, setEmployees } = useEmployees();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    department: "IT",
    position: "",
    status: "Active",
  });

  // Get unique departments
  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

  // Filter employees
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || employee.department === department;

    const matchesStatus =
      status === "All" || employee.status === status;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Statistics
  const activeCount = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveCount = employees.length - activeCount;

  // Add or Update Employee
  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (
      !newEmployee.name.trim() ||
      !newEmployee.email.trim() ||
      !newEmployee.position.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId !== null) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? { ...newEmployee, id: editingId }
            : employee
        )
      );

      alert("Employee updated successfully!");
    } else {
      const employee = {
        ...newEmployee,
        id: Date.now(),
      };

      setEmployees([...employees, employee]);
      alert("Employee added successfully!");
    }

    resetForm();
  };

  // Edit Employee
  const handleEditEmployee = (employee) => {
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      status: employee.status,
    });

    setEditingId(employee.id);
    setShowForm(true);
  };

  // Delete Employee
  const handleDeleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter((employee) => employee.id !== id)
      );
    }
  };

  // Reset Form
  const resetForm = () => {
    setNewEmployee({
      name: "",
      email: "",
      department: "IT",
      position: "",
      status: "Active",
    });

    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="employees-page">

      <header className="employees-header">
        <div className="employees-header-title">
          <div className="employees-hero-image">
            <span>👥</span>
          </div>

          <div>
            <h1>Employees Management</h1>
            <p>Manage and monitor all company employees.</p>
          </div>
        </div>

        <button
          className="add-employee-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setEditingId(null);
              setNewEmployee({
                name: "",
                email: "",
                department: "IT",
                position: "",
                status: "Active",
              });
              setShowForm(true);
            }
          }}
        >
          + Add Employee
        </button>
      </header>

      {/* Statistics */}
      <div className="employee-stats">

        <div className="employee-stat-card">
          <span>Total Employees</span>
          <h2>{employees.length}</h2>
          <div className="employee-stat-icon blue">👥</div>
        </div>

        <div className="employee-stat-card">
          <span>Active Employees</span>
          <h2>{activeCount}</h2>
          <div className="employee-stat-icon green">✓</div>
        </div>

        <div className="employee-stat-card">
          <span>Inactive Employees</span>
          <h2>{inactiveCount}</h2>
          <div className="employee-stat-icon orange">⏸</div>
        </div>

        <div className="employee-stat-card">
          <span>Departments</span>
          <h2>{departments.length}</h2>
          <div className="employee-stat-icon purple">🏢</div>
        </div>

      </div>

      {/* Add / Edit Employee Form */}
      {showForm && (
        <div className="employee-form-card">

          <h2>
            {editingId !== null ? "Edit Employee" : "Add New Employee"}
          </h2>

          <form onSubmit={handleAddEmployee}>

            <div className="employee-form-grid">

              <input
                type="text"
                placeholder="Full Name"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email Address"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Job Position"
                value={newEmployee.position}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    position: e.target.value,
                  })
                }
              />

              <select
                value={newEmployee.department}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    department: e.target.value,
                  })
                }
              >
                {["IT", "HR", "Finance", "Marketing", "Sales"]
                  .concat(
                    departments.filter(
                      (dep) =>
                        !["IT", "HR", "Finance", "Marketing", "Sales"].includes(dep)
                    )
                  )
                  .map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
              </select>

              <select
                value={newEmployee.status}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    status: e.target.value,
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>

            <div className="employee-form-actions">

              <button type="submit" className="save-employee-btn">
                {editingId !== null ? "Update Employee" : "Save Employee"}
              </button>

              <button
                type="button"
                className="cancel-employee-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      )}

      {/* Employee Table */}
      <div className="employees-table-card">

        <div className="employees-table-header">
          <div>
            <h2>All Employees</h2>
            <p>View and manage company employee information.</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="employee-filters">

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>

            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

        <div className="employees-table-wrapper">

          <table className="employees-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>

                  <td>
                    <div className="employee-name-cell">

                      <div className="employee-avatar">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>

                      <strong>{employee.name}</strong>

                    </div>
                  </td>

                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>

                  <td>
                    <span
                      className={
                        employee.status === "Active"
                          ? "employee-status active"
                          : "employee-status inactive"
                      }
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td>

                    <button
                      type="button"
                      onClick={() => handleEditEmployee(employee)}
                      style={{
                        marginRight: "8px",
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      style={{
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="6" className="no-employees">
                    No employees found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>

        </div>

        <div className="employee-table-footer">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>

      </div>

    </div>
  );
}

export default Employees;
