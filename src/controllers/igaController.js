const axios = require('axios');
const logger = require('../utils/logger');
const LogRecord = require('../Model/LogRecord'); // Import the MongoDB model
require('dotenv').config(); // Load environment variables

// Handle data processing and log to MongoDB
const processData = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: 'No data provided' });
    }

    logger.info('Received data:', { data });

    // Save log entry to MongoDB
    const logData = {
      level: 'info',
      message: 'Data processed successfully',
      timestamp: new Date(),
      additionalData: { data },
    };

    const newLog = new LogRecord(logData);
    await newLog.save();

    res.status(200).json({ message: 'Data processed and logged successfully', data });
  } catch (error) {
    logger.error('Error processing data:', { error: error.message });

    // Save error log entry to MongoDB
    const errorLog = new LogRecord({
      level: 'error',
      message: 'Error processing data',
      timestamp: new Date(),
      additionalData: { error: error.message },
    });
    await errorLog.save();

    res.status(500).json({ message: 'Error processing data', error: error.message });
  }
};

const sendSMS = async (req, res) => {
  try {
    const { mobNum, companyName, transactionTimestamp, internalReference, secureHash, smsText } = req.body;

    // Validate required fields
    if (!mobNum || !companyName || !smsText) {
      return res.status(400).json({ message: 'Mobile number, company name, and SMS text are required' });
    }

    // Simulate SMS sending (replace with actual SMS service like Twilio, Nexmo, etc.)
    console.log(`Sending SMS to ${mobNum}: ${smsText}`);
    // You can integrate with SMS gateway here

    // Log SMS details (to MongoDB, or just log to console for now)
    console.log(`SMS sent to ${mobNum}: ${smsText}`);

    // Save SMS log entry to MongoDB
    const logData = {
      level: 'info',
      message: `SMS sent to ${mobNum}: ${smsText}`,
      timestamp: new Date(),
    };

    const newLog = new LogRecord(logData);
    await newLog.save();

    res.status(200).json({ message: 'SMS sent and logged successfully' });
  } catch (error) {
    console.error('Error sending SMS:', error.message);

    // Save error log entry to MongoDB
    const errorLog = new LogRecord({
      level: 'error',
      message: 'Error sending SMS',
      timestamp: new Date(),
      additionalData: { error: error.message },
    });
    await errorLog.save();

    res.status(500).json({ message: 'Failed to send SMS', error: error.message });
  }
};

module.exports = { sendSMS };



// Fetch data from Jira and log the operation
const getJiraData = async (req, res) => {
  try {
    const issueKey = req.query.issueKey;

    if (!issueKey) {
      return res.status(400).json({ message: 'Issue key is required' });
    }

    const jiraUrl = `${process.env.JIRA_BASE_URL}/rest/api/3/issue/${issueKey}`;

    const response = await axios.get(jiraUrl, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.JIRA_USERNAME}:${process.env.JIRA_API_TOKEN}`
        ).toString('base64')}`, // Use Basic Authentication with Base64-encoded credentials
        'Content-Type': 'application/json',
      },
    });

    logger.info('Fetched Jira data:', response.data);

    // Save log entry for successful Jira fetch
    const logData = {
      level: 'info',
      message: `Fetched Jira data for issueKey: ${issueKey}`,
      timestamp: new Date(),
      additionalData: { issueKey, jiraData: response.data },
    };

    const newLog = new LogRecord(logData);
    await newLog.save();

    res.status(200).json(response.data);
  } catch (error) {
    logger.error('Error fetching data from Jira:', { error: error.message });

    // Save error log entry to MongoDB
    const errorLog = new LogRecord({
      level: 'error',
      message: 'Error fetching data from Jira',
      timestamp: new Date(),
      additionalData: { error: error.message, issueKey },
    });
    await errorLog.save();

    res.status(error.response?.status || 500).json({
      message: 'Failed to fetch data from Jira',
      error: error.response?.data || error.message,
    });
  }
};


// Export all functions
module.exports = { processData, sendSMS, getJiraData };
