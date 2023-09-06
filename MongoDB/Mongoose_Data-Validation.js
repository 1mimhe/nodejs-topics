const mongoose = require('mongoose'); // a simple api for work with a MongoDB DataBase
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/test') // we already don't have this database. mongodb automatically creates this for us.
    .then(() => console.log('Connected to MongoDB...'))
    .catch((e) => console.log(e.message));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true }, // required: true means you must fill that field. => default: false
    author: {
        type: String,
        required: true,
        // Sanitization:
        minLength: 5,
        maxLength: 250,
        // lowercase: true
        // uppercase: true
        // trim: true
        // match: /pattern/
        // enum: [...] => checks if the value is in the given array.

        // Custom Validator (Async)
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                // Do some async work
                setTimeout(() => {
                    const result = v?.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.' // error message
        }
    },
    tags: {
        type: Array,
        // Custom Validator
        validate: {
            validator: function(v) {
                return v?.length > 0;
            }
        },
        message: 'A course should have at least one tag.'
    },
    category: {
        type: String,
        enum: ['web', 'network', 'mobile']
    },
    // default: Any or function, sets a default value for the path.
    // If the value is a function, the return value of the function is used as the default.
    date: { type: Date, default: Date.now() },
    price: {
        type: Number,
        min: 5,
        max: 1000,
        // getter and setter
        set: v => Math.round(v),
        get: v => Math.round(v)
    },
    isPublished: Boolean,
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate: {
            validator: (v) => {
                return v === /.*password.*/i;
            },
            message: 'Password can not contains \'password\''
        }
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        // name: 'Node.js Course',
        author: 'Mammad',
        // tags: [], => because we defined tags type as Array. mongoose will initialize that an empty Array.
        isPublished: true
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (err) {
        console.log(err.message);
    }
}

createCourse();