import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job, onClick, isApplied }) => {
  return (
    <div className={`premium-card mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isApplied ? 'border-blue-100 bg-blue-50/10' : ''}`}>
      <div className="flex gap-4">
        <div className="job-icon flex-shrink-0">
          💼
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-bold text-lg text-slate-900 leading-tight">{job.title}</h4>
            {isApplied && (
              <span className="status-applied text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest border shadow-sm flex items-center gap-1">
                Applied
              </span>
            )}
          </div>
          <p className="text-blue-600 font-semibold text-sm mt-1">{job.company || "Hiring Partner"}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1">📍 {job.location}</span>
            <span className="flex items-center gap-1">💰 {job.salary || "Negotiable"}</span>
            <span className="badge badge-primary">{job.type}</span>
          </div>
        </div>
      </div>
      <div className="shrink-0 w-full md:w-auto">
        <button
          className={`btn ${isApplied ? 'btn-secondary' : 'btn-primary'} w-full md:w-auto`}
          onClick={() => onClick(job)}
        >
          {isApplied ? 'View Application' : 'View Details'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
