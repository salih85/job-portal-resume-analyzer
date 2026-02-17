import { useEffect, useState } from "react";
import {
  getRecruiterApplications,
  updateApplicationStatus,
} from "../../api/recruiterApi";
import ResumeScreenerModal from "../../components/resume/ResumeScreenerModal";
import Navbar from "../../components/common/Navbar";

const RecruiterApplications = () => {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getRecruiterApplications().then(setApps);
  }, []);

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
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 style={{ marginBottom: "24px", color: "#2d3748", fontWeight: "700" }}>
          Job Applications
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table className="table mt-3" style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <thead style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white"
            }}>
              <tr>
                <th style={{ padding: "16px", fontWeight: "600" }}>Job</th>
                <th style={{ padding: "16px", fontWeight: "600" }}>Applicant</th>
                <th style={{ padding: "16px", fontWeight: "600" }}>Email</th>
                <th style={{ padding: "16px", fontWeight: "600" }}>Skills</th>
                <th style={{ padding: "16px", fontWeight: "600" }}>Status</th>
                <th style={{ padding: "16px", fontWeight: "600" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {apps.map(app => (
                <tr key={app._id} style={{
                  borderBottom: "1px solid #e2e8f0",
                  transition: "background 0.2s"
                }}>
                  <td style={{ padding: "16px", fontWeight: "500" }}>
                    {app.job?.title || "N/A"}
                  </td>
                  <td style={{ padding: "16px" }}>
                    {app.applicant?.name || "N/A"}
                  </td>
                  <td style={{ padding: "16px", color: "#718096" }}>
                    {app.applicant?.email || "N/A"}
                  </td>
                  <td style={{ padding: "16px" }}>
                    {app.resume?.detectedSkills?.length > 0 ? (
                      <span style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        {app.resume.detectedSkills.length} skills
                      </span>
                    ) : (
                      <span style={{ color: "#a0aec0", fontSize: "14px" }}>
                        No skills detected
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span style={{
                      padding: "6px 14px",
                      borderRadius: "16px",
                      fontSize: "13px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      background: app.status === "shortlisted"
                        ? "linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
                        : app.status === "rejected"
                          ? "linear-gradient(135deg, #f56565 0%, #e53e3e 100%)"
                          : "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
                      color: "white"
                    }}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s"
                        }}
                        onClick={() => openResumeModal(app)}
                        onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                        onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                      >
                        🔍 Screen Resume
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => changeStatus(app._id, "shortlisted")}
                        disabled={app.status === "shortlisted"}
                      >
                        ✓ Shortlist
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => changeStatus(app._id, "rejected")}
                        disabled={app.status === "rejected"}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {apps.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "40px",
              color: "#718096",
              fontSize: "16px"
            }}>
              No applications yet
            </div>
          )}
        </div>
      </div>

      <ResumeScreenerModal
        isOpen={isModalOpen}
        onClose={closeResumeModal}
        application={selectedApp}
      />
    </>
  );
};

export default RecruiterApplications;

