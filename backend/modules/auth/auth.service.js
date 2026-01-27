const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const transporter = require("../../libs/email");

function generateEmailVerificationToken() {
    return crypto.randomBytes(32).toString("hex");
}

function generateAccessToken(userId) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m",
    });
}

function generateRefreshToken(userId) {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1m",
    });
}

function createVerificationEmailUrl(token) {
    return `http://localhost:5173/auth/verify-email?token=${token}`;
}

async function sendVerificationEmail(verificationUrl, userEmail) {
    await transporter.sendMail({
        from: `DoThis <${process.env.GOOGLE_EMAIL}>`,
        to: userEmail,
        subject: "Verify email", // subject line
        text: "Verify email", // plain text body
        html: `<a href="${verificationUrl}">Verify email</a>`,
    });
}

exports.generateEmailVerificationToken = generateEmailVerificationToken;
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.sendVerificationEmail = sendVerificationEmail;
exports.createVerificationEmailUrl = createVerificationEmailUrl;
