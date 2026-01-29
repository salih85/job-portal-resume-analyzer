import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/applicationApi";

const Applications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplications().then(data => setApps(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Applications</h2>

      {apps.map(app => (
        <div key={app._id} className="card mb-2 p-3">
          <h6>{app.job?.title}</h6>
          <span>Status: {app.status}</span>
        </div>
      ))}
    </div>
  );
};

export default Applications;
