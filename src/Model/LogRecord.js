const mongoose = require('mongoose');

// Define the schema for log data
const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  additionalData: {
    type: mongoose.Schema.Types.Mixed, // Optional field for any extra data
  },
});

// Create the model from the schema
const LogRecord = mongoose.model('LogRecord', logSchema);

// Export the model
module.exports = LogRecord;
