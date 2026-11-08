
import React from "react";
import "../design/dashbord.css";

function Dashbord() {
  const stats = [
    { title: "Total Employees", value: "248", change: "+12 this month", icon: "👥" },
    { title: "Total Revenue", value: "$84,500", change: "+8.5% this month", icon: "💰" },
    { title: "Total Expenses", value: "$23,800", change: "This month", icon: "💳" },
    { title: "Net Profit", value: "$60,700", change: "+12.4% this month", icon: "📈" },
    { title: "Active Projects", value: "36", change: "8 near deadline", icon: "📁" },
    { title: "Pending Tasks", value: "24", change: "Needs attention", icon: "📋" },
  ];

  const departments = [
    { name: "IT Department", employees: 45, performance: 92 },
    { name: "Finance", employees: 28, performance: 85 },
    { name: "Marketing", employees: 36, performance: 88 },
    { name: "HR Department", employees: 20, performance: 90 },
    { name: "Sales", employees: 55, performance: 78 },
  ];

  const projects = [
    { name: "Website Development", manager: "John Smith", progress: 85, status: "In Progress" },
    { name: "Mobile Application", manager: "Sarah Wilson", progress: 60, status: "In Progress" },
    { name: "Marketing Campaign", manager: "David Brown", progress: 35, status: "Delayed" },
    { name: "System Upgrade", manager: "Emily Davis", progress: 100, status: "Completed" },
  ];

  const activities = [
    "New employee added to IT Department",
    "Website Development project updated",
    "Monthly financial report generated",
    "Marketing department submitted a report",
  ];

  return (
    <div className="dashbord-container">

     <div className="dashboard-welcome">
  <div className="welcome-top">
    <span>OMNICORE MANAGEMENT</span>
    <span className="welcome-line"></span>
  </div>

  <h1>Executive Overview</h1>

  <p>Welcome back! Here's your company at a glance.</p>

  <div className="welcome-bottom">
    <span>LEADERSHIP</span>
    <span>•</span>
    <span>PERFORMANCE</span>
    <span>•</span>
    <span>GROWTH</span>
  </div>
</div>

      <section id="overview">
        <div className="section-heading">
          <h2>Company Overview</h2>
          <span>November 2026</span>
        </div>

        <div className="stats-grid">
          {stats.map((item, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-top">
                <span>{item.title}</span>
                <span className="stat-icon">{item.icon}</span>
              </div>
              <h2>{item.value}</h2>
              <p>{item.change}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="middle-grid">
        <div className="content-card">
          <h2>Company Growth</h2>
          <p className="muted">Monthly company growth overview</p>

          <div className="growth-number">+18.5%</div>
          <p className="positive">↑ Growth compared to last year</p>

          <div className="growth-bars">
            {[45, 60, 52, 75, 68, 85, 72, 90, 78, 95, 82, 100].map((height, i) => (
              <div className="bar-column" key={i}>
                <div className="bar" style={{ height: `${height}%` }}></div>
                <small>{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card" id="finance">
          <h2>Financial Summary</h2>
          <p className="muted">Current financial situation</p>

          <div className="finance-item">
            <span>Total Income</span>
            <strong>$84,500</strong>
          </div>
          <div className="finance-item">
            <span>Total Expenses</span>
            <strong>$23,800</strong>
          </div>
          <div className="finance-item">
            <span>Net Profit</span>
            <strong className="positive">$60,700</strong>
          </div>
          <div className="profit-progress">
            <div></div>
          </div>
          <p className="muted">Profit margin: 71.8%</p>
        </div>
      </section>

      <section className="content-card" id="departments">
        <div className="section-heading">
          <h2>Department Performance</h2>
          <span>View all departments</span>
        </div>

        {departments.map((dept, index) => (
          <div className="department-row" key={index}>
            <div className="department-info">
              <strong>{dept.name}</strong>
              <span>{dept.employees} Employees</span>
            </div>
            <div className="performance-track">
              <div style={{ width: `${dept.performance}%` }}></div>
            </div>
            <strong>{dept.performance}%</strong>
          </div>
        ))}
      </section>

      <section className="content-card" id="projects">
        <div className="section-heading">
          <h2>Project Management</h2>
          <span>All projects</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Manager</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td>{project.manager}</td>
                  <td>
                    <div className="project-progress">
                      <div style={{ width: `${project.progress}%` }}></div>
                    </div>
                    {project.progress}%
                  </td>
                  <td>
                    <span className={`status ${project.status.toLowerCase().replace(" ", "-")}`}>
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="content-card" id="notifications">
          <h2>Recent Activities</h2>
          {activities.map((activity, index) => (
            <div className="activity-item" key={index}>
              <span className="activity-dot"></span>
              <p>{activity}</p>
            </div>
          ))}
        </div>

        <div className="content-card">
          <h2>Upcoming Deadlines</h2>
          <div className="deadline-item">
            <div>
              <strong>Website Development</strong>
              <p>Project Deadline</p>
            </div>
            <span>Nov 10</span>
          </div>
          <div className="deadline-item">
            <div>
              <strong>Mobile Application</strong>
              <p>Project Deadline</p>
            </div>
            <span>Nov 15</span>
          </div>
          <div className="deadline-item">
            <div>
              <strong>Financial Report</strong>
              <p>Report Submission</p>
            </div>
            <span>Nov 20</span>
          </div>
        </div>
      </section>

      <footer className="dashboard-footer">
        © 2026 Management System. All rights reserved.
      </footer>

    </div>
  );
}

export default Dashbord;
