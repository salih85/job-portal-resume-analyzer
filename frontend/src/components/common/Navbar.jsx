import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          Job<span>Portal</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          {/* AUTH LINKS */}
          {!user && (
            <>
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/jobs" className={`nav-link ${isActive("/jobs") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Jobs</Link>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary ml-4" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </>
          )}

          {/* JOB SEEKER */}
          {user?.role === "jobseeker" && (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <Link to="/jobs" className={`nav-link ${isActive("/jobs") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Jobs</Link>
              <Link to="/applications" className={`nav-link ${isActive("/applications") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Applications</Link>
              <Link to="/profile" className={`nav-link ${isActive("/profile") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Profile</Link>
            </>
          )}

          {/* RECRUITER */}
          {user?.role === "recruiter" && (
            <>
              <Link to="/recruiter/dashboard" className={`nav-link ${isActive("/recruiter/dashboard") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <Link to="/recruiter/applicants" className={`nav-link ${isActive("/recruiter/applicants") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Applicants</Link>
              <Link to="/recruiter/jobs" className={`nav-link ${isActive("/recruiter/jobs") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>My Jobs</Link>
            </>
          )}

          {/* ADMIN */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className={`nav-link ${isActive("/admin/dashboard") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Admin</Link>
              <Link to="/admin/users" className={`nav-link ${isActive("/admin/users") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>Users</Link>
            </>
          )}

          {/* LOGOUT */}
          {user && (
            <button onClick={handleLogout} className="btn btn-secondary ml-4">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

