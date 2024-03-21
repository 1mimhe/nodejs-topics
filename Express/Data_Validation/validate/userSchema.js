// https://www.npmjs.com/package/validate
const Schema = require("validate");

// it is like MongoDB schema.
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        length: { min: 3, max: 32 },
        // custom error messages.
        message: {
            type: "username must to be string.",
            required: "username is required.",
            length: "username length must be between 3 and 32."
        }
    },
    // Arrays:
    pets: [{
        name: {
            type: String
        },
        animal: {
            type: String,
            enum: ['cat', 'dog', 'cow']
        }
    }], // or:
    // type: Array,
    // each: { type: String }
    address: [{
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        zip: {
            type: String,
            match: /^[0-9]+$/,
            // use: custom() => custom validator
        }
    }]
});

module.exports = userSchema;