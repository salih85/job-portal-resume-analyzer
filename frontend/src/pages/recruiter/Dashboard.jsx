import { useEffect, useState } from "react";
import { getRecruiterDashboard } from "../../api/recruiterApi";
import Navbar from "../../components/common/Navbar";

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    getRecruiterDashboard().then(setStats);
  }, []);

  return (
  <>
    <Navbar />

    <div className="container mt-4">
      <h2>Recruiter Dashboard</h2>

      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Total Jobs</h5>
            <h3>{stats.totalJobs}</h3>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h5>Total Applications</h5>
            <h3>{stats.totalApplications}</h3>
          </div>
        </div>
      </div>
    </div>
  </>
);

};

export default RecruiterDashboard;
