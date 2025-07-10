const Expense = require("../models/Expense");

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Private
const addExpense = async (req, res) => {
  const { title, amount, category, date, notes } = req.body;

  if (!title || !amount || !category) {
    return res
      .status(400)
      .json({ message: "Please provide title, amount, and category" });
  }

  const expense = new Expense({
    user: req.user._id,
    title,
    amount,
    category,
    date: date || Date.now(),
    notes,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
};

// @desc    Get user's expenses with filters & pagination
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  const { category, startDate, endDate, page = 1, limit = 10 } = req.query;
  const filter = { user: req.user._id };

  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const total = await Expense.countDocuments(filter);
  const expenses = await Expense.find(filter)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({
    expenses,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  if (expense.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await expense.remove();
  res.json({ message: "Expense removed" });
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
  const { title, amount, category, date, notes } = req.body;
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  if (expense.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  expense.title = title || expense.title;
  expense.amount = amount || expense.amount;
  expense.category = category || expense.category;
  expense.date = date || expense.date;
  expense.notes = notes || expense.notes;

  const updatedExpense = await expense.save();
  res.json(updatedExpense);
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};
