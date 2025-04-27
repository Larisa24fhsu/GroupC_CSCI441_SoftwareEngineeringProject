const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const pool = require('../db');  // Assuming the database connection is in db.js

router.post('/login', (req, res, next) => {
    console.log('Login route hit');
    next();
}, authController.handleLogin);

module.exports = router;