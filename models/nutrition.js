const { description } = require('@hapi/joi/lib/base');
const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    id: String,
    type: String,
    description:String
});

module.exports = mongoose.model('nutritions', nutritionSchema);
