const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this.id }, 'jsonWebToken');
};

module.exports = mongoose.model('User', userSchema);