import { Link, useNavigate } from "react-router-dom";

export default function Navbar2() {
  const navigate = useNavigate();

  return (
    <nav className="navbar px-4 py-2" style={{ backgroundColor: "#121212", borderBottom: "1px solid #333" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
        <Link className="navbar-brand fw-bold me-auto" to="/">
          <img src="/assests/main3.png" alt="CollegeHub Logo" style={{ height: "50px", objectFit: "contain" }} />
        </Link>

        <div className="d-flex gap-3 mx-auto">
          <button className="nav-button" onClick={() => navigate("/events")}>🎉 Events</button>
          <button className="nav-button" onClick={() => navigate("/noticeboard")}>📢 Noticeboard</button>
          <button className="nav-button" onClick={() => navigate("/exchange")}>🔄 Exchange</button>
          <button className="nav-button" onClick={() => navigate("/requests")}>🤝 Requests</button>
        </div>
      </div>
    </nav>
  );
}