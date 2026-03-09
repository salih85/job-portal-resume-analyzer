import { useEffect, useState } from "react";
import { getRecruiterDashboard, getRecruiterApplications } from "../../api/recruiterApi";
import { postJob } from "../../api/jobApi";
import Navbar from "../../components/common/Navbar";
import PostJobModal from "../../components/jobs/PostJobModal";
import { Link } from "react-router-dom";

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
      setRecentApplicants(data.slice(0, 5));
    });
  }, []);

  const handlePostJob = async (jobData) => {
    try {
      await postJob(jobData);
      alert("Job posted successfully!");

      const updatedStats = await getRecruiterDashboard();
      setStats(updatedStats);

    } catch (error) {
      console.error(error);
      alert("Failed to post job");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <Navbar />

      <div className="container pt-32 pb-40 px-4 xl:px-0 max-w-7xl mx-auto flex flex-col gap-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Recruiter Dashboard
            </h1>

            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Manage jobs and track applicants
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary shadow-2xl shadow-blue-200 px-8 py-4 transform hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <span className="text-xl leading-none">+</span> Post Job
          </button>

        </div>


        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {[
            { title: "Total Jobs", value: stats.totalJobs, icon: "💼" },
            { title: "Applications", value: stats.totalApplications, icon: "👥" },
            { title: "Active Jobs", value: stats.activeJobs || stats.totalJobs, icon: "🔥" },
            { title: "Pending", value: stats.pendingApplications || recentApplicants.length, icon: "⏳" }
          ].map((item, index) => (

            <div
              key={index}
              className="premium-card bg-white p-6 flex justify-between items-center group hover:shadow-2xl transition-all border-none"
            >

              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {item.value}
                </h2>
              </div>

              <span className="text-3xl">
                {item.icon}
              </span>

            </div>

          ))}

        </div>


        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* APPLICANTS */}
          <div className="lg:col-span-2 mb-8 lg:mb-0">

            <div className="premium-card bg-white shadow-2xl shadow-slate-200/60 border-none p-0 overflow-hidden mb-8 lg:mb-0">

              <div className="flex justify-between items-center px-8 py-6 border-b border-slate-50">

                <h3 className="font-black text-slate-900 tracking-tight text-lg">
                  Recent Applicants
                </h3>

                <Link
                  to="/recruiter/applicants"
                  className="text-indigo-600 text-sm font-medium hover:underline"
                >
                  View all
                </Link>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                  <thead className="bg-slate-50/50 border-b border-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">

                    <tr>
                      <th className="px-8 py-5">Candidate</th>
                      <th className="px-8 py-5">Role</th>
                      <th className="px-8 py-5 text-right">Status</th>
                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-50">

                    {recentApplicants.length > 0 ? (

                      recentApplicants.map((app) => (
                        <tr key={app._id} className="border-t hover:bg-slate-50/50 transition-all group">

                          <td className="px-8 py-6">

                            <p className="font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                              {app.applicant?.name}
                            </p>

                            <p className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-wider uppercase">
                              {app.applicant?.email}
                            </p>

                          </td>

                          <td className="px-8 py-6 font-bold text-slate-700 uppercase tracking-tight text-xs">
                            {app.job?.title}
                          </td>

                          <td className="px-8 py-6 text-right">

                            <span className="bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md border shadow-sm">
                              {app.status}
                            </span>

                          </td>

                        </tr>
                      ))

                    ) : (

                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-12 text-gray-400"
                        >
                          No applicants yet
                        </td>
                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>


          {/* SIDEBAR */}
          <div className="space-y-6">

            <div className="premium-card bg-indigo-600 text-white border-none shadow-2xl shadow-indigo-200">

              <h3 className="font-black tracking-tight text-indigo-100 mb-2 uppercase text-xs">
                Hiring Velocity
              </h3>

              <p className="text-3xl font-bold">
                24%
              </p>

              <p className="text-indigo-100 text-sm mt-1">
                Faster hiring this month
              </p>

            </div>


            <div className="premium-card bg-white shadow-2xl shadow-slate-200/60 border-none p-8">

              <h3 className="font-black text-slate-900 tracking-tight text-lg mb-6">
                Quick Actions
              </h3>

              <div className="space-y-3">

                <Link
                  to="/recruiter/applicants"
                  className="block bg-gray-100 hover:bg-gray-200 p-3 rounded text-center"
                >
                  View Applicants
                </Link>

                <button onClick={() => alert("Dashboard data exported to your registered email.")} className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 p-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 transition-colors">
                  Export Data
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>


      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPost={handlePostJob}
      />

    </div>
  );
};

export default RecruiterDashboard;
