import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJob } from "../../api/jobApi";
import Navbar from "../../components/common/Navbar";
import "../jobseeker/jobseeker.css";

const PostJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await postJob(form);
    alert("Job posted successfully!");
    navigate("/recruiter/jobs");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="container pt-16 pb-40 px-4 xl:px-0 max-w-3xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Post a New Opportunity</h2>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Reach the best talent with our AI-powered platform
            </p>
          </div>
        </div>

        <div className="premium-card bg-white shadow-2xl shadow-slate-200/60 p-10 border-none">
          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Job Title</label>
                <input
                  className="input text-lg font-bold py-3"
                  placeholder="e.g. Senior Full Stack Engineer"
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Company</label>
                <input
                  className="input font-medium"
                  placeholder="e.g. Acme Corp"
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Location</label>
                <input
                  className="input"
                  placeholder="e.g. San Francisco, CA or Remote"
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Job Type</label>
                <select
                  className="input font-bold text-blue-600 appearance-none bg-slate-50 border-none cursor-pointer"
                  onChange={e => setForm({ ...form, type: e.target.value })}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Salary Estimate</label>
                <input
                  className="input font-medium"
                  placeholder="e.g. ₹12,00,000 - ₹18,00,000"
                  onChange={e => setForm({ ...form, salary: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Description</label>
                <textarea
                  className="input min-h-[160px] py-4"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>
            </div>

            <button className="btn btn-primary w-full py-5 text-lg shadow-xl shadow-blue-100 flex items-center justify-center gap-3">
              <span>🚀</span>
              Publish Global Listing
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostJob;
