import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/jobSeekerApi";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

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
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>Job Seeker Dashboard</h2>

        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Total Applications</h5>
              <h3>{stats.total}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h5>Shortlisted</h5>
              <h3 className="text-success">{stats.shortlisted}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h5>Rejected</h5>
              <h3 className="text-danger">{stats.rejected}</h3>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link to="/applications" className="btn btn-primary me-2">
            My Applications
          </Link>
          <Link to="/profile" className="btn btn-secondary">
            My Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
