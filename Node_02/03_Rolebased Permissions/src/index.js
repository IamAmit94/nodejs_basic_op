// const express = require("express");
// const dotenv = require("dotenv").config();
// const dbConnect = require('./config/dbConnect');
// const authRoutes = require('./routes/authRoutes');

import express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnect.js"
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();



const app = express();
// Start the server
const PORT = process.env.PORT || 7002;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})