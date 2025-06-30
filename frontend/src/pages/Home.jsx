import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const category = searchParams.get("category") || "events";

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/posts?category=${category}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setPosts([]);
      } finally {
        setLoading(false);
        setExpandedId(null);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="container mt-4">
      <h2 className="h5 mb-3 text-capitalize text-center">{category} Feed</h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-muted text-center">No posts yet.</p>
          ) : category === "noticeboard" ? (
            <div className="d-flex flex-column gap-3">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="card bg-white text-dark shadow-sm rounded-4 p-3"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setExpandedId(expandedId === post._id ? null : post._id)
                  }
                >
                  <small className="bg-dark text-white px-2 py-1 rounded mb-2" style={{ width: "fit-content" }}>
                    Posted on {post.date}
                  </small>
                  <h5 className="card-title mb-1">{post.title}</h5>
                  <AnimatePresence>
                    {expandedId === post._id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted mb-1"
                        style={{ whiteSpace: "pre-wrap", overflow: "hidden" }}
                      >
                        {post.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ) : category === "exchange" ? (
            <div className="row g-4">
              {posts.map((post) => (
                <div key={post._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card h-100 border-0 bg-white text-dark shadow-sm rounded-4 overflow-hidden">
                    {post.posterUrl && (
                      <img
                        src={post.posterUrl}
                        className="card-img-top"
                        alt={post.title}
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <small className="bg-dark text-white px-2 py-1 rounded mb-2" style={{ width: "fit-content" }}>
                        {post.date || "Recently Posted"}
                      </small>

                      <h5 className="card-title mb-1">{post.title}</h5>

                      <p className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
                        {post.description}
                      </p>

                      {post.location && (
                        <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                          📍 {post.location}
                        </p>
                      )}

                      <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                        💸 {post.price ? `₹ ${post.price}` : "Free"}
                      </p>

                      {post.mode && (
                        <p className="badge bg-info text-dark w-fit-content mb-2" style={{ fontSize: "0.75rem" }}>
                          {post.mode}
                        </p>
                      )}

                      {post.instagram && (
                        <a
                          href={post.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none text-primary mt-auto"
                          style={{ fontSize: "0.9rem" }}
                        >
                          📸 Ping Me!
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-4">
              {posts
                .slice()
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((post) => (
                  <div key={post._id} className="col-6 col-md-4 col-lg-3">
                    <a
                      href={post.bookingLink || "#"}
                      target={post.bookingLink ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      <div className="card h-100 border-0 bg-white text-dark shadow-sm rounded-4 overflow-hidden">
                        {post.posterUrl && (
                          <img
                            src={post.posterUrl}
                            className="card-img-top"
                            alt={post.title}
                            style={{ height: "400px", objectFit: "cover" }}
                          />
                        )}
                        <div className="card-body d-flex flex-column">
                          <small
                            className="bg-dark text-white px-2 py-1 rounded mb-2"
                            style={{ width: "fit-content" }}
                          >
                            {post.date}
                          </small>
                          <h5 className="card-title mb-1">{post.title}</h5>
                          {post.location && (
                            <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                              📍{post.location}
                            </p>
                          )}
                          {post.price && (
                            <p className="mt-auto text-primary fw-semibold">
                              ₹ {post.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
