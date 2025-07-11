import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../features/expenses/expenseSlice";
import { toast } from "react-toastify";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.expenses);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Other",
    notes: "",
    date: new Date().toISOString().substring(0, 10),
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await dispatch(addExpense(formData)).unwrap();
      toast.success("Expense added successfully!");
      setFormData({
        title: "",
        amount: "",
        category: "Other",
        notes: "",
        date: new Date().toISOString().substring(0, 10),
      });
    } catch (error) {
      toast.error(error || "Failed to add expense");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        Add Expense
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none min-h-[80px]"
          value={formData.notes}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg p-3 font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
