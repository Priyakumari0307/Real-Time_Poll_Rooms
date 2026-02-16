const rateLimit = require('express-rate-limit');

// Simple rate limiter to prevent API abuse
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: {
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter limiter for creating polls or voting
const pollActionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Max 20 actions per hour
    message: {
        message: 'Action limit reached. Please wait before creating more polls or voting again.'
    }
});

module.exports = { apiLimiter, pollActionLimiter };
