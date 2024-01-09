const express = require('express');
const upload = require('../lib/imageUploader');

const router = express.Router()


router.post("/upload", upload.single("profile"), async (req, res, next) => {
    try {
        console.log(req.file)
        console.log(req.protocol)
        console.log(req.hostname)
        // console.log(req.)
        res.json({
            message : "ok",
            // fileUrl : req.protocol+ "://" + req.hostname + "/images/" +req.file.filename
        })

    } catch (error) {
        
        next(error)
    }
})



// profile
// post
// router.post("/upload", upload.fields([
//     {
//         name : "profilePicture",
//         maxCount : 1
//     },
//     {
//         name : "postImages",
//         maxCount : 10
//     }
// ]))



module.exports = router