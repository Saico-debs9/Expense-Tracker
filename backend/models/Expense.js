const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Expense = sequelize.define('Expense', {
  title: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  bank: DataTypes.STRING,
  category: {
    type: DataTypes.ENUM(
      'Food',
      'Groceries',
      'Travel',
      'Shopping',
      'EMIs',
      'Investments',
      'Rent',
      'Utilities',
      'Health & Medical',
      'Entertainment',
      'Education',
      'Savings',
      'Gifts & Donations',
      'Insurance',
      'Fuel / Transport',
      'Others'
    ),
    allowNull: false
  },
  
  
  date: DataTypes.STRING,
  description: DataTypes.STRING
},{
  tableName: "expenses",   
  timestamps: true,
});

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = Expense;
