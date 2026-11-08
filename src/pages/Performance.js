
import React, { useState, useEffect } from "react";
import "../design/Performance.css";

const initialReviews = [
  {
    id: 1,
    name: "Sarah Wilson",
    role: "HR Manager",
    department: "Human Resources",
    score: 96,
    level: "Excellent",
    initials: "SW",
    color: "violet",
  },
  {
    id: 2,
    name: "John Smith",
    role: "IT Manager",
    department: "IT",
    score: 93,
    level: "Excellent",
    initials: "JS",
    color: "blue",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Accountant",
    department: "Finance",
    score: 89,
    level: "Very Good",
    initials: "ED",
    color: "orange",
  },
  {
    id: 4,
    name: "Michael Lee",
    role: "Sales Executive",
    department: "Sales",
    score: 86,
    level: "Very Good",
    initials: "ML",
    color: "green",
  },
  {
    id: 5,
    name: "David Brown",
    role: "Marketing Specialist",
    department: "Marketing",
    score: 78,
    level: "Good",
    initials: "DB",
    color: "pink",
  },
];

const initialGoals = [
  {
    title: "Increase team productivity",
    owner: "Operations",
    progress: 84,
    deadline: "Nov 20, 2026",
    color: "purple",
  },
  {
    title: "Improve customer satisfaction",
    owner: "Customer Support",
    progress: 72,
    deadline: "Nov 25, 2026",
    color: "blue",
  },
  {
    title: "Complete employee training",
    owner: "Human Resources",
    progress: 91,
    deadline: "Nov 15, 2026",
    color: "green",
  },
  {
    title: "Deliver project milestones",
    owner: "IT Department",
    progress: 65,
    deadline: "Dec 05, 2026",
    color: "orange",
  },
];

const departmentInfo = [
  {
    name: "IT Department",
    department: "IT",
    color: "violet",
    icon: "💻",
  },
  {
    name: "Human Resources",
    department: "Human Resources",
    color: "blue",
    icon: "👥",
  },
  {
    name: "Finance",
    department: "Finance",
    color: "green",
    icon: "💼",
  },
  {
    name: "Sales",
    department: "Sales",
    color: "orange",
    icon: "📈",
  },
  {
    name: "Marketing",
    department: "Marketing",
    color: "pink",
    icon: "📣",
  },
];

function Performance() {
  const [department, setDepartment] = useState("All Departments");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load reviews from localStorage
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("omnicore_reviews");

    if (savedReviews) {
      try {
        return JSON.parse(savedReviews);
      } catch {
        return initialReviews;
      }
    }

    return initialReviews;
  });

  // Save reviews whenever they change
  useEffect(() => {
    localStorage.setItem("omnicore_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    department: "IT",
    score: "",
  });

  const goals = initialGoals;

  // Search and department filtering
  const filteredReviews = reviews.filter((review) => {
    const matchesDepartment =
      department === "All Departments" ||
      review.department === department;

    const matchesSearch =
      review.name.toLowerCase().includes(search.toLowerCase()) ||
      review.role.toLowerCase().includes(search.toLowerCase());

    return matchesDepartment && matchesSearch;
  });

  // Overall average score
  const averageScore = reviews.length
    ? Math.round(
        reviews.reduce(
          (sum, review) => sum + Number(review.score),
          0
        ) / reviews.length
      )
    : 0;

  // Number of employees with score >= 90
  const topPerformers = reviews.filter(
    (review) => Number(review.score) >= 90
  ).length;

  // Performance level based on score
  const getLevel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    return "Needs Improvement";
  };

  // Reset modal
  const resetReviewForm = () => {
    setNewReview({
      name: "",
      role: "",
      department: "IT",
      score: "",
    });

    setEditingId(null);
    setShowModal(false);
  };

  // Add or update review
  const addReview = (e) => {
    e.preventDefault();

    const score = Number(newReview.score);

    if (
      !newReview.name.trim() ||
      !newReview.role.trim() ||
      newReview.score === "" ||
      score < 0 ||
      score > 100
    ) {
      return;
    }

    const nameParts = newReview.name.trim().split(/\s+/);

    const initials = nameParts
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    const level = getLevel(score);

    const colors = ["violet", "blue", "green", "orange", "pink"];

    if (editingId !== null) {
      // Update existing evaluation
      setReviews((previousReviews) =>
        previousReviews.map((review) =>
          review.id === editingId
            ? {
                ...review,
                ...newReview,
                name: newReview.name.trim(),
                role: newReview.role.trim(),
                score,
                initials,
                level,
              }
            : review
        )
      );
    } else {
      // Add new evaluation
      const newEvaluation = {
        id: Date.now(),
        ...newReview,
        name: newReview.name.trim(),
        role: newReview.role.trim(),
        score,
        initials,
        color: colors[reviews.length % colors.length],
        level,
      };

      setReviews((previousReviews) => [
        newEvaluation,
        ...previousReviews,
      ]);
    }

    resetReviewForm();
  };

  // Open edit modal
  const editReview = (review) => {
    setNewReview({
      name: review.name,
      role: review.role,
      department: review.department,
      score: String(review.score),
    });

    setEditingId(review.id);
    setShowModal(true);
  };

  // Delete review
  const deleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this evaluation?")) {
      setReviews((previousReviews) =>
        previousReviews.filter((review) => review.id !== id)
      );
    }
  };

  // Department performance calculated from reviews
  const departments = departmentInfo
    .map((dept) => {
      const departmentReviews = reviews.filter(
        (review) => review.department === dept.department
      );

      const score = departmentReviews.length
        ? Math.round(
            departmentReviews.reduce(
              (sum, review) => sum + Number(review.score),
              0
            ) / departmentReviews.length
          )
        : 0;

      return {
        ...dept,
        score,
        reviewCount: departmentReviews.length,
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="performance-page">

      {/* HERO */}
      <section className="performance-hero">
        <div className="performance-hero-content">
          <div className="performance-overline">
            <span className="live-dot"></span>
            COMPANY INTELLIGENCE / PERFORMANCE
          </div>

          <h1>
            People drive results.
            <br />
            <span>We measure the impact.</span>
          </h1>

          <p>
            A complete view of employee performance, team achievements,
            and organizational goals.
          </p>

          <div className="performance-hero-footer">
            <div className="hero-period">
              <span>REPORTING PERIOD</span>
              <strong>November 2026</strong>
            </div>

            <div className="hero-period">
              <span>EMPLOYEES REVIEWED</span>
              <strong>{reviews.length} Employees</strong>
            </div>
          </div>
        </div>

        <div className="hero-score-card">
          <div className="hero-score-heading">
            <span>OVERALL SCORE</span>
            <span className="score-trend">↗ +6.4%</span>
          </div>

          <div
            className="performance-gauge"
            style={{ "--score": `${averageScore}%` }}
          >
            <div className="performance-gauge-inner">
              <strong>{averageScore}</strong>
              <span>out of 100</span>
            </div>
          </div>

          <div className="hero-score-bottom">
            <span className="score-status-dot"></span>
            <strong>
              {averageScore >= 90
                ? "Excellent Performance"
                : averageScore >= 80
                ? "Very Good Performance"
                : averageScore >= 70
                ? "Good Performance"
                : "Needs Improvement"}
            </strong>
          </div>

          <p>Company-wide performance index</p>
        </div>

        <div className="hero-decoration hero-decoration-one"></div>
        <div className="hero-decoration hero-decoration-two"></div>
      </section>

      {/* QUICK INSIGHTS */}
      <section className="performance-insights">
        <div className="insight-item">
          <div className="insight-icon purple">♙</div>
          <div>
            <span>Employees Evaluated</span>
            <strong>{reviews.length}</strong>
            <small>Current review cycle</small>
          </div>
        </div>

        <div className="insight-item">
          <div className="insight-icon green">✦</div>
          <div>
            <span>Top Performance</span>
            <strong>{topPerformers}</strong>
            <small>Score of 90 or higher</small>
          </div>
        </div>

        <div className="insight-item">
          <div className="insight-icon blue">◎</div>
          <div>
            <span>Average Score</span>
            <strong>{averageScore}%</strong>
            <small>Across evaluated employees</small>
          </div>
        </div>

        <div className="insight-item">
          <div className="insight-icon orange">⚑</div>
          <div>
            <span>Active Goals</span>
            <strong>{goals.length}</strong>
            <small>Company objectives</small>
          </div>
        </div>
      </section>

      {/* DEPARTMENT PERFORMANCE */}
      <section className="performance-section">
        <div className="performance-section-heading">
          <div>
            <span className="section-kicker">TEAM ANALYTICS</span>
            <h2>Department Performance</h2>
            <p>
              See how each department is performing across the company.
            </p>
          </div>

          <span className="section-tag">2026 OVERVIEW</span>
        </div>

        <div className="department-performance-grid">
          {departments.map((dept, index) => (
            <div className="department-performance-card" key={dept.name}>
              <div className="department-card-top">
                <div className={`department-icon ${dept.color}`}>
                  {dept.icon}
                </div>

                <span className="department-rank">
                  #{index + 1}
                </span>
              </div>

              <h3>{dept.name}</h3>

              <div className="department-score-row">
                <strong>{dept.score}</strong>
                <span>/ 100</span>
                <small>{dept.reviewCount} Reviews</small>
              </div>

              <div className="department-progress">
                <div
                  className={dept.color}
                  style={{ width: `${dept.score}%` }}
                ></div>
              </div>

              <span className="department-performance-label">
                Performance index
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* GOALS */}
      <section className="performance-section goals-section">
        <div className="performance-section-heading">
          <div>
            <span className="section-kicker">STRATEGIC EXECUTION</span>
            <h2>Goals & Achievements</h2>
            <p>
              Track progress toward the company's strategic targets.
            </p>
          </div>

          <span className="goals-count">
            {goals.length} Active Goals
          </span>
        </div>

        <div className="goals-grid">
          {goals.map((goal, index) => (
            <div className="goal-card" key={goal.title}>
              <div className="goal-card-top">
                <span className={`goal-number ${goal.color}`}>
                  0{index + 1}
                </span>

                <span className="goal-percentage">
                  {goal.progress}%
                </span>
              </div>

              <h3>{goal.title}</h3>
              <p>{goal.owner}</p>

              <div className="goal-progress-track">
                <div
                  className={goal.color}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>

              <div className="goal-card-bottom">
                <span>Target completion</span>
                <strong>{goal.deadline}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMPLOYEE REVIEWS */}
      <section className="performance-section reviews-section">
        <div className="performance-section-heading reviews-heading">
          <div>
            <span className="section-kicker">PEOPLE & DEVELOPMENT</span>
            <h2>Performance Reviews</h2>
            <p>
              Employee evaluations and individual performance scores.
            </p>
          </div>

          <button
            className="add-review-btn"
            onClick={() => {
              resetReviewForm();
              setShowModal(true);
            }}
          >
            + New Evaluation
          </button>
        </div>

        <div className="review-toolbar">
          <div className="review-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search employee or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option>All Departments</option>
            <option>IT</option>
            <option>Human Resources</option>
            <option>Finance</option>
            <option>Sales</option>
            <option>Marketing</option>
          </select>
        </div>

        <div className="reviews-list">
          {filteredReviews
            .slice()
            .sort((a, b) => b.score - a.score)
            .map((review, index) => (
              <div className="review-row" key={review.id}>
                <div className="review-rank">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className={`review-avatar ${review.color}`}>
                  {review.initials}
                </div>

                <div className="review-employee">
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </div>

                <div className="review-department">
                  <span>DEPARTMENT</span>
                  <strong>{review.department}</strong>
                </div>

                <div className="review-score">
                  <div>
                    <strong>{review.score}</strong>
                    <span>/100</span>
                  </div>

                  <div className="review-score-track">
                    <div
                      style={{ width: `${review.score}%` }}
                    ></div>
                  </div>
                </div>

                <span
                  className={`review-level ${
                    review.score >= 90
                      ? "excellent"
                      : review.score >= 80
                      ? "very-good"
                      : review.score >= 70
                      ? "good"
                      : "needs-improvement"
                  }`}
                >
                  {review.level}
                </span>

                <button
                  type="button"
                  className="review-edit"
                  onClick={() => editReview(review)}
                  title="Edit evaluation"
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="review-delete"
                  onClick={() => deleteReview(review.id)}
                  title="Delete evaluation"
                >
                  ×
                </button>
              </div>
            ))}

          {filteredReviews.length === 0 && (
            <div className="reviews-empty">
              No employee evaluations found.
            </div>
          )}
        </div>
      </section>

      {/* ADD / EDIT EVALUATION MODAL */}
      {showModal && (
        <div
          className="performance-modal-overlay"
          onClick={resetReviewForm}
        >
          <div
            className="performance-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="performance-modal-heading">
              <div>
                <span className="section-kicker">
                  PEOPLE DEVELOPMENT
                </span>

                <h2>
                  {editingId !== null
                    ? "Edit Evaluation"
                    : "New Evaluation"}
                </h2>

                <p>
                  {editingId !== null
                    ? "Update the employee performance record."
                    : "Create a performance record for an employee."}
                </p>
              </div>

              <button
                type="button"
                className="performance-modal-close"
                onClick={resetReviewForm}
              >
                ×
              </button>
            </div>

            <form onSubmit={addReview}>
              <label>Employee Name</label>

              <input
                type="text"
                placeholder="Enter full name"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    name: e.target.value,
                  })
                }
                required
              />

              <label>Job Position</label>

              <input
                type="text"
                placeholder="Enter job position"
                value={newReview.role}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    role: e.target.value,
                  })
                }
                required
              />

              <label>Department</label>

              <select
                value={newReview.department}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    department: e.target.value,
                  })
                }
              >
                <option value="IT">IT</option>
                <option value="Human Resources">
                  Human Resources
                </option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>

              <label>Performance Score (0–100)</label>

              <input
                type="number"
                min="0"
                max="100"
                placeholder="Enter score"
                value={newReview.score}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    score: e.target.value,
                  })
                }
                required
              />

              <div className="performance-modal-actions">
                <button
                  type="button"
                  className="performance-cancel-btn"
                  onClick={resetReviewForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="performance-save-btn"
                >
                  {editingId !== null
                    ? "Update Evaluation"
                    : "Save Evaluation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Performance;
