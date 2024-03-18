const { body } = require('express-validator');

const loginValidator = () => [
    body("email").isEmail().withMessage("Email is invalid."),
    body("password").isLength({ min: 6, max: 20 }),
    body("confirmPassword").custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Password is not match with confirmation.");
        }

        return true;
    }),
    body("phoneNumber").isEmpty().isMobilePhone(['fa-IR', 'en-US']) // or 'any'
    // isEmpty() => property could be empty (doesn't exist)
];

module.exports = loginValidator;