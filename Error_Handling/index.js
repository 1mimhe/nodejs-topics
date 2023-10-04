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