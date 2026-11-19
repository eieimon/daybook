import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/tasks", todoRoutes);
app.use("/api/users", userRoutes);

// Use the error handling middleware
app.use(errorHandler);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
