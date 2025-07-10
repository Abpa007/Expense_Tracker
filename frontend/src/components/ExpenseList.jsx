import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses }) => {
  return (
    <div className="space-y-3">
      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem key={expense._id} expense={expense} />
        ))
      )}
    </div>
  );
};

export default ExpenseList;
