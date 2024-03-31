const express = require('express');
const mongoose = require('mongoose');
const AllRouters = require("./index.router");
const session = require("express-session");
const passportInit = require("./passport.config");
const passport = require("passport");
const app = express();

mongoose.connect("mongodb://localhost:27017/passport", {}).then(() => {
    console.log("Connected to MongoDB.");
});

// Setup application
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up session
// session(options): Create a session middleware with the given options.
app.use(session({
    secret: "secret-key", // This is the secret used to sign the session ID cookie. [could be an array]
    resave: false, // [default: true] Forces the session to be saved back to the session store,
    // even if the session was never modified during the request.
    // if be true, When there are two requests from two different IPs. It can cause it to be an expired request.
    saveUninitialized: false // [default: true] Forces a session that is "uninitialized" to be saved to the store.
}));

// Set up Passport
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use(AllRouters(passport));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
