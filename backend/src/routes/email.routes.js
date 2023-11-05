const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

router.post('/send', emailController.sendEmail);
router.get('/inbox/:userId', emailController.getInbox);

// Additional routes can be added here

module.exports = router;
