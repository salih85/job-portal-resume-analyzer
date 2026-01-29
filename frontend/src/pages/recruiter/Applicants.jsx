import { useEffect, useState } from "react";
import {
  getRecruiterApplications,
  updateApplicationStatus,
} from "../../api/recruiterApi";

const RecruiterApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getRecruiterApplications().then(setApps);
  }, []);

  const changeStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    setApps(apps.map(a => a._id === id ? { ...a, status } : a));
  };

  return (
    <div className="container mt-4">
      <h2>Job Applications</h2>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Job</th>
            <th>Applicant</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {apps.map(app => (
            <tr key={app._id}>
              <td>{app.job.title}</td>
              <td>{app.applicant.name}</td>
              <td>{app.applicant.email}</td>
              <td>{app.status}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => changeStatus(app._id, "shortlisted")}
                >
                  Shortlist
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => changeStatus(app._id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterApplications;
