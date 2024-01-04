const CustomError = require("./CustomError")

module.exports = (func) => {
    return async function (req, res, next){
        return Promise.resolve(func(req, res, next)).catch(err => {
            console.log(err.name === "JsonWebTokenError")// invalid token error
            next(err)
        })
    }
}



// // promise , function
// let getUser = asyncErrorHandler(async () => {
//     res.status(200).json({
//         message : "Hey"
//     })
// })