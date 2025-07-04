import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Framer Motion for animation

export default function Navbar() {
  const navigate = useNavigate();

  const categories = [
    { key: "events", label: "🎉 Events" },
    { key: "noticeboard", label: "📢 Noticeboard" },
    { key: "exchange", label: "🔄 Exchange" },
    { key: "requests", label: "🤝 Requests" },
  ];

  return (
    <nav className="navbar px-4 py-0" style={{ backgroundColor: "#121212", borderBottom: "1px solid #333" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">

        {/* 🏫 Brand Logo */}
        <Link className="navbar-brand fw-bold me-auto" to="/">
          <img
            src="./assests/main3.png"
            alt="CollegeHub Logo"
            style={{ height: "50px", objectFit: "contain" }}
          />
        </Link>

        {/* 🎯 Category Buttons with Animation */}
        <div className="d-flex justify-content-center flex-wrap gap-3 mx-auto my-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="nav-button btn btn-sm"
              onClick={() => navigate(`/?category=${cat.key}`)}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* ➕ Post Something */}
        <div className="ms-auto">
          <NavLink to="/post" className="nav-button1">
            + Post Something
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
