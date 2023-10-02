const express = require('express');
const router = express.Router();
const error = require('./error');

router.get('/', (req, res, next) => {
    try {
        throw new Error('Not found.');
    } catch (e) {
        next(e);
    }
});

module.exports = router;