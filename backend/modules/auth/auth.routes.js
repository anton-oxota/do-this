const { Router } = require("express");

const { registerValidation, loginValidation } = require("./auth.validators");

const {
    register,
    verifyEmail,
    resendVerificationEmail,
    login,
    logout,
    refreshAccessToken,
} = require("./auth.controller");

const { verifyAccessToken, verifyRefreshToken } = require("./auth.middleware");

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);
router.get("/logout", verifyAccessToken, logout);
router.get("/refresh-access-token", verifyRefreshToken, refreshAccessToken);

module.exports = router;
