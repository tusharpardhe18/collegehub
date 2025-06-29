import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="container mt-4">
      <h2 className="h5 mb-3 text-capitalize text-center">{category} Feed</h2>

      {loading ? (
        <p className="text-muted text-center">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted text-center">No posts yet.</p>
      ) : (
        <div className="row g-4">
  {posts.map((post) => (
    <div key={post._id} className="col-6 col-md-4 col-lg-3">
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
          <small className="bg-dark text-white px-2 py-1 rounded mb-2" style={{ width: "fit-content" }}>
            {post.date}
          </small>

          <h5 className="card-title mb-1">{post.title}</h5>
          <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>{post.location}</p>
          <p className="text-muted mb-1" style={{ fontSize: "0.8rem" }}>{post.category}</p>

          {post.price && (
            <p className="mt-auto text-primary fw-semibold">
              ₹ {post.price}
            </p>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
}
