import React from "react";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/expenses/expenseSlice";

const ExpenseItem = ({ expense }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteExpense(expense._id));
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{expense.title}</h3>
        <p className="text-sm text-gray-500">{expense.category}</p>
        <p className="text-sm text-gray-400">
          {new Date(expense.date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <span className="font-bold text-green-600">₹{expense.amount}</span>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
