const express = require('express');
const router = express.Router();
const { createPoll, getPoll, castVote } = require('../controllers/pollController');
const { pollActionLimiter } = require('../middleware/rateLimiter');
const auth = require('../middleware/auth');

// Define routes
router.post('/create', auth, pollActionLimiter, createPoll);
router.get('/:id', getPoll);
router.post('/vote', auth, pollActionLimiter, castVote);

module.exports = router;
