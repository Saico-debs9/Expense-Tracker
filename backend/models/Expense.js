const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Expense = sequelize.define('Expense', {
  title: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  bank: DataTypes.STRING,
  category: DataTypes.STRING,
  date: DataTypes.DATEONLY,
  description: DataTypes.STRING
});

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = Expense;
