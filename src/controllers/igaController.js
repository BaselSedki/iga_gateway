const logger = require('../utils/logger');

const processData = (req, res) => {
  const { data } = req.body;
  logger.info('Received data:', { data });
  res.status(200).json({ message: 'Data processed successfully', data });
};

  
  const sendSMS = (req, res) => {
    const { phone, message } = req.body;
    // Mock sending SMS
    console.log(`Sending SMS to ${phone}: ${message}`);
    res.status(200).json({ message: 'SMS sent successfully' });
  };
  
  module.exports = { processData, sendSMS };
  

  const axios = require('axios');
require('dotenv').config(); // To load Jira credentials securely from `.env`

const getJiraData = async (req, res) => {
  try {
    // Extract the issue key from the request (e.g., from query params or body)
    const issueKey = req.query.issueKey || "ISSUE_KEY"; // Replace with a default key or dynamic value
    
    // Jira API URL
    const jiraUrl = `${process.env.JIRA_BASE_URL}/rest/api/3/issue/${issueKey}`;

    // Perform GET request to Jira
    const response = await axios.get(jiraUrl, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.JIRA_USERNAME}:${process.env.JIRA_API_TOKEN}`
        ).toString("base64")}`, // Use Basic Authentication with Base64-encoded credentials
        "Content-Type": "application/json",
      },
    });

    // Send the Jira response back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from Jira:", error.message);
    res.status(error.response?.status || 500).json({
      message: "Failed to fetch data from Jira",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { getJiraData };
