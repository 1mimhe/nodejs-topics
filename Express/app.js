const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('Hello.');
});

app.get('/api/courses', (req,res) => {
    res.send([1, 2, 3]);
});

// route parameters (essential/required data) => /:param1/:param2/...
// query string parameters (additional data) => /:params?param1=name&param2=id$...
app.get('/api/posts/:year/:month', (req, res) => {
    // path => http://localhost:3000/api/posts/2023/6
    // req.params => {"year":"2023","month":"6"}
    res.send(req.query);
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.query);
    // http://localhost:3000/api/courses/1000?sortBy=popularity => {"sortBy":"popularity"}
});

// set port: in cmd => 'set PORT=...'
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`)); // port, callback?,...