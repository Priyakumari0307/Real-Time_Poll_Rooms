const Poll = require('../models/Poll');
const Vote = require('../models/Vote');

// Create a new poll (Authenticated users only)
exports.createPoll = async (req, res) => {
    try {
        const { question, options } = req.body;

        if (!question || !options || options.length < 2) {
            return res.status(400).json({ message: 'Question and at least 2 options are required' });
        }

        const formattedOptions = options.map(opt => ({ text: opt, votes: 0 }));

        const poll = await Poll.create({
            question,
            options: formattedOptions
        });

        res.status(201).json(poll);
    } catch (error) {
        res.status(500).json({ message: 'Server error creating poll', error: error.message });
    }
};

// Get poll by ID
exports.getPoll = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if (!poll) return res.status(404).json({ message: 'Poll not found' });
        res.json(poll);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching poll' });
    }
};

// Cast a vote (Authenticated users only)
exports.castVote = async (req, res) => {
    try {
        const { pollId, optionIndex } = req.body;
        const userId = req.user; // From auth middleware
        const ipAddress = req.ip || req.headers['x-forwarded-for'];

        // 1. Check if poll exists
        const poll = await Poll.findById(pollId);
        if (!poll) return res.status(404).json({ message: 'Poll not found' });

        // 2. Fairness Mechanism: Only one vote per user per poll
        const existingVote = await Vote.findOne({
            pollId,
            $or: [{ userId }, { ipAddress }] // Strictly blocking by UserID OR IP
        });

        if (existingVote) {
            return res.status(403).json({ message: 'You have already voted on this poll!' });
        }

        // 3. Record the vote
        await Vote.create({ pollId, userId, ipAddress });

        // 4. Update the Poll option count
        poll.options[optionIndex].votes += 1;
        poll.totalVotes += 1;
        await poll.save();

        res.json(poll);
    } catch (error) {
        res.status(500).json({ message: 'Error casting vote', error: error.message });
    }
};
