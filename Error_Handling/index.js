const winston = require('winston');
require('winston-mongodb');
const express = require('express');
const app = express();
const route = require('./route');
const error = require('./error');

// Handle Uncaught Exceptions
winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (e) => {
   throw e; // winston.exceptions.handle will handle that.
});

process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    // Terminates the application with 1 (error) as exit code.
    // Without the following line, the application would continue
    // process.exit(1)
});

winston.add(new winston.transports.File({filename: 'logfile.log'}));
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://127.0.0.1:27017/test',
    options: {
        useUnifiedTopology: true
    },
    level: 'info' // default: all logging levels
}));

app.use(express.json());
app.use(route);
app.use(error);

app.listen(3000, () => console.log('Listening to 3000...'));

throw new Error('An Uncaught exception.');