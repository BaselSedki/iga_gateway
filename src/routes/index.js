const express = require('express');
const router = express.Router();
const igaController = require('../controllers/igaController');

// Example Routes
router.post('/data', igaController.processData);
router.post('/sms', igaController.sendSMS);
router.get('/jira', igaController.getJiraData);

module.exports = router;

