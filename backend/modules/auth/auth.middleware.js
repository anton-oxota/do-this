const jwt = require("jsonwebtoken");
const User = require("./auth.schema");
const { generateAccessToken } = require("./auth.service");

async function verifyAccessToken(req, res, next) {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
        return res.status(401).json({
            message: "Access token is missing",
        });
    }

    try {
        const payload = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
        );

        const user = await User.findById(payload.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        req.user = user;
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }

    next();
}

async function verifyRefreshToken(req, res, next) {
    const refreshToken = req.headers.authorization?.split(" ")[1];

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token is missing",
        });
    }

    try {
        const payload = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        );

        const user = await User.findById(payload.userId);

        if (!user) {
            return res.status(404).json({
                message: "User with this refresh token is not defined",
            });
        }

        req.user = user;
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            await User.findOneAndUpdate(
                { refreshToken },
                { $unset: { refreshToken: "" } }, // Delete refreshToken field
            );

            return res.status(401).json({
                message: "Refresh token was expired and deleted",
            });
        }

        return res.status(401).json({
            error,
            message: "Invalid refresh token",
        });
    }

    next();
}

exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
