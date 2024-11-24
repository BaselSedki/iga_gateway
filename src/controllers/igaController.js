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
  