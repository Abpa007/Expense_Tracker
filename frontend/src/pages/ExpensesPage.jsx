import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, addExpense, deleteExpense } from "../features/expenses/expenseSlice";
import { useNavigate } from "react-router-dom";

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchExpenses());
    }
  }, [dispatch, navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense({ title, amount: Number(amount), category }));
    setTitle("");
    setAmount("");
    setCategory("Other");
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {expenses.length === 0 ? (
        <p>No expenses to display.</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <div>
                <p className="font-semibold">{expense.title}</p>
                <p className="text-sm text-gray-500">
                  ₹{expense.amount} • {expense.category}
                </p>
              </div>
              <button
                onClick={() => handleDelete(expense._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpensesPage;
