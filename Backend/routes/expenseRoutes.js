const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected
router
  .route("/")
  .post(protect, addExpense) // Add new expense
  .get(protect, getExpenses); // Get expenses with filters/pagination

router
  .route("/:id")
  .delete(protect, deleteExpense) // Delete expense
  .put(protect, updateExpense); // Update expense

module.exports = router;
