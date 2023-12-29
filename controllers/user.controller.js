const User = require("../models/user.model");

const registerUser = async (req, res) => {
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

    if(user){
        return res.status(400).json({
            message: "User already registered. Try with another email!",
        });
    }

    user = await User.create({
        email : data.email,
        password : data.password,
        username : data.username || ""
    })

    return res.status(201).json({
        message : "Registration Success!",
        data : user
    })
};

const loginUser = async (req, res) => {
    let data = req.body;
    if (!data.email || !data.password) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }


    let user = await User.findOne({
        email: data.email,
    });


    if(!user){
        return res.status(400).json({
            message: "User not registered. Try Registring first",
        })
    }

    if(user.password !== data.password){
        return res.status(400).json({
            message: "Invalid Credentials",
        })
    }

    return res.status(200).json({
        message : "Logged in Successfully.",
        data : user
    })
}

module.exports = {
    registerUser,
    loginUser
};
