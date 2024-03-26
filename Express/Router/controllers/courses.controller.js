
const getUsers = (req, res, next) => {
    res.send("Get All Users.");
}

const getUserById = (req, res, next) => {
    res.send(`Get User ${req.params.id}.`);
}

const addUser = (req, res, next) => {
    res.send("Add a New User.");
}

const updateUser = (req, res, next) => {
    res.send(`Update User ${req.params.id}.`);
}

const deleteUser = (req, res, next) => {
    res.send(`Delete User ${req.params.id}.`);
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}