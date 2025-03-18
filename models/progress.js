const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: String, // YYYY-MM-DD
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Progress', ProgressSchema);
