const multer = require("multer")
const fs = require("fs")
const path = require("path")



// req -> file -> upload in file system -> related info will get attached to the req -> req.file

// storage -> memory storage and disk storage
// ram or rom

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        if(fs.existsSync("./public/images")){
           return  cb(null, path.resolve("./public/images"))
        }

        fs.mkdirSync("./public/images")
        return  cb(null, path.resolve("./public/images"))
        
    },
    filename : (req, file, cb) => {
        let ext = path.extname(file.originalname)
        console.log(ext)
        let prefix = Math.floor(Math.random() * 1E9) + "-"+ Date.now()
        let filename = prefix + "-" + file.originalname.split(" ").join("-")
        return cb(null, filename)
    }
})


const upload = multer({storage})

module.exports = upload

// console.log(fs.existsSync("./uploads"))
// console.log(path.resolve("uploads"))