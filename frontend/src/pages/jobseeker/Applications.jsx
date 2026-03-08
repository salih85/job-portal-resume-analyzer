import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/applicationApi";
import { getProfile } from "../../api/profileApi";
import JobSeekerLayout from "../../components/layouts/JobSeekerLayout";
import JobDetailsModal from "../../components/jobs/JobDetailsModal";
import { Link } from "react-router-dom";
import "./jobseeker.css";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getMyApplications().then((data) => {
      setApps(data);
      getProfile().then(setUserProfile);
      setLoading(false);
    });
  }, []);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <JobSeekerLayout>
      <div className="jobseeker-layout">
        <div className="max-width-container">
          <div className="dashboard-header mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">My Applications</h2>
            <p className="text-slate-500 mt-1">Track the status of your submitted job applications.</p>
          </div>

          <div className="space-y-1">
            {apps.length > 0 ? (
              apps.map((app) => (
                <div key={app._id} className="premium-card mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-4">
                    <div className="job-icon">📄</div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 leading-tight">{app.job?.title}</h4>
                      <p className="text-blue-600 font-semibold text-sm mt-1">{app.job?.company || "Hiring Partner"}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-400 font-medium">
                        <span>📅 Applied on {new Date(app.createdAt).toLocaleDateString()}</span>
                        <span>📍 {app.job?.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${app.status === 'shortlisted' ? 'status-shortlisted' :
                      app.status === 'rejected' ? 'status-rejected' : 'status-applied'
                      }`}>
                      {app.status}
                    </span>
                    <button
                      className="btn btn-secondary px-6 shrink-0 text-sm"
                      onClick={() => handleOpenModal(app.job)}
                    >
                      Application Details
                    </button>
                  </div>
                </div>
              ))
            ) : !loading ? (
              <div className="text-center py-24 premium-card bg-slate-50 border-dashed">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No applications yet</h3>
                <p className="text-slate-400 font-medium max-w-sm mx-auto">
                  Start your journey by applying for roles that match your skill set!
                </p>
                <Link to="/jobs" className="btn btn-primary mt-8 inline-block px-8 py-3">
                  Find Your Next Role
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <JobDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onApply={() => { }} // Already applied
        userProfile={userProfile}
        isApplied={true}
      />
    </JobSeekerLayout>
  );
};

export default Applications;
