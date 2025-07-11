// src/components/EditExpenseModal.jsx

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { updateExpense, fetchExpenses } from "../features/expenses/expenseSlice";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

const EditExpenseModal = ({ isOpen, onRequestClose, expense }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
      setDate(new Date(expense.date));
    }
  }, [expense]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateExpense({
          id: expense._id,
          data: {
            title,
            amount: Number(amount),
            category,
            date,
          },
        })
      ).unwrap();
      toast.success("Expense updated successfully");
      dispatch(fetchExpenses());
      onRequestClose();
    } catch (error) {
      toast.error(error || "Failed to update expense");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Expense"
      className="max-w-md mx-auto mt-20 bg-white rounded p-4 shadow focus:outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
      <form onSubmit={handleUpdate} className="space-y-3">
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
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          className="w-full border p-2 rounded"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditExpenseModal;
