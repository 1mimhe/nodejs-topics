const mongoose = require('mongoose');

module.exports = mongoose.model('Task', new mongoose.Schema({
    description: {
        type: String,
        required: true
    }
}));
