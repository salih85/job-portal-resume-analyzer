import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getJobs } from "../../api/jobApi";
import { applyJob, getMyApplications } from "../../api/applicationApi";
import { getProfile } from "../../api/profileApi";
import JobCard from "../../components/jobs/JobCard";
import JobDetailsModal from "../../components/jobs/JobDetailsModal";
import JobSeekerLayout from "../../components/layouts/JobSeekerLayout";
import Navbar from "../../components/common/Navbar";
import "../../pages/jobseeker/jobseeker.css";

const Jobs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  useEffect(() => {
    getJobs()
      .then((data) => {
        setJobs(data);
        getProfile().then(setUserProfile);
        getMyApplications().then(apps => setAppliedJobIds(new Set(apps.map(a => a.job?._id))));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (job) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApply = async (jobId) => {
    try {
      await applyJob(jobId);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return (
    <JobSeekerLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Available Opportunities</h2>
            <p className="text-slate-500 font-medium mt-2">Found {jobs.length} premium positions matching your expertise</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 text-indigo-700 text-sm font-bold">
            Live Updates 📡
          </div>
        </div>

        <div className="grid gap-4">
          {jobs.length > 0 ? (
            jobs.map(job => (
              <JobCard
                key={job._id}
                job={job}
                onClick={handleOpenModal}
                isApplied={appliedJobIds.has(job._id)}
              />
            ))
          ) : !loading ? (
            <div className="text-center py-20 glass-card bg-slate-50/50 border-dashed border-2">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-slate-400 font-bold text-lg">No matches found at the moment.</p>
              <p className="text-slate-400 text-sm mt-1">Check back soon for new opportunities!</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-slate-500 font-bold">Curating opportunities...</p>
            </div>
          )}
        </div>
      </div>

      <JobDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onApply={handleApply}
        userProfile={userProfile}
        isApplied={selectedJob ? appliedJobIds.has(selectedJob._id) : false}
      />
    </JobSeekerLayout>
  );
};

export default Jobs;
