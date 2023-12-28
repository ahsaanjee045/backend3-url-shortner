const express = require('express')


const router = express.Router()

// http://localhost:5000/url/create
router.get("/newProduct", (req, res) => {
    res.send("Inside Product create function")
})
router.post("/")
router.put("/")
router.delete("/")


module.exports = router