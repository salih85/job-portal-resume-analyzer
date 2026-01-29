import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
  backgroundColor: "#0d6efd",
};

const link = {
  color: "white",
  marginRight: "15px",
  textDecoration: "none",
};

const logoutBtn = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "4px",
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ correct place

  const showPublicLinks =
    location.pathname === "/" || location.pathname === "/jobs";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <h2 style={{ color: "white" }}>JobPortal</h2>

      <div>
    
        {/* AUTH LINKS */}
        {!user && (
          <>
            <Link style={link} to="/">Home</Link>
             <Link style={link} to="/jobs">Jobs</Link>
            <Link style={link} to="/login">Login</Link>
            <Link style={link} to="/register">Register</Link>
          </>
        )}

        {/* JOB SEEKER */}
        {user?.role === "jobseeker" && (
          <>
            <Link style={link} to="/dashboard">Dashboard</Link>
            <Link style={link} to="/applications">Applications</Link>
            <Link style={link} to="/profile">Profile</Link>
            <Link style={link} to="/resume-upload">Upload Resume</Link>
          </>
        )}

        {/* RECRUITER */}
        {user?.role === "recruiter" && (
          <>
            <Link style={link} to="/recruiter/dashboard">Dashboard</Link>
            <Link style={link} to="/recruiter/post-job">Post Job</Link>
            <Link style={link} to="/recruiter/applicants">Applicants</Link>
            <Link style={link} to="/recruiter/jobs">My Jobs</Link>
          </>
        )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <>
            <Link style={link} to="/admin/dashboard">Admin Dashboard</Link>
            <Link style={link} to="/admin/users">Users</Link>
          </>
        )}

        {/* LOGOUT */}
        {user && (
          <button onClick={handleLogout} style={logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
