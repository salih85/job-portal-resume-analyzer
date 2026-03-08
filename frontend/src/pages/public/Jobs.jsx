import { useEffect, useState } from "react";
import { getJobs } from "../../api/jobApi";
import { applyJob, getMyApplications } from "../../api/applicationApi";
import { getProfile } from "../../api/profileApi";
import JobCard from "../../components/jobs/JobCard";
import JobDetailsModal from "../../components/jobs/JobDetailsModal";
import JobSeekerLayout from "../../components/layouts/JobSeekerLayout";
import "../../pages/jobseeker/jobseeker.css";

const Jobs = () => {
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
      <div className="jobseeker-layout">
        <div className="max-width-container">
          <div className="dashboard-header mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Available Opportunities</h2>
            <p className="text-slate-500 mt-1">Found {jobs.length} jobs that match your potential.</p>
          </div>

          <div className="space-y-1">
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
              <div className="text-center py-24 premium-card bg-slate-50 border-dashed">
                <p className="text-slate-400 font-medium">No jobs available at the moment. Please check back soon.</p>
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-slate-400">Loading jobs...</p>
              </div>
            )}
          </div>
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
