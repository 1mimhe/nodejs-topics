const mongoose = require('mongoose'); // a simple api for work with a MongoDB DataBase

mongoose.connect('mongodb://127.0.0.1:27017/test') // we already don't have this database. mongodb automatically creates this for us.
    .then(() => console.log('Connected to MongoDB...'))
    .catch((e) => console.log(e.message));

// schema: is a JSON object that defines the structure and contents of your data within a collection.
// collection: like a table in Relational database.
// document: like a row in Relational database.

// create a schema:
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now()},
    isPublished: Boolean
});
// schema types: String, Number, Date, Buffer, Boolean, ObjectID, Array

// we compile a schema to a model for create a class.
// first arg: is the singular name of the collection that this model is for.
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mammad',
        tags: ['node', 'backend'],
        // date: has a default value.
        isPublished: true
    }); // this object maps to a document in mongodb database.

    const result = await course.save(); // asynchronous
    console.log(result); // this data stored in mongodb.
    // _id: mongodb assigned this property to a unique identifier.
}

async function getCourse() {
    const foundCourses =
        await Course
            .find({author: 'Mammad', isPublished: true})
            .limit(2) // specifies the maximum number of documents the query will return.
            .select({name: 1, author: 1}); // select that property we want return.
            // .sort({ name: -1/1 })
            // .and([ {1}, {2} ])
            // .or([ {1}, {2} ]) ~= find({ 1, 2 })
            // .count() => return count of match this query
            // Pagination:
            // .skip((pageNumber — 1) * pageSize)
            // .limit(pageSize)
    console.log(foundCourses);
}

// Query Operators (https://www.mongodb.com/docs/manual/reference/operator/query/)
// Logical:
// $and: { scores: 75, name: "Greg Powell" }
// $or: { $or: [ { version: 4 }, { name: "Andrea Le" } ] }
// $not: { name: { $not: { $eq: "Andrea Le" } } }
// Comparison:
// Ex: { version: { $gte: 2, $lte: 4 } }
// Others: $eq, $gt, $gte, $lt, $lte, $ne, $in, $nin
// { price: { $in: [10, 15, 20] } }
// Match By Date:
// { dateCreated: { $gt: Date('2000-06-22') } }
// Match by Array Conditions:
// Ex: { scores: { $elemMatch: { $gt: 80, $lt: 90 } } }

// Regular Expression(RegEx) --> /pattern/
// Starts with:
// { author: /^pattern/ }
// Ends with:
// { author: /pattern$/i } => i: case(uppercase/lowercase) insensitive
// Contains:
// { author: /.*pattern.*/i }

// createCourse();
getCourse();