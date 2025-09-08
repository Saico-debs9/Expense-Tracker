const { Expense } = require('../models');

exports.addExpense = async (req, res) => {
  console.log("Incoming expense body:", req.body);
  console.log("User from token:", req.user);
  const { title, amount, category, date, description } = req.body;
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ error: "All fields (title, amount, category, date) are required" });
  }

  try {
    const expense = await Expense.create({
      title, amount: parseFloat(amount), category, date, description, UserId: req.user.id
    });
    res.json(expense);
  } catch (err) {
    console.error("Add Expense error", err);
    res.status(400).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try{
    console.log("user from token:", req.user);
    const expenses = await Expense.findAll({ where: { UserId: req.user.id } });
    res.json(expenses);
  }catch(err){
    console.error("Expense fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
  
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
