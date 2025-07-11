import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { updateExpense } from "../features/expenses/expenseSlice";
import { toast } from "react-toastify";

const EditExpenseModal = ({ isOpen, onClose, expense }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
      setNotes(expense.notes || "");
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateExpense({
          id: expense._id,
          updatedData: {
            title: title.trim(),
            amount: Number(amount),
            category,
            notes: notes.trim(),
          },
        })
      ).unwrap();
      toast.success("Expense updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error || "Failed to update expense");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <Dialog.Panel className="relative bg-white dark:bg-[#1f1f1f] rounded-xl shadow-lg w-full max-w-md p-6 flex flex-col gap-5 border border-gray-200 dark:border-gray-700">
        <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
          Edit Expense
        </Dialog.Title>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900 dark:text-gray-100"
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
          <textarea
            placeholder="Notes (optional)"
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none min-h-[80px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default EditExpenseModal;
