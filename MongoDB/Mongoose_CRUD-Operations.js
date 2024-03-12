const mongoose = require('mongoose');
const {ObjectId} = require("mongodb"); // a simple API(ODM) for work with a MongoDB DataBase

// if we already don't have this database. mongodb automatically creates this for us.
mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch((e) => console.log(e.message));

// schema: is a JSON object that defines the structure and contents of your data within a collection.
// collection: like a table in Relational database.
// document: like a row in Relational database.

// create a schema:
const courseSchema = new mongoose.Schema({
    name: {type:String, required: true}, // 'required' default => false
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now()}, // if property has 'default' value => required=true
    isPublished: Boolean
}, {
    timestamps: true // set document created time and modified time automatically => createdAt/updatedAt
});
// schema types: String, Number, Date, Buffer, Boolean, ObjectID, Array

// we can also add a method to a schema:
courseSchema.methods.doSomething = function () {
    console.log('Name:' + this.name);
}
// also, we have userSchema.statics.doSomething => user.doSomething()

// In Mongoose, a 'virtual' is a property that is not stored in MongoDB.
courseSchema.virtual('domain').get(function () {
    return this.email.slice(this.email.indexOf('@') + 1);
});

// we compile a schema to a model for create a class.
// first arg: is the singular name of the collection that this model is for.
// Ex: Course => courses
const Course = mongoose.model('Course', courseSchema, /* We can set collection name ourselves. */);

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

    // or
    const newCourse = await Course.create({
        name: 'Nest.js Course',
        author: 'Erfan',
        tags: ['nest', 'backend']
    });
    console.log(newCourse);
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
    /*
{
  name: 'Node.js Course',
  author: 'Another author',
  tags: [],
  date: 2023-08-23T10:20:07.366Z,
  isPublished: false,
  _id: new ObjectId("64e5dd57e8105d38dda5bd26"),
  updatedAt: 2024-03-12T10:20:37.132Z,
  __v: 1
}
     */
}

// 2. Update First
async function updateCourse2(id) {
    const result = await Course.findByIdAndUpdate({_id: id}, {
        $set: {
            author: 'Mike',
            isPublished: false
        },
        $unset: {tags: 1}
    }, {
        new: true, runValidators: true
    });
    console.log(result);

    /*
    {new: false/true}
     new => return new version/old version => default = false
     */
}

updateCourse1("64e5dd57e8105d38dda5bd26");

async function deleteCourse(id) {
    const course = Course.deleteOne({_id: id});
    // const course = Course.findByIdAndRemove(id);
    console.log(course);
}