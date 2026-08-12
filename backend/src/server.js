import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("CampusKart backend server is running");
});


connectDB();


app.listen(PORT, () => {
    console.log(`CampusKart server running on port ${PORT}`);
});