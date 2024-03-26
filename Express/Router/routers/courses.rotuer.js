const express = require('express');
const router = express.Router();
const {getUsers, getUserById, addUser, updateUser, deleteUser} = require("../controllers/courses.controller");

// because only requests to /api/courses/* will be sent to this router,
// so we delete /api/courses from paths.
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;