import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["https://study-note-omega.vercel.app"], credentials: true }));

// Connect to MongoDB once
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        isConnected = true;
    } catch (err) {
        console.error(err);
    }
};
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Error handler
app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal server error";
    return res.status(statuscode).json({
        success: false,
        statuscode,
        message,
    });
});

export default app; // ✅ Vercel will use this
