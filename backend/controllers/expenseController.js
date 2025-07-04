const { Expense } = require('../models');

exports.addExpense = async (req, res) => {
  const { title, amount, category, date, description } = req.body;
  try {
    const expense = await Expense.create({
      title, amount, category, date, description, UserId: req.user.id
    });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.findAll({ where: { UserId: req.user.id } });
  res.json(expenses);
};
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  await Expense.update(req.body, { where: { id } });
  res.send("Expense updated");
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  await Expense.destroy({ where: { id } });
  res.send("Expense deleted");
};
