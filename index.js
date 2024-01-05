// const dotenv = require("dotenv")
// dotenv.config()
require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connectDB");
const urlRoutes = require("./routes/url.routes");
const userRoutes = require("./routes/user.routes");
const CustomError = require("./lib/CustomError");
const { notFound } = require("./lib/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const cors = require("cors");

// cors

const app = express();

// const whitelist = ['http://localhost:5173', 'https://google.com']

// app.use(cors({
//     origin : function (origin , cb){
//         console.log(origin) //
//     },
//     methods : "GET POST PUT DELETE",
//     credentials : true
// })) // allow request from any origin

const whitelist = [
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5173",
    "http://localhost:5500",
    "http://localhost:5173",
];
app.use(
    cors({
        methods: "POST",
        credentials: true,
        origin: function (origin, cb) {
            console.log(origin);
            if (whitelist.includes(origin) || !origin) {
                cb(null, true);
            } else {
                cb(new Error("Not Allowed to access this backend server"));
            }
        },
      
    })
);
app.use(express.json());

app.use("/url", urlRoutes);
app.use("/user", userRoutes);

app.all("/", (req, res, next) => {
    res.status(200);
    res.json({
        message: "Welcome to URL Shortener backend api!",
    });
});

app.all("*", notFound);

app.use(errorHandlerMiddleware);

console.log(process.env.NODE_ENV);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});

process.on("unhandledRejection", () => {
    console.log("Shutting down server due to some unhandled Promise rejection");
    process.exit(1);
});
