const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');  // Import the routes file (ensure the path is correct)
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(
    cors({
        origin: '*',  // Change '*' to a specific domain for better security
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Handle Preflight OPTIONS Requests (for CORS)
app.options('*', cors());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/iga_database';
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process if connection fails
    });

// Use routes for API calls
app.use('/api', routes);  // Prefix all API routes with /api

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).send('IGA Gateway is running!');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`IGA Gateway running on port ${PORT}`);
});



