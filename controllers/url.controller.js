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


const getLongURL = async (req, res) => {
    // get shortId from url
    let shortid = req.params.shortid

    // find long url matching with shortID in database
    let urlObject = await URL.findOne({shortID : shortid})

    if(!urlObject){
        return res.status(404).json({
            message : "No Long URL found with the id."
        })
    }

    res.redirect(urlObject.originalURL)

    // redirect user to the matching long url
}

module.exports = {
    createShortURL,
    getLongURL
}