const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    votedAt: {
        type: Date,
        default: Date.now
    }
});

// Primary restriction is Poll + UserID
voteSchema.index({ pollId: 1, userId: 1 });
// Secondary restriction is Poll + IP (optional layer)
voteSchema.index({ pollId: 1, ipAddress: 1 });

module.exports = mongoose.model('Vote', voteSchema);
