// routes/registerRoutes.js

const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const pool = require("../db"); // Assuming the database connection is in db.js

router.post('/', registerController.handleNewUser);

module.exports = router;