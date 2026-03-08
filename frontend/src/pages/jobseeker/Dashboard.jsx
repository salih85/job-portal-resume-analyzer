import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/jobSeekerApi";
import { getJobs } from "../../api/jobApi";
import { applyJob, getMyApplications } from "../../api/applicationApi";
import { getProfile } from "../../api/profileApi";
import { Link } from "react-router-dom";
import JobSeekerLayout from "../../components/layouts/JobSeekerLayout";
import JobDetailsModal from "../../components/jobs/JobDetailsModal";
import JobCard from "../../components/jobs/JobCard";
import "./jobseeker.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    shortlisted: 0,
    rejected: 0,
  });
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getDashboardStats();
        setStats(statsData);
        setApplications(statsData.recentApplications || []);

        const jobsData = await getJobs();
        setJobs(jobsData);

        const profileData = await getProfile();
        setUserProfile(profileData);

        const appsData = await getMyApplications();
        setAppliedJobIds(new Set(appsData.map(app => app.job?._id)));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApply = async (jobId) => {
    try {
      await applyJob(jobId);
      // Immediately track the applied job for instant UI feedback
      setAppliedJobIds(prev => new Set([...prev, jobId]));

      const statsData = await getDashboardStats();
      setStats(statsData);
      setApplications(statsData.recentApplications || []);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return (
    <JobSeekerLayout>
      <div className="jobseeker-layout">
        <div className="max-width-container">
          <div className="dashboard-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Search Dashboard</h2>
              <p className="text-slate-500 mt-1">Discover opportunities and track your career progress.</p>
            </div>
            <Link to="/jobs" className="btn btn-primary px-8">
              Explore All Jobs
            </Link>
          </div>

          <div className="stats-grid mb-8">
            <div className="premium-card border-l-4 border-l-blue-500">
              <p className="stat-label">Total Applied</p>
              <div className="stat-value text-blue-600">{stats.total}</div>
            </div>

            <div className="premium-card border-l-4 border-l-emerald-500">
              <p className="stat-label">Shortlisted</p>
              <div className="stat-value text-emerald-600">{stats.shortlisted}</div>
            </div>

            <div className="premium-card border-l-4 border-l-rose-500">
              <p className="stat-label">Not Selected</p>
              <div className="stat-value text-rose-600">{stats.rejected}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Latest Jobs</h3>
                <Link to="/jobs" className="text-sm font-bold text-blue-600 hover:text-blue-800 underline">
                  View full list
                </Link>
              </div>
              <div className="space-y-1">
                {jobs.length > 0 ? jobs.slice(0, 3).map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onClick={handleOpenModal}
                    isApplied={appliedJobIds.has(job._id)}
                  />
                )) : (
                  <div className="text-center py-16 premium-card bg-slate-50 border-dashed">
                    <p className="text-slate-400 font-medium">No job recommendations at the moment.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
              <div className="premium-card p-0 overflow-hidden">
                <div className="activity-feed">
                  {applications.length > 0 ? applications.slice(0, 3).map((app, idx) => (
                    <div key={idx} className={`activity-item hover:bg-slate-50 transition-all border-l-4 ${app.status === 'shortlisted' ? 'border-l-emerald-600' :
                      app.status === 'rejected' ? 'border-l-rose-500' : 'border-l-blue-600'
                      }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-slate-800 truncate text-sm">{app.jobTitle}</p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tight">{new Date(app.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`text-[9px] px-2 py-1 rounded-md font-black uppercase tracking-widest border shadow-sm ${app.status === 'shortlisted' ? 'status-shortlisted' :
                          app.status === 'rejected' ? 'status-rejected' : 'status-applied'
                          }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  )) : (
                    <div className="p-12 text-center text-slate-400">
                      <p className="text-sm font-medium">No recent applications.</p>
                    </div>
                  )}
                </div>
                <Link to="/applications" className="block p-4 bg-slate-50 text-center text-sm font-bold text-blue-600 hover:bg-white transition-colors border-t">
                  Manage all applications
                </Link>
              </div>
            </div>
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

export default Dashboard;

