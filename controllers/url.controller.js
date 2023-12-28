const shortid = require("shortid");
const URL = require("../models/url.model");


const createShortURL = async (req, res) => {
    
    let originalURL = req.body.longURL;
    if(!originalURL || !originalURL.trim()){
        return res.status(400).json({
            message : "Invalid/Empty long URL"
        })
    }
    let url = await URL.create({
        originalURL,
        shortID : shortid()
    })


    res.status(201).json({
        message : "Short URL created",
        link : "http://localhost:5000/url/" + url.shortID
    })
}

module.exports = {
    createShortURL
}