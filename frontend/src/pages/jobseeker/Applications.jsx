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
    const loadData = async () => {
      try {
        const [applications, profile] = await Promise.all([
          getMyApplications(),
          getProfile()
        ]);

        const sortedApps = applications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setApps(sortedApps);
        setUserProfile(profile);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <JobSeekerLayout>
      <div className="jobseeker-layout">
        <div className="max-width-container px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="dashboard-header mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              My Applications
            </h2>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Track the status of your submitted job applications.
            </p>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {apps.length > 0 ? (
              apps.map((app) => (
                <div
                  key={app._id}
                  className="premium-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >

                  {/* LEFT SECTION */}
                  <div className="flex gap-3 sm:gap-4">
                    <div className="job-icon text-2xl">📄</div>

                    <div className="min-w-0">
                      <h4 className="font-bold text-base sm:text-lg text-slate-900 leading-tight break-words">
                        {app.job?.title}
                      </h4>

                      <p className="text-blue-600 font-semibold text-sm mt-1">
                        {app.job?.company || "Hiring Partner"}
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm text-slate-400 font-medium">
                        <span>
                          📅 Applied on{" "}
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>

                        <span>
                          📍 {app.job?.location || "Remote"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SECTION */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm w-fit
                      ${
                        app.status === "shortlisted"
                          ? "status-shortlisted"
                          : app.status === "rejected"
                          ? "status-rejected"
                          : "status-applied"
                      }`}
                    >
                      {app.status}
                    </span>

                    <button
                      className="btn btn-secondary w-full sm:w-auto px-6 text-sm"
                      onClick={() => handleOpenModal(app.job)}
                    >
                      Application Details
                    </button>

                  </div>
                </div>
              ))
            ) : !loading ? (

              /* Empty State */
              <div className="text-center py-16 sm:py-24 premium-card bg-slate-50 border-dashed px-6">
                <div className="text-5xl mb-4">📭</div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
                  No applications yet
                </h3>

                <p className="text-slate-400 font-medium max-w-sm mx-auto text-sm sm:text-base">
                  Start your journey by applying for roles that match your skill set!
                </p>

                <Link
                  to="/jobs"
                  className="btn btn-primary mt-8 inline-block px-8 py-3"
                >
                  Find Your Next Role
                </Link>
              </div>

            ) : null}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onApply={() => {}}
        userProfile={userProfile}
        isApplied={true}
      />
    </JobSeekerLayout>
  );
};

export default Applications;
