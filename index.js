// MVC - Model view Controller
// routes - /users
//          /products
//          /orders
// utils - common utility functions
// db - database connection


const express = require("express")
const connectDB = require("./db/connectDB")
const urlRoutes = require("./routes/url.routes")
const productRoutes = require("./routes/product.routes")


const app = express()

app.use(express.json())

app.use("/url", urlRoutes)
// app.use("/products", productRoutes)

app.get('/', (req, res) => {
    res.status(200)
    res.json({
        message : "Welcome to URL Shortener backend api!"
    })
})




connectDB().then(() => {
    app.listen(5000, () => {
        console.log('Server started on port 5000')
    })
})