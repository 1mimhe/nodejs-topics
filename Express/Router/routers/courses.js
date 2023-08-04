const express = require('express');
const router = express.Router();

// because only requests to /api/courses/* will be sent to this router,
// so we delete /api/courses from paths.
router.get('/', (req, res) => {
    // ...
});

router.get('/:id', (req, res) => {
    // ...
});

router.post('/', (req, res) => {
    // ...
});

router.put('/:id', (req, res) => {
   // ...
});

router.delete('/:id', (req, res) => {
    // ...
});

module.exports = router;