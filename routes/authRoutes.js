const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the /login route
router.post('/login', authController.handleLogin);

module.exports = router;