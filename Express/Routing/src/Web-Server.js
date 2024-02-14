const path = require('path');
const Joi = require('joi');
const express = require('express');
const app = express(); // WE SHOULD HAVE A SINGLE INSTANCE OF THAT IN OUR APPLICATION.
require('dotenv').config(); // for using .env (.env placed in the root of this file)

const publicDirectoryPath = path.join(__dirname, '../public');
// Also we can use => process.cwd() === __dirname === path.dirname(__filename)

app.use(express.json()); // This is a built-in middleware function. It parses incoming requests with JSON payloads.
app.use(express.static(publicDirectoryPath));

const courses = [
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'}
];

// app.all => it matches all HTTP verbs.
app.all('/api/*', loadUser);
function loadUser(req, res, next) {
    // ...
    res.send('aaa');
    next();
}

// .METHOD(path (url), handlers (route handler))
app.get('/', (req, res) => {
    res.send('Home.'); // we can send back: html, object, values
}); // root route.
// According to the order in which the handlers are placed, their match is checked with url.
// because of using static asserts place and 'index.html' assert, root handler never will be run.

// route parameters (essential/required data) => /:param1/:param2/...
// query string parameters (additional data) => /:params?param1=name&param2=id$...
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === Number(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});
// http://localhost:3000/api/courses/1000?sortBy=popularity => req.query: {"sortBy":"popularity"}

// 404 Page
// * => match anything that hasn't been matched so far.
app.get('*', (req, res) => {
    res.send('My 404 Page.');
});

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); // return what we post to client
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === Number(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const { error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course); // return updated course
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === Number(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course); // return deleted course
});

/* Input Validation:
    if (typeof req.body.name && req.body.name.length < 3 && !req.body.name) { // ... }
*/
// better way (using 'joi' package):
function validateCourse(course) {
    // schema: defines the shape of our object
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course); // return: {error:null, value:{},...} / {error: ..., value: null,...}
}

// using environment variables
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening to port ${port}...`)); // port, callback?,...
// -----> to call http services => 'Postman' app or npm packages