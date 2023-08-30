const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((e) => console.log(e.message));

// Modeling Relationships:
// 1. Using References
/*
let author = {
    name: 'Bob'
}

let course = {
    author: 'id'
}
*/
// 2. Using Embedded Documents
/*
let course = {
    author: {
        name: 'Bob'
    }
}
*/

// Referencing Documents
const Author = mongoose.model('Author', new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course' // tells Mongoose which model to use during population.
        }
    ]
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 250
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name) {
    const author = new Author({
        name
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, authorName) {
    const author = await Author.findOne({name: authorName});
    const course = new Course({
        name,
        author: author._id
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author', 'name -_id'); // if it doesn't find the author, null will be assigned to author.
        // .populate({path: 'author', select: 'name -_id'})
        // .populate('category', 'name') // also we can populate multiple properties

    console.log(courses);
}

// createAuthor('Bob');
// createCourse('Node.js', 'Bob');
// listCourses();

// Embedded Documents
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course' // tells Mongoose which model to use during population.
        }
    ]
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 250
    },
    author: {
        type: authorSchema,
        required: true
    }
});

// .......