import express from "express";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

export default app;