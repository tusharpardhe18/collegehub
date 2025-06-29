// components/EventCard.jsx
export default function EventCard({ post }) {
  const eventDate = new Date(post.date);
  const formattedDate = eventDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow border-0">
        <div className="position-relative">
          <img
            src={post.posterUrl || "/default-poster.jpg"}
            alt={post.title}
            className="card-img-top"
            style={{ height: "280px", objectFit: "cover" }}
          />
          <span className="position-absolute bottom-0 start-0 bg-dark text-white px-2 py-1 fw-bold rounded-end">
            {formattedDate}
          </span>
        </div>
        <div className="card-body px-2 py-3">
          <h6 className="card-title fw-bold">{post.title}</h6>
          <p className="card-subtitle text-muted small mb-1">{post.location}</p>
          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
            {post.category}
          </p>
          {post.price && (
            <p className="fw-semibold text-primary mt-2 mb-0">₹ {post.price} onwards</p>
          )}
        </div>
      </div>
    </div>
  );
}
