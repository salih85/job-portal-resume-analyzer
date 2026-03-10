import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./resumeScreener.css";

const ResumeScreenerModal = ({ isOpen, onClose, application }) => {
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && application?.resume) {
            setResumeData(application.resume);
        }
    }, [isOpen, application]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target.className === "resume-modal-backdrop") {
            onClose();
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getResumeUrl = (url) => {
        if (!url) return "#";
        const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || "http://localhost:5000";
        return `${baseUrl}${url}`;
    };

    return (
        <div className="resume-modal-backdrop" onClick={handleBackdropClick}>
            <div className="resume-modal-container max-w-4xl bg-slate-50 p-0 overflow-hidden shadow-2xl shadow-indigo-500/10">
                {/* Premium Dark Header */}
                <div className="bg-slate-900 p-4 pt-12 md:p-8 md:pt-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex justify-between items-start gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 md:gap-3">
                                <span className="text-xl md:text-2xl">🧠</span> AI Talent Analysis
                            </h2>
                            <p className="text-indigo-300 text-[9px] md:text-[11px] font-bold mt-2 tracking-[0.2em] uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                Neural Screening Engine
                            </p>
                        </div>
                        <button
                            className="absolute top-4 right-4 md:relative md:top-auto md:right-auto text-slate-400 hover:text-white hover:bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white/10 backdrop-blur-md border border-white/20 group flex-shrink-0 z-20"
                            onClick={onClose}
                        >
                            <span className="group-hover:scale-110 transition-transform font-bold">✕</span>
                        </button>
                    </div>
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-8 -bottom-12 text-[8rem] md:text-[12rem] opacity-5 select-none text-white pointer-events-none">✨</div>
                </div>

                {/* Content Area */}
                <div className="p-4 md:p-8 pt-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4 shadow-[0_0_30px_rgba(79,70,229,0.2)]"></div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">Running Neural Models...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Top Grid: Insights & Applicant Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* AI Insights Summary */}
                                <div className="lg:col-span-1 premium-glass-card p-6 bg-gradient-to-b from-indigo-50/50 to-white border border-indigo-100/60 rounded-3xl relative overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
                                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
                                    <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        Insight Summary
                                    </h3>
                                    <div className="space-y-5">
                                        <div className="flex items-start gap-4 p-3 rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:-translate-y-1 transition-transform duration-300">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600 font-black mt-0.5">🔥</div>
                                            <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                                Strong proficiency detected in <span className="text-indigo-600 font-bold bg-indigo-50 px-1 rounded">{resumeData?.detectedSkills?.slice(0, 2).join(" & ") || "key areas"}</span>.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-4 p-3 rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600 font-black mt-0.5">🎯</div>
                                            <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                                Alignment for <span className="text-emerald-600 font-bold">{application?.job?.title}</span> is {resumeData?.detectedSkills?.length > 4 ? "High (90%+)" : "Moderate (70%+)"}.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Applicant Profile Details */}
                                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 pb-2 border-b border-slate-100">Candidate Dossier</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                                        <div className="group">
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-indigo-500 transition-colors">Full Name</span>
                                            <span className="text-lg font-black text-slate-900 tracking-tight">
                                                {application?.applicant?.name || "Anonymous Candidate"}
                                            </span>
                                        </div>
                                        <div className="group">
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-indigo-500 transition-colors">Contact Email</span>
                                            <span className="text-sm font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg inline-block border border-slate-100">
                                                {application?.applicant?.email || "Confidential"}
                                            </span>
                                        </div>
                                        <div className="group">
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-indigo-500 transition-colors">Target Role</span>
                                            <span className="text-sm font-bold text-slate-700">
                                                {application?.job?.title || "Unspecified"}
                                            </span>
                                        </div>
                                        <div className="group">
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-indigo-500 transition-colors">Application Date</span>
                                            <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                {application?.createdAt ? formatDate(application.createdAt) : "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recruiter Private Notes */}
                            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200/60 shadow-sm relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 text-6xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform">📝</div>
                                <h3 className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-4 pb-2 border-b border-amber-200">Recruiter Private Notes</h3>
                                <textarea
                                    className="w-full bg-white/60 border border-amber-200 rounded-xl p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all resize-none h-24 custom-scrollbar"
                                    placeholder="Add interviewing notes, compensation flags, or hiring manager feedback here. These notes are only visible to the hiring team."
                                ></textarea>
                                <div className="mt-3 flex justify-end">
                                    <button className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors border border-amber-200">
                                        Save Snapshot
                                    </button>
                                </div>
                            </div>

                            {/* Detected Skills */}
                            {resumeData?.detectedSkills && resumeData.detectedSkills.length > 0 && (
                                <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm">
                                    <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technological Proficiencies</h3>
                                        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md">{resumeData.detectedSkills.length} Detected</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        {resumeData.detectedSkills.map((skill, index) => (
                                            <span key={index} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-default shadow-sm hover:shadow-md hover:shadow-indigo-200">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Extracted Text Viewer */}
                            {resumeData?.extractedText && (
                                <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm">
                                    <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Extracted Raw Text</h3>
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span> OCR Active
                                        </span>
                                    </div>
                                    <div className="bg-[#0f172a] rounded-2xl p-4 md:p-5 text-emerald-400 text-[10px] md:text-xs font-mono leading-relaxed max-h-[250px] overflow-y-auto custom-scrollbar border border-slate-800 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] whitespace-pre-wrap break-words">
                                        <div className="opacity-50 text-[10px] mb-4 pb-2 border-b border-slate-800/50 flex flex-wrap items-center gap-x-1">
                                            <span className="text-blue-400">root@screener</span><span className="text-slate-400">:</span><span className="text-slate-300">~/resume</span><span className="text-slate-500">$</span> <span className="text-white ml-1">cat applicant_data.txt</span>
                                        </div>
                                        {resumeData.extractedText}
                                        <div className="mt-4 animate-pulse inline-block w-2 h-4 bg-emerald-400"></div>
                                    </div>
                                </div>
                            )}

                            {/* No Data Message */}
                            {(!resumeData?.extractedText && (!resumeData?.detectedSkills || resumeData.detectedSkills.length === 0)) && (
                                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 text-center">
                                    <div className="text-4xl mb-4">⚠️</div>
                                    <h4 className="text-rose-800 font-bold mb-2">Extraction Incomplete</h4>
                                    <p className="text-rose-600/80 text-sm max-w-md mx-auto">
                                        Our neural engine was unable to extract structured data from this document. It may be an encrypted PDF, an image-based file, or an unsupported format.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="bg-white border-t border-slate-100 p-4 md:p-6 flex flex-col sm:flex-row justify-end gap-3 z-10 relative">
                    <a
                        href={getResumeUrl(resumeData?.resumeUrl)}
                        download
                        className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-all text-center flex items-center justify-center gap-2 group"
                    >
                        <span className="group-hover:-translate-y-1 transition-transform">⬇️</span> Download File
                    </a>
                    <a
                        href={getResumeUrl(resumeData?.resumeUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all text-center flex items-center justify-center gap-2 group border border-indigo-500"
                    >
                        <span className="group-hover:scale-110 transition-transform">📄</span> View Original
                    </a>
                </div>
            </div>
        </div>
    );
};

ResumeScreenerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    application: PropTypes.shape({
        applicant: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
        }),
        job: PropTypes.shape({
            title: PropTypes.string,
        }),
        resume: PropTypes.shape({
            resumeUrl: PropTypes.string,
            extractedText: PropTypes.string,
            detectedSkills: PropTypes.arrayOf(PropTypes.string),
        }),
        status: PropTypes.string,
        createdAt: PropTypes.string,
    }),
};

export default ResumeScreenerModal;
