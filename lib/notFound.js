const CustomError = require("./CustomError")

module.exports.notFound = (req, res, next) => {
    next(new CustomError("Page Not Found : " + req.originalUrl + " with method : " + req.method, 404))
}