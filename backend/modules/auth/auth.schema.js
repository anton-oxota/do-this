const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        passowrd: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        emailVerificationToken: String,
        emailVerificationExpires: {
            type: Date,
            index: {
                expires: 0,
            },
        },
    },
    { timestamps: true },
);

const User = model("User", UserSchema);
module.exports = User;
