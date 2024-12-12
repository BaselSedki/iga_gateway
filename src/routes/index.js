const express = require('express');
const router = express.Router();
const igaController = require('../controllers/igaController');

// Route to process data
// POST /api/data
// Example Body: { "data": "Sample data to process" }
router.post('/data', igaController.processData);

// Route to send SMS
// POST /api/sms
// Example Body: { "phone": "+1234567890", "message": "Test message" }
router.post('/sms', igaController.sendSMS);

// Route to fetch data from Jira
// GET /api/jira?issueKey=PROJECT-123
router.get('/jira', igaController.getJiraData);

// Export the router for integration in app.js
module.exports = router;
