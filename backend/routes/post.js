import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// 📩 Create a post
router.post('/', async (req, res) => {
  try {
    const { category, title, description, posterUrl, location, price, date, bookingLink } = req.body;

    const newPost = new Post({
      category,
      title,
      description,
      posterUrl,
      location,
      price,
      date,
      bookingLink,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 📩 Get posts by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
