import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        name: "MujShoppers API",
        status: "running",
        version: "1.0.0"
    });
});

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`MujShoppers server running on port ${PORT}`);
});