const ErrorHandler = (err, req, res, next) => {
    return res.json({
        statusCode: err.status || 500,
        error: {
            message: err.message || "internalServerError",
            invalidParams: err.error
        }
    });
}

module.exports = ErrorHandler;