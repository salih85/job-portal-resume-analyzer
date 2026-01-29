import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminDashboard().then(setStats);
  }, []);

  if (!stats) return <p className="m-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="row mt-4">
        <Card title="Total Users" value={stats.totalUsers} />
        <Card title="Job Seekers" value={stats.jobSeekers} />
        <Card title="Recruiters" value={stats.recruiters} />
        <Card title="Jobs Posted" value={stats.jobs} />
        <Card title="Applications" value={stats.applications} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="col-md-4 mb-3">
    <div className="card shadow-sm p-3 text-center">
      <h6>{title}</h6>
      <h3 className="text-primary">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;
