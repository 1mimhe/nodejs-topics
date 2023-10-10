const User = require('./User');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    const token = req.header('X-Auth_Token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, 'jsonWebToken');
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
};