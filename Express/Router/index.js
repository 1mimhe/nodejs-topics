const express = require('express');
const app = express();
// at first, require routers
const courses = require('./routers/courses');
const home = require('./routers/home');

// second, we use our router like a middleware.
app.use('/api/courses', courses); // only requests to /api/courses/* will be sent to our 'courses' router
app.use('/', home);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to ${PORT}...`));