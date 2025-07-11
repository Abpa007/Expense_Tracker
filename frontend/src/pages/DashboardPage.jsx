// src/pages/DashboardPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  deleteExpense,
} from "../features/expenses/expenseSlice";
import { useNavigate } from "react-router-dom";
import EditExpenseModal from "../components/EditExpenseModal";
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

  // Filters
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;
    const expenseDate = new Date(expense.date);
    const matchesStartDate = startDate ? expenseDate >= startDate : true;
    const matchesEndDate = endDate ? expenseDate <= endDate : true;
    return matchesCategory && matchesStartDate && matchesEndDate;
  });

  // Pagination
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
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow mt-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading && <p>Loading expenses...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <p className="text-lg font-semibold mb-4">
        Total Expenses: ₹{total.toFixed(2)}
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
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
          className="border p-2 rounded"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="border p-2 rounded"
        />
        <button
          onClick={() => {
            setCategoryFilter("");
            setStartDate(null);
            setEndDate(null);
          }}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Clear Filters
        </button>
      </div>

      {currentExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul className="space-y-2">
          {currentExpenses.map((expense) => (
            <li
              key={expense._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <p className="font-semibold">{expense.title}</p>
                <p className="text-sm text-gray-600">
                  ₹{expense.amount} | {expense.category} |{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(expense)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
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
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from(
            { length: Math.ceil(filteredExpenses.length / expensesPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
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
        onRequestClose={() => setEditModalOpen(false)}
        expense={selectedExpense}
      />
      <ExpenseCharts expenses={filteredExpenses} />
    </div>
  );
};

export default DashboardPage;
