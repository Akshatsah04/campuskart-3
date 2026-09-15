export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log for debugging in development
    if (process.env.NODE_ENV !== "production") {
        console.error("Error Caught:", err);
    }

    // Mongoose bad ObjectId (CastError)
    if (err.name === "CastError") {
        const message = `Resource not found with id: ${err.value}`;
        return res.status(404).json({
            success: false,
            message
        });
    }

    // Mongoose duplicate key (E11000)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || "field";
        const message = `An account or record with this ${field} already exists`;
        return res.status(409).json({
            success: false,
            message
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: message
        });
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid token. Please log in again."
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Session expired. Please log in again."
        });
    }

    // Multer upload errors
    if (err.name === "MulterError") {
        let message = err.message;
        if (err.code === "LIMIT_FILE_SIZE") {
            message = "File is too large. Maximum size allowed is 5MB per image.";
        } else if (err.code === "LIMIT_FILE_COUNT") {
            message = "Too many files. Maximum 5 images allowed.";
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
            message = `Unexpected upload field: ${err.field}`;
        }
        return res.status(400).json({
            success: false,
            message
        });
    }

    // Generic error response
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
    });
};
