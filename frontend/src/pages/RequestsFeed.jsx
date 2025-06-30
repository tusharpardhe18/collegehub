import { useEffect, useState } from "react";
import axios from "axios";

export default function requestsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/posts?category=events");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching events:", err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="h5 mb-3 text-capitalize text-center">🎉 Events</h2>
      {loading ? (
        <p className="text-muted text-center">Loading...</p>
      ) : (
        <div className="row g-4">
          {posts.map((post) => (
            <div key={post._id} className="col-6 col-md-4 col-lg-3">
              <div className="card bg-white text-dark rounded-4 shadow-sm overflow-hidden">
                {post.posterUrl && (
                  <img
                    src={post.posterUrl}
                    className="card-img-top"
                    alt={post.title}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title mb-1">{post.title}</h5>
                  <p className="text-muted mb-0">{post.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}