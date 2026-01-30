import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/applicationApi";

const Applications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplications().then(setApps);
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Applications</h2>

      {apps.length === 0 && <p>No applications found</p>}

      {apps.map(app => (
        <div key={app._id} className="card p-3 mb-2">
          <h5>{app.job.title}</h5>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Applications;
