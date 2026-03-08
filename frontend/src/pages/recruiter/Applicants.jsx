import { useEffect, useState } from "react";
import {
  getRecruiterApplications,
  updateApplicationStatus,
} from "../../api/recruiterApi";
import ResumeScreenerModal from "../../components/resume/ResumeScreenerModal";
import Navbar from "../../components/common/Navbar";
import "../jobseeker/jobseeker.css";

const RecruiterApplications = () => {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getRecruiterApplications().then(data => {
      setApps(data);
      setFilteredApps(data);
    });
  }, []);

  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredApps(apps);
    } else if (filterStatus === 'pending') {
      setFilteredApps(apps.filter(app => app.status !== 'shortlisted' && app.status !== 'rejected'));
    } else {
      setFilteredApps(apps.filter(app => app.status === filterStatus));
    }
  }, [filterStatus, apps]);

  const changeStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    setApps(apps.map(a => a._id === id ? { ...a, status } : a));
  };

  const openResumeModal = (app) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const closeResumeModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="container py-10 pb-32 px-4 xl:px-0 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Candidate Pipeline</h2>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Powered by AI Resume Screening & Matching
            </p>
          </div>
          <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            {['all', 'shortlisted', 'pending', 'rejected'].map(status => (
              <button
                key={status}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${filterStatus === status
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                  : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="premium-card p-0 overflow-hidden bg-white shadow-2xl shadow-slate-200/60 border-none">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-slate-50/50 border-b border-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Candidate</th>
                  <th className="px-8 py-5">Position</th>
                  <th className="px-8 py-5 text-center">AI Match</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredApps.length > 0 ? filteredApps.map(app => (
                  <tr key={app._id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-900 tracking-tight text-base group-hover:text-blue-600 transition-colors">{app.applicant?.name || "Anonymous Candidate"}</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-wider uppercase">{app.applicant?.email || "Email Hidden"}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-700 tracking-tight uppercase text-xs">{app.job?.title || "Unknown Position"}</div>
                      <div className="text-[10px] font-black text-slate-300 mt-1 uppercase tracking-tighter italic">📍 {app.job?.location || "Remote"}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center">
                        <div className={`text-base font-black ${app.resume?.detectedSkills?.length > 5 ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {app.resume?.detectedSkills?.length > 5 ? '94%' : app.resume?.detectedSkills?.length > 2 ? '78%' : '45%'}
                        </div>
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full ${app.resume?.detectedSkills?.length > 5 ? 'bg-emerald-500 shadow-sm shadow-emerald-200' : 'bg-amber-500'}`}
                            style={{ width: app.resume?.detectedSkills?.length > 5 ? '94%' : app.resume?.detectedSkills?.length > 2 ? '78%' : '45%' }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest border shadow-sm ${app.status === "shortlisted"
                        ? "status-shortlisted"
                        : app.status === "rejected"
                          ? "status-rejected"
                          : "status-applied"
                        }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-3">
                        <button
                          className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm group-hover:scale-105"
                          onClick={() => openResumeModal(app)}
                          title="View Analysis"
                        >
                          🔍
                        </button>
                        <button
                          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm ${app.status === 'shortlisted' ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white group-hover:scale-105'}`}
                          onClick={() => changeStatus(app._id, "shortlisted")}
                          disabled={app.status === "shortlisted"}
                          title="Shortlist Candidate"
                        >
                          ✓
                        </button>
                        <button
                          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm ${app.status === 'rejected' ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white group-hover:scale-105'}`}
                          onClick={() => changeStatus(app._id, "rejected")}
                          disabled={app.status === "rejected"}
                          title="Decline Candidate"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-24 text-center">
                      <div className="text-5xl mb-6 opacity-40">📂</div>
                      <p className="text-slate-300 font-black uppercase tracking-widest text-xs">No {filterStatus !== 'all' ? filterStatus : ''} applications found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <ResumeScreenerModal
        isOpen={isModalOpen}
        onClose={closeResumeModal}
        application={selectedApp}
      />
    </div>
  );
};

export default RecruiterApplications;

