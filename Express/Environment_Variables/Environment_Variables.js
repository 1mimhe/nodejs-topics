// environment variables: its value sets outside app.
// how to set:
// 1. 'set PORT=...'
// 2. make '.env' file in root of app and add variables

// how to read:
// 1.
// console.log(process.env.PORT);
// 2.
require('dotenv').config();
console.log(process.env.PORT, process.env.NODE_ENV); // 8626 development