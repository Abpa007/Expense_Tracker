import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpenses,
  addExpense,
  deleteExpense,
} from "../features/expenses/expenseSlice";
import Loader from "../components/Loader";

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Other",
    notes: "",
  });

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      alert("Please add title and amount.");
      return;
    }
    dispatch(addExpense({ ...formData, amount: Number(formData.amount) }));
    setFormData({ title: "", amount: "", category: "Other", notes: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteExpense(id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Manage Expenses</h1>

      <form onSubmit={handleAddExpense} className="space-y-3 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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
          value={formData.notes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
        >
          Add Expense
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div>
        <h2 className="text-xl font-semibold mb-2">Expense List</h2>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul className="space-y-2">
            {expenses.map((expense) => (
              <li
                key={expense._id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <p className="font-semibold">{expense.title}</p>
                  <p className="text-sm text-gray-600">
                    ₹{expense.amount} - {expense.category}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;
