//written and tested by Larisa Smith


const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/send-alert', emailController.sendAlertEmail);

module.exports = router;
