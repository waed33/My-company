import React, { useEffect, useState } from "react";
import "../design/Reports.css";

const templates = [
  {
    id: "executive",
    icon: "✦",
    name: "Executive Summary",
    description: "A high-level overview prepared for company leadership.",
    tag: "POPULAR",
  },
  {
    id: "department",
    icon: "▦",
    name: "Department Report",
    description: "A focused report for a selected department.",
    tag: "MANAGEMENT",
  },
  {
    id: "employee",
    icon: "♙",
    name: "Employee Report",
    description: "An employee-focused report for HR and management.",
    tag: "WORKFORCE",
  },
  {
    id: "project",
    icon: "◈",
    name: "Project Report",
    description: "A report covering project progress and delivery.",
    tag: "OPERATIONS",
  },
  {
    id: "financial",
    icon: "＄",
    name: "Financial Report",
    description: "A structured financial report for a selected period.",
    tag: "FINANCE",
  },
  {
    id: "attendance",
    icon: "◷",
    name: "Attendance Report",
    description: "Attendance, absences, and working-time overview.",
    tag: "WORKFORCE",
  },
  {
    id: "performance",
    icon: "★",
    name: "Performance Report",
    description: "Employee evaluations and performance scores.",
    tag: "PERFORMANCE",
  },
];

const reportTypes = templates.map((item) => item.name);

const departments = [
  "All Departments",
  "Information Technology",
  "Human Resources",
  "Finance",
  "Marketing",
  "Sales",
];

const STORAGE_KEY = "omnicore_generated_reports";

function Reports() {
  const [template, setTemplate] = useState("executive");
  const [reportType, setReportType] = useState("Executive Summary");
  const [department, setDepartment] = useState("All Departments");
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-11-05");
  const [reportName, setReportName] = useState("");

  const [generatedReports, setGeneratedReports] = useState(() => {
    try {
      const savedReports = localStorage.getItem(STORAGE_KEY);
      return savedReports ? JSON.parse(savedReports) : [];
    } catch {
      return [];
    }
  });

  const [previewReport, setPreviewReport] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  // SAVE REPORTS
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(generatedReports)
    );
  }, [generatedReports]);

  const selectedTemplate =
    templates.find((item) => item.id === template) || templates[0];

  // SELECT TEMPLATE
  const handleTemplate = (item) => {
    setTemplate(item.id);
    setReportType(item.name);
    setMessage("");
  };

  // CHANGE REPORT TYPE
  const handleReportType = (value) => {
    setReportType(value);

    const found = templates.find((item) => item.name === value);

    if (found) {
      setTemplate(found.id);
    }

    setMessage("");
  };

  // GENERATE REPORT
  const generateReport = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setMessage("Please select a start date and an end date.");
      return;
    }

    if (
      new Date(`${startDate}T00:00:00`) >
      new Date(`${endDate}T00:00:00`)
    ) {
      setMessage("The start date cannot be after the end date.");
      return;
    }

    const newReport = {
      id: Date.now(),
      name: reportName.trim() || `${reportType} - ${department}`,
      type: reportType,
      department,
      startDate,
      endDate,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "Ready",
      template,
    };

    setGeneratedReports((previous) => [
      newReport,
      ...previous,
    ]);

    setPreviewReport(newReport);
    setReportName("");
    setMessage("");
  };

  // DELETE REPORT
  const deleteReport = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmed) return;

    setGeneratedReports((previous) =>
      previous.filter((report) => report.id !== id)
    );

    if (previewReport?.id === id) {
      setPreviewReport(null);
    }
  };

  // SEARCH AND FILTER
  const filteredReports = generatedReports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(search.toLowerCase()) ||
      report.type.toLowerCase().includes(search.toLowerCase()) ||
      report.department.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || report.type === filter;

    return matchesSearch && matchesFilter;
  });

  // PRINT REPORT
  const printReport = () => {
    window.print();
  };

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "Not selected";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // HEADER BUTTON: SCROLL TO REPORT FORM
  const scrollToReportBuilder = () => {
    document.getElementById("report-builder")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="reports-page">

      {/* HEADER */}
      <header className="reports-header">
        <div className="reports-header-content">

          <div className="reports-breadcrumb">
            MANAGEMENT <span>/</span> REPORT CENTER
          </div>

          <span className="reports-subtitle">
            BUSINESS MANAGEMENT
          </span>

          <h1>
            REPORT CENTER<span>.</span>
          </h1>

          <p>
            Create, customize, and manage your company's business reports.
          </p>

          <button
            className="generate-header-btn"
            type="button"
            onClick={scrollToReportBuilder}
          >
            + Generate Report
          </button>

        </div>

        <div className="reports-header-right">
          <div className="reports-header-icon">▤</div>

          <div>
            <span>REPORT WORKSPACE</span>
            <strong>Omnicore Management</strong>
          </div>
        </div>
      </header>

      {/* TOP SUMMARY */}
      <section className="reports-overview-strip">

        <div>
          <span className="overview-strip-icon purple">▤</span>

          <div>
            <small>TOTAL GENERATED</small>
            <strong>{generatedReports.length}</strong>
          </div>
        </div>

        <div>
          <span className="overview-strip-icon green">✓</span>

          <div>
            <small>READY REPORTS</small>

            <strong>
              {
                generatedReports.filter(
                  (report) => report.status === "Ready"
                ).length
              }
            </strong>
          </div>
        </div>

        <div>
          <span className="overview-strip-icon orange">◷</span>

          <div>
            <small>LAST GENERATED</small>

            <strong>
              {generatedReports.length
                ? generatedReports[0].createdAt
                : "—"}
            </strong>
          </div>
        </div>

        <div className="reports-workspace-label">
          <span></span>
          WORKSPACE ACTIVE
        </div>

      </section>

      {/* TEMPLATE SELECTION */}
      <section className="reports-content-section">

        <div className="reports-section-title">

          <div>
            <span className="reports-eyebrow">
              01 / CHOOSE YOUR FORMAT
            </span>

            <h2>Start with a template.</h2>

            <p>
              Select a report structure that matches your business needs.
            </p>
          </div>

          <span className="reports-section-index">01</span>

        </div>

        <div className="report-templates-grid">

          {templates.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`report-template-card ${
                template === item.id ? "selected" : ""
              }`}
              onClick={() => handleTemplate(item)}
            >

              <div className="template-card-top">
                <span className="template-icon">
                  {item.icon}
                </span>

                <span className="template-tag">
                  {item.tag}
                </span>
              </div>

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <div className="template-card-bottom">

                <span>
                  {template === item.id
                    ? "SELECTED"
                    : "USE TEMPLATE"}
                </span>

                <span className="template-arrow">
                  {template === item.id ? "✓" : "↗"}
                </span>

              </div>

            </button>
          ))}

        </div>

      </section>

      {/* REPORT BUILDER */}
      <section className="reports-content-section">

        <div className="reports-section-title">

          <div>
            <span className="reports-eyebrow">
              02 / CUSTOMIZE YOUR REPORT
            </span>

            <h2>Build your report.</h2>

            <p>
              Set the details and reporting period before generating.
            </p>
          </div>

          <span className="reports-section-index">02</span>

        </div>

        <div className="report-builder-layout">

          <form
            id="report-builder"
            className="report-builder-form"
            onSubmit={generateReport}
          >

            <div className="builder-form-heading">

              <div className="builder-heading-icon">✦</div>

              <div>
                <h3>Report Configuration</h3>
                <p>Define the information you want to include.</p>
              </div>

            </div>

            <div className="report-form-grid">

              <div className="report-form-field full-width">

                <label>REPORT NAME</label>

                <input
                  type="text"
                  placeholder="e.g. November Executive Report"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />

              </div>

              <div className="report-form-field">

                <label>REPORT TYPE</label>

                <select
                  value={reportType}
                  onChange={(e) =>
                    handleReportType(e.target.value)
                  }
                >
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

              </div>

              <div className="report-form-field">

                <label>DEPARTMENT</label>

                <select
                  value={department}
                  onChange={(e) =>
                    setDepartment(e.target.value)
                  }
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

              </div>

              <div className="report-form-field">

                <label>START DATE</label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                  required
                />

              </div>

              <div className="report-form-field">

                <label>END DATE</label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {message && (
              <div className="report-form-message">
                {message}
              </div>
            )}

            <div className="builder-form-footer">

              <span>
                <i></i> Your report will be added to the archive.
              </span>

              <button type="submit">
                Generate Report <span>↗</span>
              </button>

            </div>

          </form>

          {/* LIVE CONFIGURATION PREVIEW */}
          <aside className="report-config-preview">

            <div className="config-preview-top">
              <span>LIVE PREVIEW</span>
              <span className="preview-status">● DRAFT</span>
            </div>

            <div className="config-document">

              <div className="document-brand">
                <span>O</span>
                <strong>OMNICORE</strong>
              </div>

              <div className="document-line"></div>

              <small>BUSINESS REPORT</small>

              <h3>{reportName || reportType}</h3>

              <p>{selectedTemplate.description}</p>

              <div className="document-details">

                <div>
                  <span>REPORT TYPE</span>
                  <strong>{reportType}</strong>
                </div>

                <div>
                  <span>DEPARTMENT</span>
                  <strong>{department}</strong>
                </div>

                <div>
                  <span>FROM</span>
                  <strong>{formatDate(startDate)}</strong>
                </div>

                <div>
                  <span>TO</span>
                  <strong>{formatDate(endDate)}</strong>
                </div>

              </div>

              <div className="document-decoration">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="document-footer">
                CONFIDENTIAL · INTERNAL USE ONLY
              </div>

            </div>

            <p className="preview-caption">
              Your report cover updates as you change the configuration.
            </p>

          </aside>

        </div>

      </section>

      {/* GENERATED REPORT ARCHIVE */}
      <section className="reports-content-section archive-section">

        <div className="reports-section-title">

          <div>
            <span className="reports-eyebrow">
              03 / REPORT MANAGEMENT
            </span>

            <h2>Your report archive.</h2>

            <p>
              Find, preview, and manage your generated reports.
            </p>
          </div>

          <span className="reports-section-index">03</span>

        </div>

        <div className="report-archive-panel">

          <div className="archive-toolbar">

            <div className="archive-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All report types</option>

              {reportTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

          </div>

          {filteredReports.length === 0 ? (

            <div className="reports-empty-state">

              <div className="empty-report-icon">▤</div>

              <h3>No reports found</h3>

              <p>
                {generatedReports.length === 0
                  ? "Your generated reports will appear here. Start by creating your first report."
                  : "Try changing your search or filter."}
              </p>

            </div>

          ) : (

            <div className="report-archive-list">

              {filteredReports.map((report) => (

                <div
                  className="archive-report-row"
                  key={report.id}
                >

                  <div className="archive-file-icon">PDF</div>

                  <div className="archive-report-info">
                    <strong>{report.name}</strong>

                    <span>
                      {report.type} · {report.department}
                    </span>
                  </div>

                  <div className="archive-report-date">
                    <small>GENERATED</small>
                    <span>{report.createdAt}</span>
                  </div>

                  <span className="archive-ready-status">
                    <i></i> {report.status}
                  </span>

                  <div className="archive-actions">

                    <button
                      type="button"
                      title="Preview report"
                      onClick={() => setPreviewReport(report)}
                    >
                      View
                    </button>

                    <button
                      type="button"
                      title="Delete report"
                      className="archive-delete"
                      onClick={() => deleteReport(report.id)}
                    >
                      ×
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

          <div className="archive-footer">

            <span>
              Showing {filteredReports.length} of {generatedReports.length} reports
            </span>

            <span>OMNICORE DOCUMENT WORKSPACE</span>

          </div>

        </div>

      </section>

      {/* PREVIEW MODAL */}
      {previewReport && (

        <div
          className="report-modal-overlay"
          onClick={() => setPreviewReport(null)}
        >

          <div
            className="report-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="report-modal-header">

              <div>
                <span>REPORT PREVIEW</span>
                <h2>{previewReport.name}</h2>
              </div>

              <button
                type="button"
                onClick={() => setPreviewReport(null)}
              >
                ×
              </button>

            </div>

            <div className="report-modal-document">

              <div className="modal-document-brand">
                <span>O</span>
                <strong>OMNICORE MANAGEMENT</strong>
              </div>

              <div className="modal-document-rule"></div>

              <span className="modal-document-kicker">
                {previewReport.type.toUpperCase()}
              </span>

              <h2>{previewReport.name}</h2>

              <p>
                This report has been prepared for the selected reporting
                period and department.
              </p>

              <div className="modal-document-grid">

                <div>
                  <small>REPORT TYPE</small>
                  <strong>{previewReport.type}</strong>
                </div>

                <div>
                  <small>DEPARTMENT</small>
                  <strong>{previewReport.department}</strong>
                </div>

                <div>
                  <small>START DATE</small>
                  <strong>{formatDate(previewReport.startDate)}</strong>
                </div>

                <div>
                  <small>END DATE</small>
                  <strong>{formatDate(previewReport.endDate)}</strong>
                </div>

                <div>
                  <small>GENERATED ON</small>
                  <strong>{previewReport.createdAt}</strong>
                </div>

                <div>
                  <small>STATUS</small>
                  <strong className="modal-ready">
                    {previewReport.status}
                  </strong>
                </div>

              </div>

              <div className="modal-document-note">

                <strong>Report configuration</strong>

                <p>
                  Template:{" "}
                  {
                    templates.find(
                      (item) => item.id === previewReport.template
                    )?.name
                  }
                </p>

                <p>
                  This is currently a report configuration preview.
                  Connecting the report to the company's live data and
                  database is a separate step.
                </p>

              </div>

              <div className="modal-document-bottom">
                CONFIDENTIAL · OMNICORE MANAGEMENT
              </div>

            </div>

            <div className="report-modal-footer">

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setPreviewReport(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="modal-print-btn"
                onClick={printReport}
              >
                Print / Save PDF ↗
              </button>

            </div>

          </div>

        </div>

      )}

      {/* FOOTER */}
      <footer className="reports-page-footer">
        <span>© 2026 OMNICORE MANAGEMENT</span>
        <span>REPORT CENTER · CONFIDENTIAL</span>
      </footer>

    </div>
  );
}

export default Reports;