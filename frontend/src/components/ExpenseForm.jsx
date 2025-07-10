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
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) {
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
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="w-full border p-2 rounded"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          className="w-full border p-2 rounded"
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
          className="w-full border p-2 rounded"
          value={formData.notes}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
