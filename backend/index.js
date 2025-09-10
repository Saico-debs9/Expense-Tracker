const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { sequelize, User, Expense } = require('./models');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));


const port= process.env.PORT;

async function startServer() {
  try {
   
    await sequelize.sync({ alter: true }); 
    console.log("Database synced");
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Backend running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Database error:", error);
    process.exit(1);
  }
}
startServer();
