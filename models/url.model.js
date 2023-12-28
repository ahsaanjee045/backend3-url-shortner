const mongoose = require("mongoose")


const urlSchema = new mongoose.Schema({
    originalURL : String,
    shortID : String
})


const URL = mongoose.model("Url", urlSchema)

module.exports = URL






// url-shortner -> 

/* {
    originalUrl : "https://www.amazon.in/s?k=phone&crid=1QYG1H94V2JQO&sprefix=phon%2Caps%2C196&ref=nb_sb_noss_2",
    shortId : "1QYG1H94V2JQO"
} */

// http://localhost:5000/1QYG1H94V2JQO
// redirect client to original url