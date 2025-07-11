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

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { expenses, loading, error } = useSelector((state) => state.expenses);

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

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;
    const expenseDate = new Date(expense.date);
    const matchesStartDate = startDate ? expenseDate >= startDate : true;
    const matchesEndDate = endDate ? expenseDate <= endDate : true;
    return matchesCategory && matchesStartDate && matchesEndDate;
  });

  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = filteredExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const total = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 flex flex-col items-center">
      <Toaster />
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mt-4">
        <h1 className="text-3xl font-bold mb-4 text-center text-purple-700">
          Expense Dashboard
        </h1>

        {loading && (
          <p className="text-center animate-pulse">Loading expenses...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <p className="text-lg font-semibold mb-4 text-center text-gray-700">
          Total Expenses:{" "}
          <span className="text-purple-700 font-bold">₹{total.toFixed(2)}</span>
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded-lg shadow w-40 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
            className="border p-2 rounded-lg shadow w-36 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            className="border p-2 rounded-lg shadow w-36 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={() => {
              setCategoryFilter("");
              setStartDate(null);
              setEndDate(null);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Clear Filters
          </button>
        </div>

        {/* Expense List */}
        {currentExpenses.length === 0 ? (
          <p className="text-center text-gray-600">No expenses found.</p>
        ) : (
          <ul className="space-y-3">
            {currentExpenses.map((expense) => (
              <li
                key={expense._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-xl p-4 shadow hover:shadow-md transition border border-gray-100"
              >
                <div>
                  <p className="font-semibold text-gray-800">{expense.title}</p>
                  <p className="text-sm text-gray-500">
                    ₹{expense.amount} | {expense.category} |{" "}
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
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
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from(
              { length: Math.ceil(filteredExpenses.length / expensesPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-lg text-sm transition font-medium shadow ${
                    currentPage === i + 1
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        )}

        {/* Edit Modal */}
        <EditExpenseModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          expense={selectedExpense}
        />

        {/* Charts */}
        <div className="mt-8 bg-white rounded-xl shadow p-4">
          <ExpenseCharts expenses={filteredExpenses} />
        </div>

        <footer className="mt-10 text-center text-gray-500 text-sm">
          Expense Tracker © {new Date().getFullYear()} | Built with ❤️ by Abhay
          Panchal
        </footer>
      </div>
    </div>
  );
};

export default DashboardPage;
