import React from "react";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/expenses/expenseSlice";
import { toast } from "react-toastify";

const ExpenseItem = ({ expense }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;
    try {
      await dispatch(deleteExpense(expense._id)).unwrap();
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete expense");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex justify-between items-start gap-4 hover:shadow-md transition">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {expense.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {expense.category} | {new Date(expense.date).toLocaleDateString()}
        </p>
        {expense.notes && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            {expense.notes}
          </p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-green-600 dark:text-green-400 font-semibold">
          ₹{Number(expense.amount).toFixed(2)}
        </span>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
