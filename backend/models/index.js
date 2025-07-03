const sequelize = require('../config/db');
const User = require('./User');
const Expense = require('./Expense');

sequelize.sync();

module.exports = { sequelize, User, Expense };
