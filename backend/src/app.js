import express from "express";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";




const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

export default app;