module.exports = (err, req, res, next) => {
    let errMessage = err.message || "Something went wrong";
    let errStatusCode = err.statusCode || 500;
    let stack = process.env.NODE_ENV === "development" ? err.stack : null;

    if(err.name === "JsonWebTokenError"){
        errMessage = "Invalid Token Provided. Please provide valid token."
    }
    if(err.name === "TokenExpiredError"){
        errMessage = "Token Expired. Please Login Again."
    }

    if(err.name === "CastError"){ // id
        console.log(err)
        errMessage = "Invalid Casting for "
    }

    if(err.name === "ValidationError"){
        // console.log(Object.keys(err.errors).map(field => ))
        errMessage = "Validation failed for some values"
    }

    if(err.code === 11000){
        console.log(err)
        errMessage = "Duplicate key"
    }


    if (process.env.NODE_ENV === "production") {
        return res.status(errStatusCode).json({
            success: false,
            error: errMessage,
        });
    } else {
        return res.status(errStatusCode).json({
            success: false,
            error: errMessage,
            stack,
        });
    }
};
