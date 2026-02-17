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
        // Static files are served at /uploads (not /api/uploads)
        // So we use the base server URL without the /api prefix
        const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || "http://localhost:5000";
        return `${baseUrl}${url}`;
    };

    return (
        <div className="resume-modal-backdrop" onClick={handleBackdropClick}>
            <div className="resume-modal-container">
                {/* Header */}
                <div className="resume-modal-header">
                    <div>
                        <h2 className="resume-modal-title">Resume Analysis</h2>
                        <p className="resume-modal-subtitle">
                            AI-Powered Resume Screening
                        </p>
                    </div>
                    <button className="resume-modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="resume-modal-content">
                    {loading ? (
                        <div className="resume-loading">
                            <div className="resume-spinner"></div>
                            <p>Analyzing resume...</p>
                        </div>
                    ) : (
                        <>
                            {/* Applicant Info */}
                            <div className="resume-section">
                                <h3 className="resume-section-title">Applicant Information</h3>
                                <div className="resume-info-grid">
                                    <div className="resume-info-item">
                                        <span className="resume-info-label">Name:</span>
                                        <span className="resume-info-value">
                                            {application?.applicant?.name || "N/A"}
                                        </span>
                                    </div>
                                    <div className="resume-info-item">
                                        <span className="resume-info-label">Email:</span>
                                        <span className="resume-info-value">
                                            {application?.applicant?.email || "N/A"}
                                        </span>
                                    </div>
                                    <div className="resume-info-item">
                                        <span className="resume-info-label">Applied For:</span>
                                        <span className="resume-info-value">
                                            {application?.job?.title || "N/A"}
                                        </span>
                                    </div>
                                    <div className="resume-info-item">
                                        <span className="resume-info-label">Application Date:</span>
                                        <span className="resume-info-value">
                                            {application?.createdAt
                                                ? formatDate(application.createdAt)
                                                : "N/A"}
                                        </span>
                                    </div>
                                    <div className="resume-info-item">
                                        <span className="resume-info-label">Status:</span>
                                        <span className={`resume-status-badge status-${application?.status}`}>
                                            {application?.status || "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Detected Skills */}
                            {resumeData?.detectedSkills &&
                                resumeData.detectedSkills.length > 0 && (
                                    <div className="resume-section">
                                        <h3 className="resume-section-title">
                                            Detected Skills ({resumeData.detectedSkills.length})
                                        </h3>
                                        <div className="resume-skills-container">
                                            {resumeData.detectedSkills.map((skill, index) => (
                                                <span key={index} className="resume-skill-badge">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            {/* Extracted Text */}
                            {resumeData?.extractedText && (
                                <div className="resume-section">
                                    <h3 className="resume-section-title">Resume Content</h3>
                                    <div className="resume-text-content">
                                        {resumeData.extractedText}
                                    </div>
                                </div>
                            )}

                            {/* No Data Message */}
                            {(!resumeData?.extractedText &&
                                (!resumeData?.detectedSkills ||
                                    resumeData.detectedSkills.length === 0)) && (
                                    <div className="resume-no-data">
                                        <p>
                                            Resume text extraction not available. The resume may be in
                                            an unsupported format or text extraction failed.
                                        </p>
                                    </div>
                                )}

                            {/* Actions */}
                            <div className="resume-actions">
                                <a
                                    href={getResumeUrl(resumeData?.resumeUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resume-btn resume-btn-primary"
                                >
                                    📄 View Original Resume
                                </a>
                                <a
                                    href={getResumeUrl(resumeData?.resumeUrl)}
                                    download
                                    className="resume-btn resume-btn-secondary"
                                >
                                    ⬇️ Download Resume
                                </a>
                            </div>
                        </>
                    )}
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
