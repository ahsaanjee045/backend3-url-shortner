const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        // try to register a user
        let data = req.body;
        if (!data.email || !data.password) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        // check if the user is already registered
        let user = await User.findOne({
            email: data.email,
        });

        if (user) {
            return res.status(400).json({
                message: "User already registered. Try with another email!",
            });
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
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        let data = req.body;
        if (!data.email || !data.password) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        let user = await User.findOne({
            email: data.email,
        });

        if (!user) {
            return res.status(400).json({
                message: "User not registered. Try Registring first",
            });
        }

        if (user.password !== data.password) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        // console.log(req.session.isAuth)
        // req.session.isAuthenticated = true
        // res.cookie("token", "12837618276", {
        //     httpOnly : true,
        //     maxAge :  10 * 60 * 60 * 1000  // cannot be accessed by client side javascript
        // })
        let token = jwt.sign(
            { _id: user._id, username: user.username },
            "thisisaverysecuresignature",
            {
                expiresIn: "1d",
            }
        );

        return res.status(200).json({
            message: "Logged in Successfully.",
            data: user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThlOWZiNGVhMzIwMDBjY2JjMDA2NWQiLCJ1c2VybmFtZSI6IiIsImlhdCI6MTcwNDE5MDU3Nn0.i8mwjAN7JenzyolfMFMn-qTfU-pdmcCa7mTmuNcVRBQ
