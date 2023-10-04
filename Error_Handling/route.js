const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        throw new Error('Not found.');
    } catch (e) {
        next(e);
    }
});

/*
router.get('/users', async (req, res, next) => {
    const users = await User.find({}); // Unhandled Promise Rejection
});
*/

module.exports = router;