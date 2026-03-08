import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const JobDetailsModal = ({ isOpen, onClose, job, onApply, userProfile, isApplied: initialIsApplied }) => {
    const [applied, setApplied] = useState(false);

    if (!isOpen || !job) return null;

    const isActuallyApplied = initialIsApplied || applied;
    const isProfileComplete = Boolean(userProfile?.fullName && userProfile?.phone && userProfile?.resume && userProfile?.skills?.length > 0);

    const handleApplyClick = () => {
        if (!isProfileComplete || isActuallyApplied) return;
        onApply(job._id);
        setApplied(true);
        setTimeout(() => {
            setApplied(false);
            onClose();
        }, 2000);
    };

    return (
        <div className="mini-modal-backdrop" onClick={onClose}>
            <div className="mini-modal max-w-3xl bg-white p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-black tracking-tight uppercase leading-none">{job.title}</h2>
                            {isActuallyApplied && (
                                <span className="status-applied text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest border border-blue-500/30 bg-blue-500/10 shadow-sm">Applied</span>
                            )}
                        </div>
                        <p className="text-blue-400 font-black text-xs tracking-widest uppercase flex items-center gap-2">
                            <span className="opacity-50 text-base">🏢</span> {job.company || "Hiring Partner"}
                        </p>
                    </div>
                    <button className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors font-black text-xl z-20" onClick={onClose}>✕</button>
                    <div className="absolute -right-6 -bottom-10 text-[160px] opacity-10 select-none pointer-events-none">💼</div>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
                    {!isProfileComplete && !isActuallyApplied && (
                        <div className="bg-amber-50 border-l-4 border-l-amber-400 p-6 rounded-r-2xl mb-8 flex gap-4 items-start shadow-sm">
                            <span className="text-2xl">⚠️</span>
                            <div>
                                <p className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-1">Incomplete Profile</p>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">Please finalize your <Link to="/profile" className="text-amber-600 font-black underline decoration-2 underline-offset-4" onClick={onClose}>Career Profile</Link> (Bio, Resume, and Skills) to unlock instant applications.</p>
                            </div>
                        </div>
                    )}

                    {applied ? (
                        <div className="text-center py-20 fade-in-up">
                            <div className="text-7xl mb-6">🎯</div>
                            <h3 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tight">Application Transmitted</h3>
                            <p className="text-slate-400 font-medium max-w-sm mx-auto">Your credentials have been queued for AI screening. You will be notified of matches within 24 hours.</p>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Vibe</p>
                                    <p className="font-bold text-slate-800 text-xs">📍 {job.location}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Cadence</p>
                                    <p className="font-bold text-slate-800 text-xs">⏱️ {job.type}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Bracket</p>
                                    <p className="font-bold text-slate-800 text-xs text-emerald-600">💰 {job.salary || "Negotiable"}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Inception</p>
                                    <p className="font-bold text-slate-800 text-xs">📅 {new Date(job.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {isActuallyApplied && (
                                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4 text-blue-700">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">✨</div>
                                    <div>
                                        <p className="font-black text-blue-900 text-xs uppercase tracking-tight">Application Active</p>
                                        <p className="text-[10px] font-medium opacity-80">This role is already in your dashboard for tracking.</p>
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> The Mission
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium text-sm whitespace-pre-wrap">{job.description}</p>
                            </div>

                            {job.requirements && (
                                <div>
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Arsenal
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {job.requirements.split("\n").map((req, index) => (
                                            <span key={index} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200">
                                                {req.replace(/^[-\*\+]\s*/, '')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {!applied && (
                    <div className="p-8 border-t border-slate-50 flex gap-4">
                        <button className="btn btn-secondary flex-1 py-4 text-[10px] font-black uppercase tracking-widest" onClick={onClose}>
                            {isActuallyApplied ? "Exit Detail" : "Archive"}
                        </button>
                        {!isActuallyApplied && (
                            <button
                                className={`btn btn-primary flex-[2] py-4 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 ${!isProfileComplete ? 'opacity-30 cursor-not-allowed grayscale' : 'transform hover:-translate-y-1'}`}
                                onClick={handleApplyClick}
                                disabled={!isProfileComplete}
                            >
                                {isProfileComplete ? "Transmit Application 🚀" : "Complete Profile to Unlock"}
                            </button>
                        )}
                        {isActuallyApplied && (
                            <Link to="/applications" className="btn btn-primary flex-[2] py-4 text-center text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100" onClick={onClose}>
                                Track in Dashboard 📊
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

JobDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    job: PropTypes.object,
    onApply: PropTypes.func.isRequired,
    userProfile: PropTypes.object,
    isApplied: PropTypes.bool
};

export default JobDetailsModal;
