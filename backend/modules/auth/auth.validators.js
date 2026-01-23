const { body } = require("express-validator");
const User = require("./auth.schema");

const registerValidation = [
    body("name")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be 2-50 characters")
        .trim(),
    body("email")
        .isEmail()
        .withMessage("Enter valid email")
        .custom(async (value) => {
            const existedUser = await User.findOne({ email: value });

            if (existedUser && existedUser.isEmailVerified) {
                throw new Error("User with this email already exists");
            }
        })
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters"),
    body("confirmPassword")
        .custom((value, { req }) => {
            return value === req.body?.password;
        })
        .withMessage("Passowrds must be equall"),
];

const loginValidation = [
    body("email").isEmail().withMessage("Enter valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters"),
];

exports.registerValidation = registerValidation;
exports.loginValidation = loginValidation;
