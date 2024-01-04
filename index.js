// const dotenv = require("dotenv")
// dotenv.config()
require("dotenv").config()


const express = require("express")
const connectDB = require("./db/connectDB")
const urlRoutes = require("./routes/url.routes")
const userRoutes = require("./routes/user.routes")
const CustomError = require("./lib/CustomError")
const { notFound } = require("./lib/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware")



const app = express()

app.use(express.json())


app.use("/url", urlRoutes)
app.use("/user", userRoutes)


app.all('/', (req, res, next) => {
  
    res.status(200)
    res.json({
        message : "Welcome to URL Shortener backend api!"
    })
})

app.all("*", notFound)


app.use(errorHandlerMiddleware)

console.log(process.env.NODE_ENV)

const PORT = process.env.PORT || 5000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
})


process.on("unhandledRejection", () => {
    console.log("Shutting down server due to some unhandled Promise rejection")
    process.exit(1)
})
