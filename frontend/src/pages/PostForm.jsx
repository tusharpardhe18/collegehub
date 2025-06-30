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
    mode: "",
    instagram: "",
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
      className="container mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="row align-items-center">
        {/* Left: Form */}
        <motion.div
          className="col-lg-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
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

            {/* Description (not for Events) */}
            <AnimatePresence mode="wait">
              {form.category !== "events" && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="2"
                      value={form.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Event-only Fields */}
            <AnimatePresence mode="wait">
              {form.category !== "noticeboard" && (
                <motion.div
                  key="event-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
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
                    <label className="form-label">Price (₹ or Free)</label>
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      value={form.price}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Exchange Fields */}
            <AnimatePresence mode="wait">
              {form.category === "exchange" && (
                <motion.div
                  key="exchange-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select
                      name="mode"
                      className="form-select"
                      value={form.mode}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Buy">Buy</option>
                      <option value="Sell">Sell</option>
                      <option value="Trade">Trade</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Instagram Profile Link</label>
                    <input
                      type="url"
                      name="instagram"
                      className="form-control"
                      placeholder="https://instagram.com/username"
                      value={form.instagram}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Date */}
            <div className="mb-3">
              <label className="form-label">Date (e.g. Sat, 5 Jul)</label>
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

        {/* Right: Image */}
        <motion.div
          className="col-lg-6 d-flex justify-content-center align-items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="/assests/form2.jpg" // ✅ FIXED path
            alt="Post Visual"
            className="img-fluid rounded-4 shadow"
            style={{
              maxHeight: "400px",
              objectFit: "cover",
              width: "100%",
              filter: "brightness(0.8)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
