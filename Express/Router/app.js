const express = require('express');
const app = express();
// at first, require routers
const courses = require('./routers/courses.rotuer');
const home = require('./routers/home.router');
const setTime = require("./controllers/setTime.controller");
const serveFavIcon = require("serve-favicon"); // for favicon backend pages.
const path = require("path");

app.use(serveFavIcon(path.join(__dirname, "public", "express.favicon.png")));
// second, we use our router like a middleware.
app.use('/api/courses',setTime, courses); // only requests to /api/courses/* will be sent to our 'courses' router
app.use('/', setTime, home);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to ${PORT}...`));