const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

// All expense routes are protected
router
  .route("/")
  .post(protect, addExpense) // Add new expense
  .get(protect, getExpenses); // Get all expenses for user

router
  .route("/:id")
  .delete(protect, deleteExpense) // Delete a specific expense
  .put(protect, updateExpense); // Update a specific expense

module.exports = router;
