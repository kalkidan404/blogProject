const errorMiddleware = (err, req, res, next) => {
     if (!err) {
        return next();
    }
    console.error(err.stack);

    res.status(err.status || 500).json({
        message: err.message || "Something went wrong"
    });
};


module.exports = errorMiddleware;