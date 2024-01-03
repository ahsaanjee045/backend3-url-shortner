const express = require("express")
const connectDB = require("./db/connectDB")
const urlRoutes = require("./routes/url.routes")
const userRoutes = require("./routes/user.routes")
const CustomError = require("./lib/CustomError")
const { notFound } = require("./lib/notFound")


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


app.use((err, req, res, next) => {
    // console.log(err)
    console.log(err.statusCode, err.success, err.message)
    res.status(err.statusCode).json({
        success : err.success,
        error : err.message,
        stackTrace : err.stack
    })
})


connectDB().then(() => {
    app.listen(5000, () => {
        console.log('Server started on port 5000')
    })
})
