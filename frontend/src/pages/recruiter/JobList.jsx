import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../../api/jobApi";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import "../jobseeker/jobseeker.css";

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter(job => job._id !== id));
      } catch (err) {
        console.error("Failed to delete job", err);
      }
    }
  };

  if (loading) return <p className="text-center mt-4">Loading jobs...</p>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="container pt-32 pb-40 px-4 xl:px-0 max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">My Posted Jobs</h2>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Manage and track your active job openings
            </p>
          </div>
          <Link to="/recruiter/post-job" className="btn btn-primary shadow-2xl shadow-blue-200 px-10 py-4 transform hover:-translate-y-1 transition-all flex items-center gap-2">
            <span className="text-xl leading-none">+</span> Post New Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-40 premium-card bg-white border-dashed border-2 border-slate-200">
            <div className="text-8xl mb-8 grayscale opacity-50">📢</div>
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm">No active listings found</p>
            <p className="text-slate-300 text-xs mt-3 font-bold italic">Start your hiring journey by posting a role.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10">
            {jobs.map((job) => (
              <div key={job._id} className="premium-card bg-white hover:shadow-2xl transition-all border-l-[6px] border-l-blue-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 p-10 group">
                <div className="flex gap-8 items-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-sm">💼</div>
                  <div>
                    <h4 className="font-black text-3xl text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">{job.title}</h4>
                    <div className="flex flex-wrap gap-x-8 gap-y-3 mt-4 text-[11px] text-slate-400 font-black uppercase tracking-widest items-center">
                      <span className="flex items-center gap-2"><span className="text-xl opacity-50">📍</span> {job.location || "Remote"}</span>
                      <span className="flex items-center gap-2"><span className="text-xl opacity-50">📅</span> {new Date(job.createdAt).toLocaleDateString()}</span>
                      <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-lg border border-blue-100 italic">ID: {job._id.slice(-6)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <button onClick={() => handleDelete(job._id)} className="btn bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest flex-1 md:flex-none">Delete</button>
                  <Link to="/recruiter/applicants" className="btn btn-primary px-10 py-4 text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-100 flex-1 md:flex-none text-center transform hover:-translate-y-1 transition-all">
                    Applicants 👥
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobList;
