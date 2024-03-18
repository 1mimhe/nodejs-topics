const {query} = require("express-validator");

const searchValidator = () => [
    query("title").isEmpty().matches(/[a-z0-9]8/gim),
    query("sort").matches(/ASC|DESC/)
];

module.exports = searchValidator;