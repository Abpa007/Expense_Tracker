import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../features/expenses/expenseSlice";
import ExpenseItem from "./ExpenseItem";
import Loader from "./Loader";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  if (loading) {
    return <Loader text="Loading expenses..." />;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  if (!expenses || expenses.length === 0) {
    return (
      <p className="text-center mt-4 text-gray-600">
        No expenses found. Start by adding one!
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-2 max-w-2xl mx-auto">
      {expenses.map((expense) => (
        <ExpenseItem key={expense._id} expense={expense} />
      ))}
    </div>
  );
};

export default ExpenseList;
