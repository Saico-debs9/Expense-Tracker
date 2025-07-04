const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const auth = require('../controllers/tokenController');

router.post('/', auth, addExpense);
router.get('/', auth, getExpenses);
router.put('/updateexpenses/:id', updateExpense);
router.delete('/deleteexpenses/:id', deleteExpense);


module.exports = router;
