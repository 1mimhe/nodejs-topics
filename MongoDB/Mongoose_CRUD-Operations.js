const mongoose = require('mongoose'); // a simple api for work with a MongoDB DataBase

// if we already don't have this database. mongodb automatically creates this for us.
mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
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

// we can also add a method to a schema:
courseSchema.methods.doSomething = function () {
    console.log('Name:' + this.name);
}

// we compile a schema to a model for create a class.
// first arg: is the singular name of the collection that this model is for. * Course => courses
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
            // .select('-password') // All except the password will be returned.
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
// getCourse();

// Updating a Document
// 1. Query First
async function updateCourse1(id) {
    const course = await Course.findById(id); // id: _id
    if (!course) return;

    course.set({
        isPublished: false,
        author: 'Another author'
    });
    /*
    course.isPublished = false;
    course.author = 'Another author';
     */
    const result = await course.save();
    console.log(result);
}

// 2. Update First
async function updateCourse2(id) {
    const result = await Course.findByIdAndUpdate({_id: id}, {
        $set: {
            author: 'Jason',
            isPublished: false
        }, // $set: is an update operator https://www.mongodb.com/docs/manual/reference/operator/update/
        $unset: {tags: 1}
    }, { new: true, runValidators: true});
    console.log(result);

    /*
    {new: false/true}
     new => return new version/old version => default = false
     */
}

// Update Operators:
// $inc: Increments the value of the field by the specified amount directly.
// $max/$min: Only updates the field if the specified value is greater/less than the existing field value.
// $rename: Renames a field.
// $set: Sets the value of a field in a document.
// $unset: Removes the specified field from a document.

async function deleteCourse(id) {
    const course = Course.deleteOne({_id: id});
    // const course = Course.findByIdAndRemove(id);
    console.log(course);
}

// mongoimport command is used to import your content from an extended JSON, ...
// mongoimport --db <db-name> --collection <collection-name> --file <file-name>
// mongoexport --db <db-name> --collection <collection-name> --out=<file-name>