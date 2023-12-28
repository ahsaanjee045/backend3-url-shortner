const mongoose = require("mongoose")


async function connectDB() {
    try {
        mongoose.connect("mongodb://localhost:27017/backend3")
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB")
    }
}
module.exports = connectDB