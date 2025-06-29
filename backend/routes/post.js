import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// POST new post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving post:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET posts (with optional filtering by category)
router.get("/", async (req, res) => {
  const { category } = req.query;

  try {
    const filter = category ? { category } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

export default router;
