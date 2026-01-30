import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminApi";
import Navbar from "../../components/common/Navbar";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminDashboard().then(setStats);
  }, []);

  if (!stats) {
    return <p className="m-4">Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="fw-bold mb-4">Admin Dashboard</h2>

        <div className="row">
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Job Seekers" value={stats.jobSeekers} />
          <StatCard title="Recruiters" value={stats.recruiters} />
          <StatCard title="Jobs Posted" value={stats.jobs} />
          <StatCard title="Applications" value={stats.applications} />
        </div>
      </div>
    </>
  );
};

const StatCard = ({ title, value }) => (
  <div className="col-md-4 col-lg-3 mb-4">
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body text-center">
        <h6 className="text-muted mb-2">{title}</h6>
        <h2 className="fw-bold text-primary">{value}</h2>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
