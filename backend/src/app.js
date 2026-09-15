import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import reportRoutes from "./routes/report.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Security HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: false
}));

// CORS configuration supporting environment variable
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
    cors({
        origin: allowedOrigin,
        credentials: true
    })
);

// Rate limiter for authentication routes to prevent brute-force attacks
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // 50 attempts per window
    message: {
        success: false,
        message: "Too many login/registration attempts. Please try again in 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check route
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CampusKart API is healthy and operational",
        timestamp: new Date().toISOString()
    });
});

// Mount Routes
app.use("/api/v1/users/login", authLimiter);
app.use("/api/v1/users/register", authLimiter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reports", reportRoutes);

// Centralized error handling middleware
app.use(errorHandler);

export default app;