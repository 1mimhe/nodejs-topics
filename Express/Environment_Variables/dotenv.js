// environment variables: its value sets outside app.
// how to set:
// 1. 'set PORT=...'
// 2. make '.env' file in root of app and add variables

const path = require("path");
const app = require("express")();

require('dotenv').config();
console.log(process.env.NODE_ENV); // development
console.log(app.get('env')); // development => by default

require('dotenv').config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`)
});
console.log(process.env.PORT, process.env.API_KEY); // 3000 foo