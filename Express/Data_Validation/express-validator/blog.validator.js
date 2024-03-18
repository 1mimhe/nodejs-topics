const { param } = require("express-validator");

const IdValidator = param("id").isMongoId().withMessage("Invalid ObjectId.");

module.exports = IdValidator;