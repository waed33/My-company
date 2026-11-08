

import React, { useState, useEffect } from "react";
import "../design/Departments.css";

const initialDepartments = [
  { id: 1, name: "IT Department", manager: "John Smith", employees: 45, performance: 92, icon: "💻" },
  { id: 2, name: "HR Department", manager: "Sarah Wilson", employees: 28, performance: 90, icon: "👥" },
  { id: 3, name: "Marketing", manager: "David Brown", employees: 36, performance: 88, icon: "📢" },
  { id: 4, name: "Finance", manager: "Emily Davis", employees: 28, performance: 85, icon: "💰" },
  { id: 5, name: "Sales", manager: "Michael Lee", employees: 55, performance: 78, icon: "📈" },
  { id: 6, name: "Operations", manager: "James Wilson", employees: 56, performance: 86, icon: "⚙️" },
];

function Department() {
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem("omnicore_departments");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialDepartments;
      }
    }

    return initialDepartments;
  });

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newDepartment, setNewDepartment] = useState({
    name: "",
    manager: "",
    employees: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "omnicore_departments",
      JSON.stringify(departments)
    );
  }, [departments]);

  const totalEmployees = departments.reduce(
    (sum, dept) => sum + Number(dept.employees || 0),
    0
  );

  const averagePerformance = departments.length
    ? Math.round(
        departments.reduce(
          (sum, dept) => sum + Number(dept.performance || 0),
          0
        ) / departments.length
      )
    : 0;

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase()) ||
    dept.manager.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setNewDepartment({
      name: "",
      manager: "",
      employees: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const saveDepartment = (e) => {
    e.preventDefault();

    if (
      !newDepartment.name.trim() ||
      !newDepartment.manager.trim() ||
      newDepartment.employees === "" ||
      Number(newDepartment.employees) < 0
    ) {
      return;
    }

    if (editingId !== null) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === editingId
            ? {
                ...dept,
                name: newDepartment.name.trim(),
                manager: newDepartment.manager.trim(),
                employees: Number(newDepartment.employees),
              }
            : dept
        )
      );
    } else {
      const department = {
        id: Date.now(),
        name: newDepartment.name.trim(),
        manager: newDepartment.manager.trim(),
        employees: Number(newDepartment.employees),
        performance: 0,
        icon: "🏢",
      };

      setDepartments((prev) => [...prev, department]);
    }

    resetForm();
  };

  const editDepartment = (dept) => {
    setNewDepartment({
      name: dept.name,
      manager: dept.manager,
      employees: String(dept.employees),
    });

    setEditingId(dept.id);
    setShowForm(true);
  };

  const deleteDepartment = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (confirmDelete) {
      setDepartments((prev) =>
        prev.filter((dept) => dept.id !== id)
      );
    }
  };

  return (
    <div className="departments-page">

      {/* Page Heading */}
      <header className="departments-header">
        <div className="departments-title">
          <span className="departments-eyebrow">
            OMNICORE MANAGEMENT
          </span>

          <h1>Departments</h1>

          <p>
            Manage your teams, monitor performance and organize
            your company structure.
          </p>
        </div>

        <button
          className="add-department-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setEditingId(null);
              setNewDepartment({
                name: "",
                manager: "",
                employees: "",
              });
              setShowForm(true);
            }
          }}
        >
          <span>＋</span> Add Department
        </button>
      </header>
{/* Departments Hero Image */}
<div className="departments-hero-banner">
 <div className="departments-hero-banner">
 
</div>
  <div className="departments-hero-overlay">
    <span>✦</span>
    <h2>Building Stronger Teams</h2>
    <p>Structure • Leadership • Excellence</p>
  </div>
</div>
      {/* Statistics */}
      <section className="department-stats">

        <div className="department-stat-card">
          <div className="stat-top">
            <div className="stat-icon">🏢</div>
            <span className="stat-label">COMPANY STRUCTURE</span>
          </div>

          <p>Total Departments</p>
          <h2>{departments.length}</h2>
          <small>Registered departments</small>
        </div>

        <div className="department-stat-card">
          <div className="stat-top">
            <div className="stat-icon">👥</div>
            <span className="stat-label">WORKFORCE</span>
          </div>

          <p>Total Employees</p>
          <h2>{totalEmployees}</h2>
          <small>Across all departments</small>
        </div>

        <div className="department-stat-card">
          <div className="stat-top">
            <div className="stat-icon">📊</div>
            <span className="stat-label">PERFORMANCE</span>
          </div>

          <p>Average Performance</p>
          <h2>{averagePerformance}%</h2>
          <small>Overall department performance</small>
        </div>

      </section>

      {/* Add / Edit Form */}
      {showForm && (
        <form className="department-form" onSubmit={saveDepartment}>

          <div className="form-heading">
            <div>
              <span>DEPARTMENT MANAGEMENT</span>
              <h2>
                {editingId !== null
                  ? "Edit Department"
                  : "Create New Department"}
              </h2>
            </div>

            <button
              type="button"
              className="form-close"
              onClick={resetForm}
            >
              ✕
            </button>
          </div>

          <div className="department-form-fields">
            <input
              type="text"
              placeholder="Department Name"
              value={newDepartment.name}
              onChange={(e) =>
                setNewDepartment({
                  ...newDepartment,
                  name: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Manager Name"
              value={newDepartment.manager}
              onChange={(e) =>
                setNewDepartment({
                  ...newDepartment,
                  manager: e.target.value,
                })
              }
              required
            />

            <input
              type="number"
              min="0"
              placeholder="Number of Employees"
              value={newDepartment.employees}
              onChange={(e) =>
                setNewDepartment({
                  ...newDepartment,
                  employees: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="department-form-actions">
            <button type="submit">
              {editingId !== null ? "Update Department" : "Save Department"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Department Overview */}
      <section className="department-list">

        <div className="department-list-header">
          <div>
            <span className="section-eyebrow">COMPANY ORGANIZATION</span>
            <h2>Department Overview</h2>
            <p>Explore your departments and their current performance.</p>
          </div>

          <div className="department-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search departments or managers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="department-grid">

          {filteredDepartments.map((dept) => (
            <article className="department-card" key={dept.id}>

              <div className="department-card-top">
                <div className="department-icon">
                  {dept.icon}
                </div>

                <div className="department-actions">
                  <button
                    type="button"
                    className="edit-department"
                    onClick={() => editDepartment(dept)}
                    title="Edit department"
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    className="delete-department"
                    onClick={() => deleteDepartment(dept.id)}
                    title="Delete department"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <h3>{dept.name}</h3>

              <p className="department-manager">
                Department Manager
                <strong>{dept.manager}</strong>
              </p>

              <div className="department-card-divider"></div>

              <div className="department-employees">
                <span>👥 Team Members</span>
                <strong>{dept.employees}</strong>
              </div>

              <div className="department-performance">
                <div>
                  <span>Performance</span>
                  <strong>{dept.performance}%</strong>
                </div>

                <div className="department-progress">
                  <div
                    style={{
                      width: `${Math.min(dept.performance, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

            </article>
          ))}

          {filteredDepartments.length === 0 && (
            <p className="no-departments">
              No departments found.
            </p>
          )}

        </div>

        <div className="department-list-footer">
          Showing {filteredDepartments.length} of {departments.length} departments
        </div>

      </section>

    </div>
  );
}

export default Department;
