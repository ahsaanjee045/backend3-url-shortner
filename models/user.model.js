const mongoose = require("mongoose");

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
