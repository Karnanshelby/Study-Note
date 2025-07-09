// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import authRouter from "./routes/auth.route.js";
// import noteRouter from "./routes/note.route.js";

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: ["https://study-note-omega.vercel.app"], credentials: true }));

// // Connect to MongoDB once
// let isConnected = false;
// const connectDB = async () => {
//     if (isConnected) return;
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connected to MongoDB");
//         isConnected = true;
//     } catch (err) {
//         console.error(err);
//     }
// };
// connectDB();

// app.use("/api/auth", authRouter);
// app.use("/api/note", noteRouter);

// // Error handler
// app.use((err, req, res, next) => {
//     const statuscode = err.statuscode || 500;
//     const message = err.message || "Internal server error";
//     return res.status(statuscode).json({
//         success: false,
//         statuscode,
//         message,
//     });
// });

// export default app; // ✅ Vercel will use this

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

dotenv.config();

const app = express();

// ✅ List of allowed frontend domains
const allowedOrigins = ["https://study-note-omega.vercel.app"];

// ✅ CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Handle Preflight (OPTIONS) Requests
app.options("*", cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB Connection
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
    isConnected = true;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
connectDB();

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal server error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

export default app; // ✅ For Vercel
