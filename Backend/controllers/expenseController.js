const Expense = require("../models/Expense");

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Private
const addExpense = async (req, res) => {
  const { title, amount, category, notes } = req.body;

  if (!title || !amount || !category) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" });
  }

  try {
    const expense = await Expense.create({
      user: req.user._id,
      title: title.trim(),
      amount: parseFloat(amount),
      category: category.trim(),
      notes: notes ? notes.trim() : "",
      date: new Date(), // assign current date
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// @desc    Get user's expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(expenses);
  } catch (error) {
    console.error("Get Expenses Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this expense" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense removed" });
  } catch (error) {
    console.error("Delete Expense Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "No data provided in request body" });
  }

  const { title, amount, category, notes } = req.body;

  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this expense" });
    }

    if (!title && !amount && !category && !notes) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    expense.title = title ? title.trim() : expense.title;
    expense.amount = amount ? parseFloat(amount) : expense.amount;
    expense.category = category ? category.trim() : expense.category;
    expense.notes = notes ? notes.trim() : expense.notes;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    console.error("Update Expense Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};
