const shortid = require("shortid");
const URL = require("../models/url.model");
const jwt = require("jsonwebtoken");
const CustomError = require("../lib/CustomError");

const createShortURL = async (req, res, next) => {

    try {
       
        let headers = req.headers.authorization;
        
        if (!headers) {
           return next(new CustomError("No Header!", 401));
        }

        let token = headers.split(" ")[1];

        let verify = jwt.verify(token, "thisisaverysecuresignature");

        console.log(verify);

        return res.status(200).json({
            message: "Ok",
        });

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
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const getLongURL = async (req, res) => {
    try {
        // get shortId from url
        let shortid = req.params.shortid;

        // find long url matching with shortID in database
        let urlObject = await URL.findOne({ shortID: shortid });

        if (!urlObject) {
            return res.status(404).json({
                message: "No Long URL found with the id.",
            });
        }

        res.redirect(urlObject.originalURL);

        // redirect user to the matching long url
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {
    createShortURL,
    getLongURL,
};
