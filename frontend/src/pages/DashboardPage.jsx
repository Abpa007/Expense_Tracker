// src/pages/DashboardPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  deleteExpense,
} from "../features/expenses/expenseSlice";
import { useNavigate } from "react-router-dom";
import EditExpenseModal from "../components/EditExpenseModel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import ExpenseCharts from "../components/ExpenseCharts";
import { downloadCSV } from "../utils/CsvExporter";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { expenses } = useSelector((state) => state.expenses);

  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5;
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      dispatch(fetchExpenses());
    }
  }, [user, navigate, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteExpense(id))
        .unwrap()
        .then(() => toast.success("Expense deleted"))
        .catch((err) => toast.error(err || "Delete failed"));
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  const today = new Date();
  const isDateFilterApplied = startDate || endDate;

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;
    const matchesStartDate = startDate ? expenseDate >= startDate : true;
    const matchesEndDate = endDate ? expenseDate <= endDate : true;

    if (isDateFilterApplied) {
      return matchesCategory && matchesStartDate && matchesEndDate;
    } else if (categoryFilter) {
      return (
        matchesCategory &&
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    } else {
      // ✅ Show only today's expenses by default
      return (
        expenseDate.getDate() === today.getDate() &&
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    }
  });

  const sortedExpenses = filteredExpenses.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = sortedExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const total = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-4 flex flex-col items-center">
      <Toaster />
      <div className="w-full max-w-4xl">
        {/* Header with filters */}
        <div className="sticky top-0 z-10 bg-neutral-50/70 dark:bg-neutral-900/70 backdrop-blur-md rounded-xl shadow p-4 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200">
              Expense Dashboard
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {isDateFilterApplied
                ? `Showing filtered expenses${
                    categoryFilter ? ` in ${categoryFilter}` : ""
                  }`
                : categoryFilter
                ? `Current month ${categoryFilter} expenses`
                : "Today's expenses"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-neutral-300 dark:border-neutral-700 p-2 rounded-md bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              className="border border-neutral-300 dark:border-neutral-700 p-2 rounded-md bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              className="border border-neutral-300 dark:border-neutral-700 p-2 rounded-md bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
            />
            <button
              onClick={() => {
                setCategoryFilter("");
                setStartDate(null);
                setEndDate(null);
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Clear
            </button>

            <button
              onClick={() => downloadCSV(filteredExpenses, "expenses.csv")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Download CSV
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-4">
          <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-3 text-center md:text-left">
            Total:{" "}
            <span className="text-purple-700 dark:text-purple-400 font-bold">
              ₹{total.toFixed(2)}
            </span>
          </p>

          {/* Expenses List */}
          {currentExpenses.length === 0 ? (
            <p className="text-center text-neutral-500 dark:text-neutral-400">
              No expenses found.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {currentExpenses.map((expense) => (
                <li
                  key={expense._id}
                  className="flex flex-col md:flex-row md:justify-between md:items-center bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow transition"
                >
                  <div>
                    <p className="font-medium text-neutral-800 dark:text-neutral-200">
                      {expense.title}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      ₹{expense.amount} | {expense.category} |{" "}
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          {filteredExpenses.length > expensesPerPage && (
            <div className="flex justify-center mt-4 gap-2 flex-wrap">
              {Array.from(
                {
                  length: Math.ceil(filteredExpenses.length / expensesPerPage),
                },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition shadow ${
                      currentPage === i + 1
                        ? "bg-purple-600 text-white"
                        : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Charts */}
        <div className="mt-6 bg-white dark:bg-neutral-800 rounded-xl shadow p-4">
          <ExpenseCharts
            expenses={expenses}
            filter={{
              category: categoryFilter,
              startDate: startDate,
              endDate: endDate,
            }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
          Expense Tracker © {new Date().getFullYear()} | Built by Abhay Panchal
        </footer>
      </div>

      <EditExpenseModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        expense={selectedExpense}
      />
    </div>
  );
};

export default DashboardPage;
