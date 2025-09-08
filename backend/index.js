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
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({ force:true })
  .then(() => console.log("Database synced"))
  .catch(err => console.error("Sync error:", err));
    } else {
      await sequelize.authenticate(); 
      console.log("Connected to database (production)");
    }
    app.get("/", (req, res) => {res.send("Backend running")});
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database error:", error);
    process.exit(1);
  }
}
startServer();
