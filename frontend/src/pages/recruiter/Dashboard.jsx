import { useEffect, useState } from "react";
import { getRecruiterDashboard, getRecruiterApplications } from "../../api/recruiterApi";
import { postJob, getJobs } from "../../api/jobApi";
import Navbar from "../../components/common/Navbar";
import PostJobModal from "../../components/jobs/PostJobModal";
import { Link } from "react-router-dom";
import "../jobseeker/jobseeker.css";

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    pendingApplications: 0
  });
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getRecruiterDashboard().then(setStats);
    getRecruiterApplications().then((data) => {
      setRecentApplicants(data.slice(0, 5)); // Show top 5 recent
    });
  }, []);

  const handlePostJob = async (jobData) => {
    try {
      await postJob(jobData);
      alert("Job posted successfully! It is now live for seekers.");
      getRecruiterDashboard().then(setStats);
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="container py-10 pb-32 px-4 xl:px-0 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recruiter Dashboard</h2>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Live Talent Acquisition Insight
            </p>
          </div>
          <button
            className="btn btn-primary shadow-2xl shadow-blue-200 px-10 py-4 transform hover:-translate-y-1 transition-all flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-xl leading-none">+</span> Post New Job
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="premium-card bg-white border-l-[6px] border-l-slate-400 hover:shadow-2xl transition-all p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Postings</p>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl shadow-sm">💼</div>
            </div>
            <h3 className="text-4xl font-black text-slate-900">{stats.totalJobs}</h3>
          </div>

          <div className="premium-card bg-white border-l-[6px] border-l-indigo-500 hover:shadow-2xl transition-all p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Applicants</p>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl shadow-sm">👥</div>
            </div>
            <h3 className="text-4xl font-black text-slate-900">{stats.totalApplications}</h3>
          </div>

          <div className="premium-card bg-white border-l-[6px] border-l-emerald-500 hover:shadow-2xl transition-all p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Roles</p>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xl shadow-sm">🔥</div>
            </div>
            <h3 className="text-4xl font-black text-emerald-600">{stats.activeJobs || stats.totalJobs}</h3>
          </div>

          <div className="premium-card bg-white border-l-[6px] border-l-blue-500 hover:shadow-2xl transition-all p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Review</p>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shadow-sm">⏳</div>
            </div>
            <h3 className="text-4xl font-black text-blue-600">{stats.pendingApplications || recentApplicants.length}</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="premium-card p-0 overflow-hidden bg-white shadow-2xl shadow-slate-200/60 border-none">
              <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-black text-slate-900 tracking-tight uppercase text-xs">Recent Applicants</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1">LATEST TALENT SUBMISSIONS</p>
                </div>
                <Link to="/recruiter/applicants" className="btn btn-secondary py-2 px-4 text-[10px] font-black uppercase tracking-widest">View All</Link>
              </div>
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                    <tr>
                      <th className="px-8 py-5">Candidate</th>
                      <th className="px-8 py-5">Role</th>
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {recentApplicants.length > 0 ? recentApplicants.map((app) => (
                      <tr key={app._id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="px-8 py-6">
                          <div className="font-black text-slate-900 tracking-tight text-base group-hover:text-blue-600 transition-colors">{app.applicant?.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">{app.applicant?.email}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-700 tracking-tight">{app.job?.title}</div>
                          <div className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mt-1">ID: {app.job?._id?.slice(-6)}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-slate-400 font-black text-[10px] uppercase tracking-widest">{new Date(app.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest border shadow-sm ${app.status === 'shortlisted' ? 'status-shortlisted' :
                            app.status === 'rejected' ? 'status-rejected' : 'status-applied'
                            }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-8 py-16 text-center text-slate-300 font-black uppercase text-xs tracking-widest">
                          No applicants to show yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="premium-card bg-indigo-900 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-black text-lg mb-2">Hiring Velocity</h4>
                <p className="text-indigo-200 text-sm mb-6">
                  You are hiring <span className="text-white font-bold">24% faster</span> than last quarter. Keep it up!
                </p>
                <div className="flex items-end gap-1 h-20 mb-4">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/20 rounded-t-sm transition-all hover:bg-white/40 group relative" style={{ height: `${h}%` }}>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-indigo-900 text-[10px] font-bold px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 text-7xl opacity-10">📈</div>
            </div>

            <div className="premium-card bg-white border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
                Quick Actions
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded">Update</span>
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/recruiter/applicants" className="p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 group transition-all text-center">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔍</div>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 uppercase tracking-tight">Screen</span>
                </Link>
                <div className="p-4 bg-slate-50 rounded-2xl hover:bg-emerald-50 group transition-all text-center cursor-pointer">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-600 uppercase tracking-tight">Reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPost={handlePostJob}
      />
    </div>
  );
};

export default RecruiterDashboard;
