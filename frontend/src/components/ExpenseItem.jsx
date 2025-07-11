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
    <div className="border p-3 rounded flex justify-between items-center mb-2 bg-white shadow-sm">
      <div>
        <h3 className="font-semibold">{expense.title}</h3>
        <p className="text-sm text-gray-500">
          {expense.category} | {new Date(expense.date).toLocaleDateString()}
        </p>
        {expense.notes && (
          <p className="text-sm text-gray-600 mt-1">{expense.notes}</p>
        )}
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className="font-bold text-green-600">
          ₹{Number(expense.amount).toFixed(2)}
        </span>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
