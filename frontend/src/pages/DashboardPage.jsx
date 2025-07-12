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
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <Toaster />
      <div className="w-full max-w-4xl">
        {/* Header with filters */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur rounded-xl shadow p-4 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Expense Dashboard
            </h1>
            <p className="text-sm text-gray-500">
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
              className="border border-gray-300 p-2 rounded-md bg-white text-gray-800 focus:outline-blue-500"
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
              className="border border-gray-300 p-2 rounded-md bg-white text-gray-800 focus:outline-blue-500"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              className="border border-gray-300 p-2 rounded-md bg-white text-gray-800 focus:outline-blue-500"
            />
            <button
              onClick={() => {
                setCategoryFilter("");
                setStartDate(null);
                setEndDate(null);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Clear
            </button>
            <button
              onClick={() => downloadCSV(filteredExpenses, "expenses.csv")}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Download CSV
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-lg font-semibold text-gray-700 mb-3 text-center md:text-left">
            Total:{" "}
            <span className="text-blue-600 font-bold">₹{total.toFixed(2)}</span>
          </p>

          {/* Expenses List */}
          {currentExpenses.length === 0 ? (
            <p className="text-center text-gray-500">No expenses found.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {currentExpenses.map((expense) => (
                <li
                  key={expense._id}
                  className="flex flex-col md:flex-row md:justify-between md:items-center bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{expense.title}</p>
                    <p className="text-sm text-gray-500">
                      ₹{expense.amount} | {expense.category} |{" "}
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition text-sm"
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
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
        <div className="mt-6 bg-white rounded-xl shadow p-4">
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
        <footer className="mt-8 text-center text-xs text-gray-500">
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
