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

    // Validation with correct numeric and trimmed checks
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

      // Optional: clear form after success
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
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Expense</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          className="w-full border p-2 rounded"
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
          className="w-full border p-2 rounded"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpensePage;
