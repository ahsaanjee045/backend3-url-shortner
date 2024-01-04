const shortid = require("shortid");
const URL = require("../models/url.model");
const jwt = require("jsonwebtoken");
const CustomError = require("../lib/CustomError");
const asyncErrorHandler = require("../lib/asyncErrorHandler");

const createShortURL = asyncErrorHandler(async (req, res, next) => {

    let header = req.headers.authorization
    if(!header){
        return next(new CustomError("No authorization header", 401))
    }

    let token = header.split(" ")[1]
    if(!token){
        return next(new CustomError("No token present in header", 401))
    }
    let verify = jwt.verify(token, process.env.JWT_SECRET)

    // if
    
    let originalURL = req.body.longURL;
    if (!originalURL || !originalURL.trim()) {
        return res.status(400).json({
            message: "Invalid/Empty long URL",
        });
    }
    let url = await URL.create({
        originalURL,
        shortID: shortid(),
    });

    res.status(201).json({
        message: "Short URL created",
        link: "http://localhost:5000/url/" + url.shortID,
    });
});

const getLongURL = asyncErrorHandler(async (req, res) => {
    let shortid = req.params.shortid;

   
    let urlObject = await URL.findOne({ shortID: shortid });

    if (!urlObject) {
        return res.status(404).json({
            message: "No Long URL found with the id.",
        });
    }

    res.redirect(urlObject.originalURL);
});

module.exports = {
    createShortURL,
    getLongURL,
};
