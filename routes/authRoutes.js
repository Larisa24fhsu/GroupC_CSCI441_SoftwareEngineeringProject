const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const pool = require('../db');  // Assuming the database connection is in db.js

router.post('/', authController.handleLogin);

module.exports = router;