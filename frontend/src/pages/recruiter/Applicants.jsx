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
  const [selectedCandidates, setSelectedCandidates] = useState([]);

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

  const toggleCandidateSelection = (appId) => {
    setSelectedCandidates(prev => 
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const toggleAllSelections = () => {
    if (selectedCandidates.length === filteredApps.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredApps.map(app => app._id));
    }
  };

  const exportToCSV = () => {
    if (selectedCandidates.length === 0) return alert("Select candidates to export");
    const selectedData = apps.filter(app => selectedCandidates.includes(app._id));
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Email,Job Role,Match %,Status,Applied Date\n";
    
    selectedData.forEach(app => {
      const matchScore = app.resume?.detectedSkills?.length > 5 ? '94%' : app.resume?.detectedSkills?.length > 2 ? '78%' : '45%';
      const row = `${app.applicant?.name || 'Anonymous'},${app.applicant?.email || 'Hidden'},${app.job?.title || 'Unknown'},${matchScore},${app.status},${new Date(app.createdAt || Date.now()).toLocaleDateString()}`;
      csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "candidates_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="container pt-32 pb-40 px-4 xl:px-0 max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Candidate Pipeline</h2>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Powered by AI Resume Screening & Matching
            </p>
          </div>
          <div className="flex bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 px-4 py-2">
            <select
              className="bg-transparent border-none text-[12px] font-black uppercase tracking-widest text-slate-600 focus:outline-none cursor-pointer placeholder-slate-400"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Applicants</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6 px-2">
           <div className="flex items-center gap-4">
             <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-3 py-1.5 rounded-lg">{selectedCandidates.length} Selected</span>
             {selectedCandidates.length > 0 && (
                <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors">Bulk Action ⌄</button>
             )}
           </div>
           <button 
             onClick={exportToCSV}
             className="btn bg-white border border-slate-200 shadow-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-[10px] font-black uppercase tracking-widest py-2.5 px-4 flex items-center gap-2"
           >
             <span>📥</span> Export CSV
           </button>
        </div>

        <div className="premium-card p-0 overflow-hidden bg-white shadow-2xl shadow-slate-200/60 border-none mb-12">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-slate-50/50 border-b border-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-5 w-12 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      checked={filteredApps.length > 0 && selectedCandidates.length === filteredApps.length}
                      onChange={toggleAllSelections}
                    />
                  </th>
                  <th className="px-8 py-5">Candidate</th>
                  <th className="px-8 py-5">Position</th>
                  <th className="px-8 py-5 text-center">AI Match</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredApps.length > 0 ? filteredApps.map(app => (
                  <tr key={app._id} className={`hover:bg-slate-50/50 transition-all group ${selectedCandidates.includes(app._id) ? 'bg-indigo-50/30' : ''}`}>
                    <td className="px-6 py-6 text-center">
                       <input 
                         type="checkbox" 
                         className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                         checked={selectedCandidates.includes(app._id)}
                         onChange={() => toggleCandidateSelection(app._id)}
                       />
                    </td>
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

