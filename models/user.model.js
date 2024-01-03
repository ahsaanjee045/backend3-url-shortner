const mongoose = require("mongoose");

/**
 * User model
 *
 * @type {Schema}
 * @property {string} username - The user's name
 * @property {string} email - The user's email address
 * @property {string} password - The user's password
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        default: "",
    },
    email: {
        type: String,
        required: [true, "Email is a required field."],
        unique: [true, "Email must be unique"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Email is a required field."],
        trim: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
