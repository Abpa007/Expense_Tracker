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
      toast.error(error?.message || "Failed to update expense");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
        <Dialog.Title className="text-2xl font-bold text-center text-gray-800">
          Edit Expense
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-400 bg-gray-50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-400 bg-gray-50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <select
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 bg-gray-50"
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
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 placeholder-gray-400 bg-gray-50 resize-none min-h-[80px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
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
