const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("./auth.schema");
const {
    generateEmailVerificationToken,
    generateAccessToken,
    generateRefreshToken,
    sendVerificationEmail,
} = require("./auth.service");

async function register(req, res) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(422).json({
            message: "Validation error",
            error: result.array(),
        });
    }

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailVerificationToken = generateEmailVerificationToken();
    const emailVerificationExpires = Date.now() + 1000 * 60 * 60 * 24; // 1 day
    const emailVerificationUrl = `http://localhost:3000/auth/verify-email?token=${emailVerificationToken}`;

    const existedUser = await User.findOne({ email });

    if (existedUser && !existedUser.isEmailVerified) {
        existedUser.passowrd = hashedPassword;
        existedUser.emailVerificationToken = emailVerificationToken;
        existedUser.emailVerificationExpires = emailVerificationExpires;

        await existedUser.save();

        // SEND VERIFICATION MAIL
        sendVerificationEmail(emailVerificationUrl, email);

        return res.status(201).json({
            emailVerificationUrl,
            message: "Verification link was resend",
        });
    }

    const user = new User({
        name,
        email,
        passowrd: hashedPassword,
        emailVerificationToken,
        emailVerificationExpires,
    });

    const createdUser = await user.save();

    // SEND VERIFICATION MAIL
    sendVerificationEmail(emailVerificationUrl, email);

    res.status(201).json({
        message: "User created",
        emailVerificationUrl,
        user: createdUser,
    });
}

async function verifyEmail(req, res) {
    const { token } = req.query;

    const user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationExpires: { $gte: Date.now() },
    });

    if (!user) {
        return res.status(401).json({
            message: "Verification link is expired or invalid",
        });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    res.status(200).json({
        user,
        message: "Email verified",
    });
}

async function resendVerificationEmail(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    if (user.isEmailVerified) {
        return res.status(409).json({
            message: "Email is alerady verified",
        });
    }

    const emailVerificationToken = generateEmailVerificationToken();
    const emailVerificationExpires = Date.now() + 1000 * 60 * 10; // 10 min
    const emailVerificationUrl = `http://localhost:3000/auth/verify-email?token=${emailVerificationToken}`;

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationExpires = emailVerificationExpires;
    user.save();

    res.status(200).json({
        emailVerificationUrl,
        message: "Verification link was resend",
    });
}

async function login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "Invalid inputs",
            errors,
        });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User with this Email is not exist",
        });
    }

    if (!user.isEmailVerified) {
        return res.status(409).json({
            message: "Please verify email",
        });
    }

    const isValidPassword = await bcrypt.compare(password, user.passowrd);

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Incorect password",
        });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
        accessToken,
        refreshToken,
        user,
        message: "Successfully logged in",
    });
}

async function logout(req, res) {
    const { user } = req;
    user.refreshToken = undefined;
    await user.save();

    res.status(200).json({
        message: "Logged out",
    });
}

async function refreshAccessToken(req, res) {
    const { user } = req;

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
        accessToken,
        message: "Access token was updated",
    });
}

exports.register = register;
exports.login = login;
exports.logout = logout;
exports.verifyEmail = verifyEmail;
exports.resendVerificationEmail = resendVerificationEmail;
exports.refreshAccessToken = refreshAccessToken;
