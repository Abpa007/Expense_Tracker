import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../features/expenses/expenseSlice";
import { useNavigate } from "react-router-dom";

const AddExpensePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      title.trim() === "" ||
      category.trim() === "" ||
      isNaN(amount) ||
      Number(amount) <= 0
    ) {
      alert(
        "Please fill in all required fields correctly (amount must be > 0)."
      );
      return;
    }
    try {
      await dispatch(
        addExpense({
          title: title.trim(),
          amount: Number(amount),
          category: category.trim(),
          notes: notes.trim(),
        })
      ).unwrap();
      setTitle("");
      setAmount("");
      setCategory("Other");
      setNotes("");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error || "Failed to add expense");
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-2xl mt-12 sm:mt-16 animate-fadeIn flex flex-col gap-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 tracking-tight">
        Add New Expense
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          className="border border-gray-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          placeholder="Notes (optional)"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition resize-none min-h-[100px]"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white w-full p-3 rounded-xl hover:from-blue-700 hover:to-blue-600 transition font-semibold shadow-lg"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpensePage;
