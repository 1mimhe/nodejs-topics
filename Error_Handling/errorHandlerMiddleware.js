const ErrorHandler = (err, req, res) => {
    return res.json({
        statusCode: err?.status ?? err?.statusCode ?? 500,
        error: {
            message: err?.message ?? "internalServerError",
            invalidParams: err?.error
        }
    });
}

module.exports = ErrorHandler;