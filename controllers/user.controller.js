const CustomError = require("../lib/CustomError");
const asyncErrorHandler = require("../lib/asyncErrorHandler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = asyncErrorHandler(async (req, res, next) => {
    let data = req.body;
    if (!data.email || !data.password) {
        return next(new CustomError("Invalid email or password", 400));
    }

    let user = await User.findOne({
        email: data.email,
    });

    if (user) {
        return next(new CustomError("User Already registered", 400));
    }

    user = await User.create({
        email: data.email,
        password: data.password,
        username: data.username || "",
    });

    return res.status(201).json({
        message: "Registration Success!",
        data: user,
    });
});

const loginUser = asyncErrorHandler(async (req, res, next) => {
    let data = req.body;
    if (!data.email || !data.password) {
        return next(new CustomError("Invalid email or password", 400));
    }

    let user = await User.findOne({
        email: data.email,
    });

    if (!user) {
        return next(new CustomError("User not registered", 400));
    }

    if (user.password !== data.password) {
        return next(new CustomError("Invalid Credentials", 401));
    }

    let token = jwt.sign(
        { _id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
            expiresIn: 30,
        }
    );

    return res.status(200).json({
        message: "Logged in Successfully.",
        data: user,
        token,
    });
});

module.exports = {
    registerUser,
    loginUser,
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThlOWZiNGVhMzIwMDBjY2JjMDA2NWQiLCJ1c2VybmFtZSI6IiIsImlhdCI6MTcwNDE5MDU3Nn0.i8mwjAN7JenzyolfMFMn-qTfU-pdmcCa7mTmuNcVRBQ
