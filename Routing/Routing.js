const Joi = require('joi');
const express = require('express');
const app = express();
require('dotenv').config(); // for using .env

app.use(express.json()); // This is a built-in middleware function. It parses incoming requests with JSON payloads.

const courses = [
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'}
];

// path (url), handlers (route handled)
app.get('/', (req, res) => {
    res.send('Home.');
});

// route parameters (essential/required data) => /:param1/:param2/...
// query string parameters (additional data) => /:params?param1=name&param2=id$...
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === req.params.id);
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});
// http://localhost:3000/api/courses/1000?sortBy=popularity => req.query: {"sortBy":"popularity"}

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
    const course = courses.find(c => c.id === req.params.id);
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const { error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course); // return updated course
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === req.params.id);
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course); // return deleted course
});

// app.all => it matches all HTTP verbs.
app.all('/api/*', loadUser);
function loadUser(res, req, next) {
    // ...
    next();
}

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
// -----> to call http services => 'Postman' app or extension