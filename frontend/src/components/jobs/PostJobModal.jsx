import React, { useState } from "react";
import PropTypes from "prop-types";

const PostJobModal = ({ isOpen, onClose, onPost }) => {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        salary: "",
        description: "",
        requirements: "",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onPost(formData);
        onClose();
        // Reset form
        setFormData({
            title: "",
            company: "",
            location: "",
            type: "Full-time",
            salary: "",
            description: "",
            requirements: "",
        });
    };

    return (
        <div className="mini-modal-backdrop" onClick={onClose}>
            <div className="mini-modal max-w-2xl bg-white p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="bg-slate-900 px-8 py-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black tracking-tight uppercase">Post opportunity</h2>
                        <p className="text-slate-400 text-[10px] font-bold mt-1 tracking-widest uppercase">Reach global talent with AI matching</p>
                    </div>
                    <button className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors font-black text-xl z-20" onClick={onClose}>✕</button>
                    <div className="absolute -right-4 -bottom-8 text-9xl opacity-10 select-none pointer-events-none">🚀</div>
                </div>

                <div className="max-h-[75vh] overflow-y-auto custom-scrollbar">
                    <form onSubmit={handleSubmit} className="p-4 md:p-8 pb-12 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="input font-bold text-lg py-3"
                                    placeholder="e.g. Lead Product Designer"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    className="input font-medium"
                                    placeholder="e.g. Acme Corp"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="input font-medium"
                                    placeholder="e.g. remote / london"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Job Type</label>
                                <select
                                    name="type"
                                    className="input font-bold text-blue-600 appearance-none bg-slate-50 border-none cursor-pointer"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Salary Estimate</label>
                                <input
                                    type="text"
                                    name="salary"
                                    className="input font-medium"
                                    placeholder="e.g. ₹12,00,000 - ₹18,00,000"
                                    value={formData.salary}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    className="input min-h-[120px] py-4"
                                    placeholder="Describe the mission, responsibilities, and requirements..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button type="button" className="btn btn-secondary flex-1 py-4 text-[10px] font-black uppercase tracking-widest" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary flex-[2] py-4 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100">
                                Launch Listing 🚀
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

PostJobModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onPost: PropTypes.func.isRequired,
};

export default PostJobModal;
