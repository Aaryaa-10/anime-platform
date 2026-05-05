import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import animeRoutes from "./routes/animeRoutes.js";

dotenv.config({ path: "./.env" });
const app = express();
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/anime", animeRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
console.log("JWT SECRET:", process.env.JWT_SECRET);
