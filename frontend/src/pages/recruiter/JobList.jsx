import { useEffect, useState } from "react";
import { getJobs } from "../../api/jobApi";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading jobs...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Posted Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Location</th>
              <th>Recruiter</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>{job.recruiter?.name || "N/A"}</td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobList;
