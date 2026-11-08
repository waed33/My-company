
import React, { useState, useEffect } from "react";
import "../design/Projects.css";

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesigning the company's main website.",
    manager: "John Smith",
    team: 8,
    budget: 15000,
    spent: 10500,
    deadline: "2026-11-12",
    progress: 78,
    status: "In Progress",
    color: "purple",
    icon: "🌐",
  },
  {
    id: 2,
    name: "Mobile Application",
    description: "Developing a new mobile experience.",
    manager: "Sarah Wilson",
    team: 6,
    budget: 22000,
    spent: 9000,
    deadline: "2026-11-20",
    progress: 45,
    status: "In Progress",
    color: "blue",
    icon: "📱",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Launching the new company campaign.",
    manager: "David Brown",
    team: 5,
    budget: 8000,
    spent: 6500,
    deadline: "2026-11-08",
    progress: 35,
    status: "Review",
    color: "pink",
    icon: "📢",
  },
  {
    id: 4,
    name: "Financial System",
    description: "Improving internal financial operations.",
    manager: "Emily Davis",
    team: 4,
    budget: 12000,
    spent: 4000,
    deadline: "2026-12-05",
    progress: 20,
    status: "Planning",
    color: "green",
    icon: "💼",
  },
  {
    id: 5,
    name: "Employee Portal",
    description: "Building an internal employee platform.",
    manager: "Michael Lee",
    team: 7,
    budget: 10000,
    spent: 10000,
    deadline: "2026-10-25",
    progress: 100,
    status: "Completed",
    color: "orange",
    icon: "👥",
  },
];

const stages = ["Planning", "In Progress", "Review", "Completed"];

function Projects() {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("omnicore_projects");

    if (savedProjects) {
      try {
        return JSON.parse(savedProjects);
      } catch {
        return initialProjects;
      }
    }

    return initialProjects;
  });

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    manager: "",
    budget: "",
    deadline: "",
  });

  // Save projects in localStorage
  useEffect(() => {
    localStorage.setItem("omnicore_projects", JSON.stringify(projects));
  }, [projects]);

  // Calculate statistics
  const totalBudget = projects.reduce(
    (sum, p) => sum + Number(p.budget), 0
  );

  const totalSpent = projects.reduce(
    (sum, p) => sum + Number(p.spent), 0
  );

  const completed = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const delayed = projects.filter(
    (p) =>
      p.status !== "Completed" &&
      new Date(p.deadline + "T23:59:59") < new Date()
  ).length;

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.manager.toLowerCase().includes(search.toLowerCase())
  );

  // Reset form
  const resetForm = () => {
    setNewProject({
      name: "",
      description: "",
      manager: "",
      budget: "",
      deadline: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Add or Update Project
  const addProject = (e) => {
    e.preventDefault();

    const projectData = {
      ...newProject,
      budget: Number(newProject.budget),
    };

    if (editingId !== null) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...projectData }
            : p
        )
      );
    } else {
      const project = {
        id: Date.now(),
        ...projectData,
        spent: 0,
        team: 1,
        progress: 0,
        status: "Planning",
        color: "blue",
        icon: "🚀",
      };

      setProjects((prev) => [...prev, project]);
    }

    resetForm();
  };

  // Edit Project
  const editProject = (project) => {
    setNewProject({
      name: project.name,
      description: project.description,
      manager: project.manager,
      budget: project.budget,
      deadline: project.deadline,
    });

    setEditingId(project.id);
    setSelectedProject(null);
    setShowForm(true);
  };

  // Change Project Stage
  const changeStage = (id, status) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              progress:
                status === "Completed" ? 100 : p.progress,
            }
          : p
      )
    );

    setSelectedProject((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            status,
            progress:
              status === "Completed" ? 100 : prev.progress,
          }
        : prev
    );
  };

  // Delete Project
  const deleteProject = (id) => {
    if (window.confirm("Delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setSelectedProject(null);
    }
  };

  const money = (value) =>
    "$" + Number(value).toLocaleString("en-US");

  const formatDate = (date) =>
    new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="projects-page">

      {/* HEADER */}

      <div className="projects-topbar">
        <div>
          <span className="projects-eyebrow">WORKSPACE / PROJECTS</span>
          <h1>Project Center<span>.</span></h1>
          <p>Plan smarter. Track progress. Deliver excellence.</p>
        </div>

        <button
          className="project-create-btn"
          onClick={() => {
            setEditingId(null);
            setNewProject({
              name: "",
              description: "",
              manager: "",
              budget: "",
              deadline: "",
            });
            setShowForm(true);
          }}
        >
          <span>＋</span> Create Project
        </button>
      </div>

      
      {/* FEATURED PROJECT */}

      <section className="featured-project">
        <div className="featured-content">
          <div className="featured-label">
            <span></span> FEATURED PROJECT
          </div>

          <h2>Build what's next.</h2>
          <p>
            Keep your teams aligned and your business moving forward.
            Your projects, all in one place.
          </p>

          <div className="featured-numbers">
            <div>
              <small>Total Budget</small>
              <strong>{money(totalBudget)}</strong>
            </div>
            <div>
              <small>Amount Spent</small>
              <strong>{money(totalSpent)}</strong>
            </div>
            <div>
              <small>Remaining</small>
              <strong>{money(totalBudget - totalSpent)}</strong>
            </div>
          </div>
        </div>

        <div className="featured-visual">
          <div className="featured-orbit orbit-one"></div>
          <div className="featured-orbit orbit-two"></div>
          <div className="featured-center">✦</div>
          <div className="orbit-dot dot-one"></div>
          <div className="orbit-dot dot-two"></div>
          <div className="orbit-dot dot-three"></div>
        </div>
      </section>
{/* OVERVIEW STRIP */}

      <div className="project-overview">

        <div className="overview-item">
          <span className="overview-icon purple-icon">▦</span>
          <div>
            <small>Total Projects</small>
            <h2>{projects.length}</h2>
          </div>
        </div>

        <div className="overview-item">
          <span className="overview-icon blue-icon">◉</span>
          <div>
            <small>In Progress</small>
            <h2>
              {projects.filter(p => p.status === "In Progress").length}
            </h2>
          </div>
        </div>

        <div className="overview-item">
          <span className="overview-icon green-icon">✓</span>
          <div>
            <small>Completed</small>
            <h2>{completed}</h2>
          </div>
        </div>

        <div className="overview-item">
          <span className="overview-icon orange-icon">◷</span>
          <div>
            <small>Past Deadline</small>
            <h2>{delayed}</h2>
          </div>
        </div>

      </div>

      {/* BOARD HEADER */}

      <div className="project-board-heading">
        <div>
          <span className="projects-eyebrow">LIVE WORKSPACE</span>
          <h2>Project Pipeline</h2>
          <p>Monitor every stage of your company's work.</p>
        </div>

        <input
          className="project-search"
          type="text"
          placeholder="⌕  Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* KANBAN BOARD */}

      <div className="project-board">

        {stages.map((stage) => {
          const stageProjects = filteredProjects.filter(
            (p) => p.status === stage
          );

          return (
            <div className="project-column" key={stage}>

              <div className="column-heading">
                <div>
                  <span
                    className={`stage-dot ${stage.toLowerCase().replace(" ", "-")}`}
                  ></span>
                  <h3>{stage}</h3>
                  <span className="column-count">
                    {stageProjects.length}
                  </span>
                </div>
              </div>

              <div className="project-column-content">

                {stageProjects.map((project) => (
                  <div
                    className={`project-task-card ${project.color}`}
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                  >

                    <div className="task-card-top">
                      <span className={`task-project-icon ${project.color}`}>
                        {project.icon}
                      </span>

                      <button
                        className="task-delete"
                        title="Delete project"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                      >
                        ⋯
                      </button>
                    </div>

                    <h4>{project.name}</h4>

                    <p className="task-description">
                      {project.description}
                    </p>

                    <div className="task-progress-info">
                      <span>Progress</span>
                      <strong>{project.progress}%</strong>
                    </div>

                    <div className="task-progress-bar">
                      <div
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>

                    <div className="task-card-footer">
                      <div className="task-manager">
                        <span className="manager-avatar">
                          {project.manager
                            .split(" ")
                            .map(n => n[0])
                            .join("")}
                        </span>
                        <span>{project.manager}</span>
                      </div>

                      <span className="task-deadline">
                        ◷ {formatDate(project.deadline)}
                      </span>
                    </div>

                  </div>
                ))}

                {stageProjects.length === 0 && (
                  <div className="empty-column">
                    No projects here
                  </div>
                )}

              </div>
            </div>
          );
        })}

      </div>

      {/* BUDGET AND DEADLINES */}

      <div className="project-bottom-grid">

        <section className="project-insight-card">
          <div className="section-title">
            <div>
              <span className="projects-eyebrow">FINANCIAL OVERVIEW</span>
              <h3>Budget Utilization</h3>
            </div>
            <span className="insight-icon">◈</span>
          </div>

          <div className="budget-visual">
            <div
              className="budget-circle"
              style={{
                "--budget-progress": `${
                  totalBudget
                    ? Math.min((totalSpent / totalBudget) * 100, 100)
                    : 0
                }%`,
              }}
            >
              <div>
                <strong>
                  {totalBudget
                    ? Math.round((totalSpent / totalBudget) * 100)
                    : 0}%
                </strong>
                <small>Utilized</small>
              </div>
            </div>

            <div className="budget-legend">
              <div>
                <span className="legend-dot spent-dot"></span>
                <span>Spent</span>
                <strong>{money(totalSpent)}</strong>
              </div>

              <div>
                <span className="legend-dot remaining-dot"></span>
                <span>Remaining</span>
                <strong>{money(totalBudget - totalSpent)}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="project-insight-card">
          <div className="section-title">
            <div>
              <span className="projects-eyebrow">STAY ON TRACK</span>
              <h3>Upcoming Deadlines</h3>
            </div>
            <span className="insight-icon">◷</span>
          </div>

          <div className="deadline-list">
            {projects
              .filter(p => p.status !== "Completed")
              .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
              .slice(0, 4)
              .map((p) => (
                <div className="deadline-item" key={p.id}>
                  <div className="deadline-date">
                    <strong>
                      {new Date(p.deadline + "T00:00:00").getDate()}
                    </strong>
                    <small>
                      {new Date(p.deadline + "T00:00:00").toLocaleDateString(
                        "en-US",
                        { month: "short" }
                      )}
                    </small>
                  </div>

                  <div className="deadline-info">
                    <strong>{p.name}</strong>
                    <small>{p.manager}</small>
                  </div>

                  <span
                    className={`deadline-status ${
                      new Date(p.deadline + "T23:59:59") < new Date()
                        ? "late"
                        : "upcoming"
                    }`}
                  >
                    {new Date(p.deadline + "T23:59:59") < new Date()
                      ? "Overdue"
                      : "Upcoming"}
                  </span>
                </div>
              ))}

            {projects.filter(p => p.status !== "Completed").length === 0 && (
              <p className="no-deadlines">No upcoming deadlines.</p>
            )}
          </div>
        </section>

      </div>

      {/* CREATE / EDIT PROJECT MODAL */}

      {showForm && (
        <div className="project-modal-overlay">
          <form className="project-modal" onSubmit={addProject}>

            <div className="modal-heading">
              <div>
                <span className="projects-eyebrow">NEW WORKSPACE</span>
                <h2>
                  {editingId !== null ? "Edit Project" : "Create a Project"}
                </h2>
              </div>

              <button type="button" onClick={resetForm}>
                ✕
              </button>
            </div>

            <label>Project Name</label>
            <input
              value={newProject.name}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  name: e.target.value,
                })
              }
              placeholder="Enter project name"
              required
            />

            <label>Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  description: e.target.value,
                })
              }
              placeholder="What is this project about?"
              required
            />

            <label>Project Manager</label>
            <input
              value={newProject.manager}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  manager: e.target.value,
                })
              }
              placeholder="Enter manager name"
              required
            />

            <div className="modal-fields">
              <div>
                <label>Budget ($)</label>
                <input
                  type="number"
                  min="0"
                  value={newProject.budget}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      budget: e.target.value,
                    })
                  }
                  placeholder="15000"
                  required
                />
              </div>

              <div>
                <label>Deadline</label>
                <input
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      deadline: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <button type="submit" className="modal-submit">
              {editingId !== null
                ? "Update Project →"
                : "Create Project →"}
            </button>

          </form>
        </div>
      )}

      {/* PROJECT DETAILS MODAL */}

      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-details-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="details-close"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <span className="projects-eyebrow">PROJECT DETAILS</span>

            <h2>{selectedProject.name}</h2>
            <p>{selectedProject.description}</p>

            <div className="details-grid">
              <div>
                <small>Manager</small>
                <strong>{selectedProject.manager}</strong>
              </div>

              <div>
                <small>Team Members</small>
                <strong>{selectedProject.team} Members</strong>
              </div>

              <div>
                <small>Project Budget</small>
                <strong>{money(selectedProject.budget)}</strong>
              </div>

              <div>
                <small>Amount Spent</small>
                <strong>{money(selectedProject.spent)}</strong>
              </div>

              <div>
                <small>Deadline</small>
                <strong>{formatDate(selectedProject.deadline)}</strong>
              </div>

              <div>
                <small>Progress</small>
                <strong>{selectedProject.progress}%</strong>
              </div>
            </div>

            <label className="details-label">Move Project To</label>

            <select
              value={selectedProject.status}
              onChange={(e) =>
                changeStage(selectedProject.id, e.target.value)
              }
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>

            <button
              className="details-done"
              onClick={() => editProject(selectedProject)}
            >
              Edit Project
            </button>

            <button
              className="details-done"
              onClick={() => setSelectedProject(null)}
            >
              Done
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Projects;

