import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileApi";
import { uploadResume, getResumeDetails } from "../../api/resumeApi";
import JobSeekerLayout from "../../components/layouts/JobSeekerLayout";
import "./jobseeker.css";

const Profile = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [newEdu, setNewEdu] = useState({ school: "", degree: "", year: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      if (data) {
        setForm({
          ...data,
          skills: data.skills?.join(", ") || "",
        });

        // If we have a resume ID, try to get the actual details for better display
        if (data.resume) {
          try {
            const resumeId = typeof data.resume === 'object' ? data.resume._id : data.resume;
            const resData = await getResumeDetails(resumeId);
            if (resData && resData.resumeUrl) {
              const fileName = resData.resumeUrl.split('/').pop();
              setResumeName(fileName);
            } else {
              setResumeName("Active Resume");
            }
          } catch (e) {
            setResumeName("Active Resume"); // Fallback if getResumeDetails fails
          }
        } else {
          setResumeName("");
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("resume", file);
      try {
        await uploadResume(formData);
        setResumeName(file.name);
        alert("Resume uploaded and analyzed successfully!");
        fetchProfile(); // Refresh to get persistence
      } catch (error) {
        alert("Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAddEducation = () => {
    if (!newEdu.school || !newEdu.degree) return;
    const eduString = `${newEdu.degree} @ ${newEdu.school} (${newEdu.year})`;
    setForm(prev => ({
      ...prev,
      education: prev.education ? `${prev.education}\n${eduString}` : eduString
    }));
    setNewEdu({ school: "", degree: "", year: "" });
    setIsEduModalOpen(false);
  };

  const submit = async () => {
    setLoading(true);
    try {
      await updateProfile({
        ...form,
        skills: form.skills.split(",").map(s => s.trim()),
      });
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const isProfileComplete = Boolean(form.fullName && form.phone && (form.resume || resumeName) && form.skills);

  return (
    <JobSeekerLayout>
      <div className="jobseeker-layout">
        <div className="max-width-container">
          {!isProfileComplete ? (
            <div className="warning-banner">
              <span>⚠️</span>
              <div>
                <p>Action Required: Please complete your profile (Name, Phone, Resume, and Skills) to be eligible for job applications.</p>
              </div>
            </div>
          ) : (
            <div className="success-banner">
              <span>✅</span>
              <div>
                <p className="font-bold">Profile Complete: Your career identity is fully set up and ready for matching!</p>
              </div>
            </div>
          )}

          <div className="dashboard-header mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Career Profile</h2>
            <p className="text-slate-500 mt-1">Manage your identity and resume for AI-powered matching.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="premium-card">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span>👤</span> Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input
                      className="input"
                      placeholder="e.g. Alex Johnson"
                      value={form.fullName}
                      onChange={e => setForm({ ...form, fullName: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                    <input
                      className="input"
                      placeholder="+1 555-0123"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="education-section-header">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Education History</label>
                      <button className="btn-add-education" onClick={() => setIsEduModalOpen(true)}>
                        <span>+</span> Add Education
                      </button>
                    </div>
                    {form.education ? (
                      <div className="space-y-3">
                        {form.education.split("\n").filter(e => e.trim()).map((edu, idx) => (
                          <div key={idx} className="education-item">
                            <div className="education-info">
                              <h4>{edu.split(" @ ")[0]}</h4>
                              <p>{edu.split(" @ ")[1] || "Degree Details"}</p>
                            </div>
                            <button className="text-rose-500 hover:text-rose-700 text-xs font-bold px-3 py-1 rounded hover:bg-rose-50 transition-colors" onClick={() => {
                              const list = form.education.split("\n");
                              list.splice(idx, 1);
                              setForm({ ...form, education: list.join("\n") });
                            }}>Remove</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
                        <p className="text-sm text-slate-400 font-medium">No education history added yet.</p>
                        <button className="text-blue-600 font-bold text-xs mt-2 hover:underline" onClick={() => setIsEduModalOpen(true)}>
                          Add your first entry
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Experience Summary</label>
                    <textarea
                      className="input min-h-[100px] resize-none"
                      placeholder="Briefly describe your roles and achievements..."
                      value={form.experience}
                      onChange={e => setForm({ ...form, experience: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Top Skills</label>
                    <input
                      className="input"
                      placeholder="Sales, CRM, Project Management..."
                      value={form.skills}
                      onChange={e => setForm({ ...form, skills: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <button className="btn btn-primary px-10" onClick={submit} disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="premium-card h-full">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span>📄</span> Resume Management
                </h3>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
                  <p className="font-bold text-slate-700 text-sm mb-1 uppercase tracking-tight flex items-center gap-2">
                    {uploading ? "Analyzing File..." : resumeName ? "Resume Active" : "Upload Resume"}
                    <span className="text-xl">
                      {uploading ? "⏳" : resumeName ? "✅" : "📁"}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mb-6">
                    {resumeName ? resumeName : "PDF or Word document preferred"}
                  </p>
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="btn btn-secondary w-full cursor-pointer"
                  >
                    {resumeName ? "Update Document" : "Choose File"}
                  </label>
                </div>
                {resumeName && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                    <p className="text-xs text-emerald-700 font-bold">✓ Successfully Analyzed</p>
                  </div>
                )}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
                  <span className="text-blue-500">💡</span>
                  <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                    Keeping your resume updated helps our AI match you with the best roles in your field.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Modal */}
      {isEduModalOpen && (
        <div className="mini-modal-backdrop" onClick={() => setIsEduModalOpen(false)}>
          <div className="mini-modal" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Add Education</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Degree / Field</label>
                <input
                  className="input"
                  placeholder="e.g. BS in Computer Science"
                  value={newEdu.degree}
                  onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">School / University</label>
                <input
                  className="input"
                  placeholder="e.g. Stanford University"
                  value={newEdu.school}
                  onChange={e => setNewEdu({ ...newEdu, school: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Completion Year</label>
                <input
                  className="input"
                  placeholder="e.g. 2024"
                  value={newEdu.year}
                  onChange={e => setNewEdu({ ...newEdu, year: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button className="btn btn-secondary flex-1" onClick={() => setIsEduModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary flex-1" onClick={handleAddEducation}>Add Entry</button>
            </div>
          </div>
        </div>
      )}
    </JobSeekerLayout>
  );
};

export default Profile;
