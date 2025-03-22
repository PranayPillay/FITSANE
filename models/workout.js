const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    id: String,
    type: String,
    videopath:String
});

module.exports = mongoose.model('Workout', workoutSchema);
