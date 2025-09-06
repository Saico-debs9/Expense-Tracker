const express = require('express');
const router = express.Router();
const { signup, login, test } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/', test);

module.exports = router;
