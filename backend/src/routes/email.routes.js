const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');
router.get('/:userId/search', emailController.searchEmails);

router.post('/:emailId/move', emailController.moveEmailToFolder);
router.get('/:userId/folder/:folder', emailController.getEmailsByFolder);
router.get('/:emailId', emailController.getEmail);
router.delete('/:emailId', emailController.deleteEmail);
router.post('/send', emailController.sendEmail);
router.get('/inbox/:userId', emailController.getInbox);

// Additional routes can be added here

module.exports = router;
