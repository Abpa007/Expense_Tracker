import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  deleteExpense,
} from "../features/expenses/expenseSlice";
import EditExpenseModal from "../components/EditExpenseModel";
import toast, { Toaster } from "react-hot-toast";

const ExpensePage = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteExpense(id))
        .unwrap()
        .then(() => toast.success("Expense deleted"))
        .catch(() => toast.error("Delete failed"));
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear().toString();
    const expenseMonth = (expenseDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");

    const yearMatch = selectedYear ? expenseYear === selectedYear : true;
    const monthMatch = selectedMonth ? expenseMonth === selectedMonth : true;

    return yearMatch && monthMatch;
  });

  const groupedExpenses = filteredExpenses.reduce((monthGroups, expense) => {
    const expenseDateObj = new Date(expense.date);
    const monthKey = expenseDateObj.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const dateKey = expenseDateObj.toLocaleDateString("en-GB");

    if (!monthGroups[monthKey]) monthGroups[monthKey] = {};
    if (!monthGroups[monthKey][dateKey]) monthGroups[monthKey][dateKey] = [];

    monthGroups[monthKey][dateKey].push(expense);

    return monthGroups;
  }, {});

  const years = Array.from(
    new Set(expenses.map((e) => new Date(e.date).getFullYear().toString()))
  ).sort((a, b) => b - a);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-xl mt-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-800">
        Expense Tracker
      </h1>

      {loading && (
        <p className="text-center text-gray-600 animate-pulse">
          Loading expenses...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, idx) => {
            const monthNum = (idx + 1).toString().padStart(2, "0");
            const monthName = new Date(0, idx).toLocaleString("default", {
              month: "long",
            });
            return (
              <option key={monthNum} value={monthNum}>
                {monthName}
              </option>
            );
          })}
        </select>

        <button
          onClick={() => {
            setSelectedYear("");
            setSelectedMonth("");
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition shadow-sm"
        >
          Clear Filters
        </button>
      </div>

      {Object.keys(groupedExpenses).length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No expenses found for the selected filters.
        </p>
      ) : (
        Object.keys(groupedExpenses)
          .sort((a, b) => new Date(b) - new Date(a))
          .map((month) => (
            <div key={month} className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-700 border-b pb-1">
                {month}
              </h2>
              {Object.keys(groupedExpenses[month])
                .sort((a, b) => {
                  const [dayA, monthA, yearA] = a.split("/").map(Number);
                  const [dayB, monthB, yearB] = b.split("/").map(Number);
                  return (
                    new Date(yearB, monthB - 1, dayB) -
                    new Date(yearA, monthA - 1, dayA)
                  );
                })
                .map((date) => (
                  <div key={date} className="mb-4">
                    <h3 className="text-lg font-medium mb-2 text-gray-600">
                      {date}
                    </h3>
                    <ul className="space-y-3">
                      {groupedExpenses[month][date].map((expense) => (
                        <li
                          key={expense._id}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center border border-gray-200 p-4 rounded-xl bg-white hover:bg-gray-50 transition shadow-sm"
                        >
                          <div className="flex flex-col text-center sm:text-left">
                            <p className="font-semibold text-gray-800">
                              {expense.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₹{expense.amount} | {expense.category}
                            </p>
                          </div>
                          <div className="flex justify-center sm:justify-end mt-2 sm:mt-0 space-x-2">
                            <button
                              onClick={() => handleEdit(expense)}
                              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-lg text-sm transition shadow"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(expense._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm transition shadow"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          ))
      )}

      <EditExpenseModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        expense={selectedExpense}
      />
    </div>
  );
};

export default ExpensePage;
