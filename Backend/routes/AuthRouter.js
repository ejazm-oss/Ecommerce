const express = require('express');
const router = express.Router();

const ensureAuthenticated  = require('../Middleware/Auth');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const { signUp, login, isAdmin } = require('../controllers/AuthController');

// User authentication routes
router.post('/signup', signupValidation, signUp);
router.post('/login', loginValidation, login);
router.post('/admin', ensureAuthenticated, isAdmin);

module.exports = router;
