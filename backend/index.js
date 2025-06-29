import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Post from "./models/Post.js";

dotenv.config(); // 👈 Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // 👈 Required to parse JSON from frontend

// Test route
app.get("/", (req, res) => {
  res.send("CollegeHub API is running 🚀");
});

// Create post
app.post("/posts", async (req, res) => {
  try {
    console.log("Received data:", req.body); // 👈 Debug log
    const newPost = new Post(req.body);
    const saved = await newPost.save();
    console.log("Saved post:", saved); // 👈 Confirm DB write
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving post:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Fetch posts
app.get("/posts", async (req, res) => {
  try {
    const { category } = req.query;
    const posts = await Post.find(category ? { category } : {}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ MongoDB Connection and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB ✅");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌:", err.message);
  });
