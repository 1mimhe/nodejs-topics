const express = require('express');
const app = express();
require('dotenv').config();

// what environment our code will run?
// enable/disable some features base on current environment.

// how to access?
console.log(process.env.NODE_ENV); // default => undefined
console.log(app.get('env')); // default => development

// how use it?
if (app.get('env') === 'development') {
    // ...
}