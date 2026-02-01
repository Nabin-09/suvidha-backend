const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Security & Base Middlewares 
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Health Check Route [cite: 64]
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Global Error Handler 
app.use(errorHandler);

module.exports = app;