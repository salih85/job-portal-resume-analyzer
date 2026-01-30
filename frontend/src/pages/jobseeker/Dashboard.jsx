import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/jobSeekerApi";
import { Link } from "react-router-dom";
import JobSeekerLayout from "../../components/layouts/JobSeekerLayout";
import "./jobseeker.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    shortlisted: 0,
    rejected: 0,
  });

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  return (
    <JobSeekerLayout>
      <h2 className="page-title">Job Seeker Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Applications</p>
          <h3>{stats.total}</h3>
        </div>

        <div className="stat-card success">
          <p>Shortlisted</p>
          <h3>{stats.shortlisted}</h3>
        </div>

        <div className="stat-card danger">
          <p>Rejected</p>
          <h3>{stats.rejected}</h3>
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/applications" className="btn primary">
          My Applications
        </Link>
        <Link to="/profile" className="btn secondary">
          My Profile
        </Link>
      </div>
    </JobSeekerLayout>
  );
};

export default Dashboard;
