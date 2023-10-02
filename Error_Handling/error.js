// Middleware
const winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    /// === winston.error(err.message, err);
    res.status(500).send('Something failed.');
}

// logging levels:
// error => warn => info => verbose => debug => silly