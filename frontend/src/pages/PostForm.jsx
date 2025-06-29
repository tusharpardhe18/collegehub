import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function PostForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: "events",
    title: "",
    description: "",
    posterUrl: "",
    location: "",
    price: "",
    date: "",
    bookingLink: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/posts", form);
      toast.success("Post submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error submitting post:", err);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="container mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="mb-4">📝 Create a Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={form.category}
            onChange={handleChange}
          >
            <option value="events">🎉 Events</option>
            <option value="noticeboard">📢 Noticeboard</option>
            <option value="exchange">🔄 Exchange</option>
            <option value="requests">🤝 Requests</option>
          </select>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <AnimatePresence mode="wait">
          {form.category !== "events" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {form.category !== "noticeboard" && (
            <motion.div
              key="event-fields"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-3">
                <label className="form-label">Poster Image URL</label>
                <input
                  type="text"
                  name="posterUrl"
                  className="form-control"
                  value={form.posterUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price (e.g. ₹499 onwards)</label>
                <input
                  type="text"
                  name="price"
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="bookingLink" className="form-label">
                  Booking Link
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="bookingLink"
                  name="bookingLink"
                  placeholder="https://event-link"
                  value={form.bookingLink}
                  onChange={handleChange}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date (common field) */}
        <div className="mb-3">
          <label className="form-label">Event Date (e.g. Sat, 5 Jul)</label>
          <input
            type="text"
            name="date"
            className="form-control"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit Post
        </button>
      </form>
    </motion.div>
  );
}
