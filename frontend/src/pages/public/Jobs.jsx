import { useEffect, useState } from "react";
import { getJobs } from "../../api/jobApi";
import JobCard from "../../components/jobs/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]); // always array

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Available Jobs</h2>

      {jobs.length === 0 && <p>No jobs found</p>}

      {jobs.map(job => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default Jobs;
