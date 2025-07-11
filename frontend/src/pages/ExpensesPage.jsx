import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  deleteExpense,
} from "../features/expenses/expenseSlice";
import { useNavigate } from "react-router-dom";

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const { user } = useSelector((state) => state.auth);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Fetch expenses on mount
  useEffect(() => {
    if (user) {
      dispatch(fetchExpenses());
    }
  }, [user, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteExpense(id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Your Expenses</h1>

      {loading && <p>Loading expenses...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {expenses.length === 0 && !loading ? (
        <p>No expenses found.</p>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div>
                <p className="font-semibold">{expense.title}</p>
                <p className="text-sm text-gray-600">
                  ₹{expense.amount} | {expense.category} |{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </p>
                {expense.notes && (
                  <p className="text-xs text-gray-500 mt-1">
                    Notes: {expense.notes}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(expense._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
