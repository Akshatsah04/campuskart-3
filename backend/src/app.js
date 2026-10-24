import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import reportRoutes from "./routes/report.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Security HTTP headers
app.use(helmet({
    crossOriginResourcePolicy: false
}));

// CORS configuration supporting environment variable
const allowedOrigins = [
    "http://localhost:5173",
    "https://mujshoppers.vercel.app",
];

app.use(
cors({
origin: (origin, callback) => {
// Allow requests without an Origin header, such as server-to-server requests.
if (!origin || allowedOrigins.includes(origin)) {
return callback(null, true);
}

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/auth", authRoutes);

// Centralized error handling middleware
app.use(errorHandler);

export default app;