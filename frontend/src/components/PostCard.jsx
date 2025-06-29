import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link
      to={`/post/${post._id}`}
      className="border rounded-lg p-4 shadow hover:shadow-md transition block"
    >
      <h2 className="text-lg font-bold mb-2">{post.title}</h2>

      <p
        className="card-text text-sm text-gray-800 mb-3"
        style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
      >
        {post.description}
      </p>

      <span className="text-xs text-blue-500 font-medium">
        {post.category}
      </span>
    </Link>
  );
}
