const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Expense = sequelize.define('Expense', {
  title: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  bank: DataTypes.STRING,
  category: {
    type: DataTypes.ENUM('Food', 'Travel', 'Groceries', 'Others'),
    allowNull: false
  },
  
  date: DataTypes.STRING,
  description: DataTypes.STRING
});

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = Expense;
