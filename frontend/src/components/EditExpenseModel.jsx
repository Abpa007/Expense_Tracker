import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { updateExpense } from "../features/expenses/expenseSlice";

const EditExpenseModal = ({
  isOpen = false,
  onClose = () => {},
  expense = {},
}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (expense) {
      setTitle(expense.title || "");
      setAmount(expense.amount || "");
      setCategory(expense.category || "Other");
      setNotes(expense.notes || "");
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || isNaN(amount) || Number(amount) <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      await dispatch(
        updateExpense({
          id: expense._id,
          data: {
            title: title.trim(),
            amount: Number(amount),
            category: category.trim(),
            notes: notes.trim(),
          },
        })
      ).unwrap();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err || "Failed to update expense");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded p-6 shadow-lg">
          <Dialog.Title className="text-lg font-bold mb-4">
            Edit Expense
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <textarea
              placeholder="Notes (optional)"
              className="w-full border p-2 rounded"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditExpenseModal;
