
import React, { useState, useEffect } from "react";
import "../design/Finance.css";

const initialTransactions = [
  {
    id: 1,
    name: "Website Development",
    category: "Projects",
    date: "2026-11-02",
    amount: 12500,
    type: "Income",
    status: "Completed",
  },
  {
    id: 2,
    name: "Employee Salaries",
    category: "Payroll",
    date: "2026-11-01",
    amount: 8500,
    type: "Expense",
    status: "Completed",
  },
  {
    id: 3,
    name: "Office Rent",
    category: "Operations",
    date: "2026-10-29",
    amount: 2500,
    type: "Expense",
    status: "Pending",
  },
  {
    id: 4,
    name: "Mobile Application",
    category: "Projects",
    date: "2026-10-27",
    amount: 18000,
    type: "Income",
    status: "Completed",
  },
  {
    id: 5,
    name: "Marketing Campaign",
    category: "Marketing",
    date: "2026-10-25",
    amount: 3200,
    type: "Expense",
    status: "Pending",
  },
  {
    id: 6,
    name: "Consulting Services",
    category: "Services",
    date: "2026-10-22",
    amount: 7500,
    type: "Income",
    status: "Completed",
  },
];

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function Finance() {
  // Transactions
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("omnicore_transactions");

    if (savedTransactions) {
      try {
        return JSON.parse(savedTransactions);
      } catch {
        return initialTransactions;
      }
    }

    return initialTransactions;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newTransaction, setNewTransaction] = useState({
    name: "",
    category: "Projects",
    date: getToday(),
    amount: "",
    type: "Income",
    status: "Completed",
  });

  // Annual Budget
  const [annualBudget, setAnnualBudget] = useState(() => {
    const savedBudget = localStorage.getItem("omnicore_annual_budget");

    return savedBudget ? Number(savedBudget) : 100000;
  });

  const [budgetInput, setBudgetInput] = useState(
    String(annualBudget)
  );

  // Save transactions
  useEffect(() => {
    localStorage.setItem(
      "omnicore_transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // Save annual budget
  useEffect(() => {
    localStorage.setItem(
      "omnicore_annual_budget",
      String(annualBudget)
    );
  }, [annualBudget]);

  // Financial Statistics
  const totalRevenue = transactions
    .filter(
      (t) => t.type === "Income" && t.status === "Completed"
    )
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(
      (t) => t.type === "Expense" && t.status === "Completed"
    )
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netProfit = totalRevenue - totalExpenses;

  const pendingPayments = transactions
    .filter((t) => t.status === "Pending")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  // Budget Calculations
  const currentYear = new Date().getFullYear();

  // Count ALL expenses, including Pending expenses.
  const yearlyExpenses = transactions
    .filter(
      (t) =>
        t.type === "Expense" &&
        Number(t.date.split("-")[0]) === currentYear
    )
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const remainingBudget = annualBudget - yearlyExpenses;

  const budgetPercentage =
    annualBudget > 0
      ? Math.round((yearlyExpenses / annualBudget) * 100)
      : 0;

  // Search and Filter
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || t.type === filter;

    return matchesSearch && matchesFilter;
  });

  // Reset Form
  const resetForm = () => {
    setNewTransaction({
      name: "",
      category: "Projects",
      date: getToday(),
      amount: "",
      type: "Income",
      status: "Completed",
    });

    setEditingId(null);
    setShowModal(false);
  };

  // Add or Update Transaction
  const addTransaction = (e) => {
    e.preventDefault();

    if (
      !newTransaction.name.trim() ||
      !newTransaction.amount ||
      Number(newTransaction.amount) <= 0
    ) {
      alert("Please enter valid transaction details.");
      return;
    }

    const amount = Number(newTransaction.amount);
    const currentYear = new Date().getFullYear();

    // Calculate all yearly expenses, including Pending.
    // Exclude the transaction currently being edited.
    const currentYearExpenses = transactions
      .filter(
        (t) =>
          t.type === "Expense" &&
          Number(t.date.split("-")[0]) === currentYear &&
          t.id !== editingId
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Check if this is an expense in the current year.
    const isCurrentYearExpense =
      newTransaction.type === "Expense" &&
      Number(newTransaction.date.split("-")[0]) === currentYear;

    const availableBudget = annualBudget - currentYearExpenses;

    // Prevent expenses greater than the remaining budget.
    if (isCurrentYearExpense && amount > availableBudget) {
      alert(
        `Cannot save this transaction!\n\n` +
        `Remaining Budget: ${formatMoney(availableBudget)}\n` +
        `Requested Expense: ${formatMoney(amount)}\n\n` +
        `Please enter an amount within your remaining budget.`
      );
      return;
    }

    const transactionData = {
      ...newTransaction,
      amount: amount,
    };

    if (editingId !== null) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...t, ...transactionData }
            : t
        )
      );
    } else {
      const transaction = {
        ...transactionData,
        id: Date.now(),
      };

      setTransactions((prev) => [
        transaction,
        ...prev,
      ]);
    }

    resetForm();
  };

  // Edit Transaction
  const editTransaction = (transaction) => {
    setNewTransaction({
      name: transaction.name,
      category: transaction.category,
      date: transaction.date,
      amount: transaction.amount,
      type: transaction.type,
      status: transaction.status,
    });

    setEditingId(transaction.id);
    setShowModal(true);
  };

  // Delete Transaction
  const deleteTransaction = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (confirmDelete) {
      setTransactions((prev) =>
        prev.filter((t) => t.id !== id)
      );
    }
  };

  // Update Annual Budget
  const updateBudget = (e) => {
    e.preventDefault();

    const newBudgetValue = Number(budgetInput);

    if (!budgetInput || newBudgetValue <= 0) {
      return;
    }

    setAnnualBudget(newBudgetValue);
  };

  // Money Format
  const formatMoney = (amount) =>
    "$" + Number(amount).toLocaleString("en-US");

  // Dynamic Monthly Chart - Last 6 Months
  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - index));

    const year = date.getFullYear();
    const monthNumber = String(date.getMonth() + 1).padStart(2, "0");
    const monthKey = `${year}-${monthNumber}`;

    const monthTransactions = transactions.filter(
      (t) =>
        t.date.startsWith(monthKey) &&
        t.status === "Completed"
    );

    const income = monthTransactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = monthTransactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      month: date.toLocaleDateString("en-US", {
        month: "short",
      }),
      income,
      expense,
    };
  });

  const maxMonthlyAmount = Math.max(
    1,
    ...monthlyData.map((item) =>
      Math.max(item.income, item.expense)
    )
  );

  const formatCompact = (amount) => {
    if (amount >= 1000000) {
      return "$" + (amount / 1000000).toFixed(1) + "m";
    }

    if (amount >= 1000) {
      return "$" + Math.round(amount / 1000) + "k";
    }

    return "$" + Math.round(amount);
  };

  const getBarHeight = (amount) => {
    if (amount === 0) return "0%";

    return `${(amount / maxMonthlyAmount) * 100}%`;
  };

  return (
    <div className="finance-page">

      {/* Header */}
      <div className="finance-header">

        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85"
          alt="Financial Management"
        />

        <div className="finance-header-overlay">

          <span className="finance-eyebrow">
            FINANCIAL MANAGEMENT
          </span>

          <h1>Finance Overview</h1>

          <p>
            Monitor your company's financial performance and transactions.
          </p>

        </div>

        <button
          className="add-transaction-btn"
          onClick={() => {
            setEditingId(null);
            setNewTransaction({
              name: "",
              category: "Projects",
              date: getToday(),
              amount: "",
              type: "Income",
              status: "Completed",
            });
            setShowModal(true);
          }}
        >
          + Add Transaction
        </button>

      </div>

      {/* Financial Statistics */}
      <div className="finance-stats">

        <div className="finance-stat-card">
          <div className="finance-stat-top">
            <div className="finance-stat-icon revenue-icon">↗</div>
            <span className="finance-growth positive">
              Income
            </span>
          </div>

          <p>Total Revenue</p>
          <h2>{formatMoney(totalRevenue)}</h2>
          <span className="finance-stat-note">
            Completed income
          </span>
        </div>

        <div className="finance-stat-card">
          <div className="finance-stat-top">
            <div className="finance-stat-icon expense-icon">↙</div>
            <span className="finance-growth negative">
              Expense
            </span>
          </div>

          <p>Total Expenses</p>
          <h2>{formatMoney(totalExpenses)}</h2>
          <span className="finance-stat-note">
            Completed expenses
          </span>
        </div>

        <div className="finance-stat-card">
          <div className="finance-stat-top">
            <div className="finance-stat-icon profit-icon">◈</div>
            <span className="finance-growth positive">
              Profit
            </span>
          </div>

          <p>Net Profit</p>
          <h2>{formatMoney(netProfit)}</h2>
          <span className="finance-stat-note">
            Revenue minus expenses
          </span>
        </div>

        <div className="finance-stat-card">
          <div className="finance-stat-top">
            <div className="finance-stat-icon pending-icon">◷</div>
            <span className="pending-label">Pending</span>
          </div>

          <p>Pending Payments</p>
          <h2>{formatMoney(pendingPayments)}</h2>
          <span className="finance-stat-note">
            Awaiting payment
          </span>
        </div>

      </div>

      {/* Chart and Budget */}
      <div className="finance-middle-grid">

        {/* Revenue and Expenses Chart */}
        <div className="finance-panel revenue-panel">

          <div className="finance-panel-header">
            <div>
              <h3>Revenue & Expenses</h3>
              <p>Monthly financial performance</p>
            </div>

            <span className="chart-period">
              Last 6 Months
            </span>
          </div>

          <div className="finance-chart-legend">
            <span>
              <i className="legend-income"></i> Revenue
            </span>

            <span>
              <i className="legend-expense"></i> Expenses
            </span>
          </div>

          <div className="finance-chart">

            <div className="chart-y-labels">
              <span>{formatCompact(maxMonthlyAmount)}</span>
              <span>{formatCompact(maxMonthlyAmount * 0.75)}</span>
              <span>{formatCompact(maxMonthlyAmount * 0.5)}</span>
              <span>{formatCompact(maxMonthlyAmount * 0.25)}</span>
              <span>$0</span>
            </div>

            <div className="chart-content">

              <div className="chart-grid-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="chart-bars">
                {monthlyData.map((item, index) => (
                  <div
                    className="chart-month"
                    key={`${item.month}-${index}`}
                  >
                    <div className="chart-bar-group">

                      <div
                        className="chart-bar income-bar"
                        style={{
                          height: getBarHeight(item.income),
                        }}
                        title={`Revenue: ${formatMoney(item.income)}`}
                      ></div>

                      <div
                        className="chart-bar expense-bar"
                        style={{
                          height: getBarHeight(item.expense),
                        }}
                        title={`Expenses: ${formatMoney(item.expense)}`}
                      ></div>

                    </div>

                    <span>{item.month}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="finance-panel budget-panel">

          <div className="finance-panel-header">
            <div>
              <h3>Budget Overview</h3>
              <p>Company budget utilization</p>
            </div>

            <span className="budget-year">
              {currentYear}
            </span>
          </div>

          <div className="budget-circle-wrapper">

            <div
              className="budget-circle"
              style={{
                "--budget-progress": `${Math.min(budgetPercentage, 100)}%`,
              }}
            >
              <div className="budget-circle-inner">
                <strong>{budgetPercentage}%</strong>
                <span>Used Budget</span>
              </div>
            </div>

          </div>

          <div className="budget-details">

            <div>
              <span className="budget-dot budget-used-dot"></span>
              <span>Used Budget</span>
              <strong>{formatMoney(yearlyExpenses)}</strong>
            </div>

            <div>
              <span className="budget-dot budget-remaining-dot"></span>
              <span>Remaining</span>
              <strong>{formatMoney(remainingBudget)}</strong>
            </div>

          </div>

          <div className="budget-progress">
            <div
              style={{
                width: `${Math.min(budgetPercentage, 100)}%`,
              }}
            ></div>
          </div>

          <p className="budget-footer">
            {budgetPercentage}% of the annual budget has been used.
          </p>

          {/* Edit Annual Budget */}
          <form
            onSubmit={updateBudget}
            style={{ marginTop: "15px" }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
              }}
            >
              Set Annual Budget ($)
            </label>

            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <input
                type="number"
                min="1"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                style={{
                  width: "100%",
                  minWidth: 0,
                  padding: "9px",
                  borderRadius: "6px",
                }}
                required
              />

              <button
                type="submit"
                style={{
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
            </div>
          </form>

        </div>

      </div>

      {/* Transactions */}
      <div className="finance-panel transactions-panel">

        <div className="transactions-header">
          <div>
            <h3>Recent Transactions</h3>
            <p>
              Track and manage all company transactions.
            </p>
          </div>

          <div className="transaction-controls">

            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

          </div>
        </div>

        <div className="finance-table-wrapper">

          <table className="finance-table">

            <thead>
              <tr>
                <th>TRANSACTION</th>
                <th>CATEGORY</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredTransactions.map((t) => (
                <tr key={t.id}>

                  <td>
                    <strong>{t.name}</strong>
                  </td>

                  <td>{t.category}</td>

                  <td>{t.date}</td>

                  <td
                    className={
                      t.type === "Income"
                        ? "income-text"
                        : "expense-text"
                    }
                  >
                    {t.type === "Income" ? "+" : "-"}
                    {formatMoney(t.amount)}
                  </td>

                  <td>
                    <span
                      className={`transaction-type ${t.type.toLowerCase()}`}
                    >
                      {t.type}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`transaction-status ${t.status.toLowerCase()}`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => editTransaction(t)}
                      style={{
                        marginRight: "7px",
                        padding: "6px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-transaction"
                      onClick={() => deleteTransaction(t.id)}
                      title="Delete transaction"
                    >
                      ✕
                    </button>
                  </td>

                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="7" className="no-transactions">
                    No transactions found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>

        </div>
      </div>

      {/* Add / Edit Transaction Modal */}
      {showModal && (
        <div
          className="finance-modal-overlay"
          onClick={resetForm}
        >
          <div
            className="finance-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="finance-modal-header">
              <div>
                <h2>
                  {editingId !== null
                    ? "Edit Transaction"
                    : "Add Transaction"}
                </h2>

                <p>
                  Enter the financial transaction details.
                </p>
              </div>

              <button
                type="button"
                className="close-finance-modal"
                onClick={resetForm}
              >
                ✕
              </button>
            </div>

            <form onSubmit={addTransaction}>

              <label>Transaction Name</label>

              <input
                type="text"
                placeholder="Enter transaction name"
                value={newTransaction.name}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    name: e.target.value,
                  })
                }
                required
              />

              <label>Category</label>

              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
              >
                <option>Projects</option>
                <option>Payroll</option>
                <option>Operations</option>
                <option>Marketing</option>
                <option>Services</option>
                <option>Other</option>
              </select>

              <label>Amount ($)</label>

              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value,
                  })
                }
                required
              />

              <label>Date</label>

              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    date: e.target.value,
                  })
                }
                required
              />

              <label>Transaction Type</label>

              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    type: e.target.value,
                  })
                }
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>

              <label>Payment Status</label>

              <select
                value={newTransaction.status}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    status: e.target.value,
                  })
                }
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>

              <div className="finance-modal-actions">

                <button
                  type="button"
                  className="cancel-finance-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-finance-btn"
                >
                  {editingId !== null
                    ? "Update Transaction"
                    : "Save Transaction"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Finance;
