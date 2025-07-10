import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../features/expenses/expenseSlice";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-4">Loading expenses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  if (expenses.length === 0) {
    return (
      <p className="text-center mt-4">
        No expenses found. Start by adding one!
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-2">
      {expenses.map((expense) => (
        <ExpenseItem key={expense._id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseList;
