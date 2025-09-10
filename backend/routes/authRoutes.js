const express = require('express');
const router = express.Router();
const { signup, login, test, googleLogin } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/', test);
router.post("/google-login", googleLogin);

module.exports = router;
