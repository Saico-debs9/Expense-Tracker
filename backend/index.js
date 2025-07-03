const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

const port= process.env.PORT;

sequelize.sync().then(() => {
  app.listen(port, '0.0.0.0', () => console.log(`Backend running on http://localhost:${port}`));
});
