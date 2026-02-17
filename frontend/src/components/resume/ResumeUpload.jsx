import { useState } from "react";
import { uploadResume } from "../../api/resumeApi";
import Navbar from "../common/Navbar";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [detectedSkills, setDetectedSkills] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadSuccess(false);
      setDetectedSkills([]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf" ||
        droppedFile.name.endsWith(".pdf")) {
        setFile(droppedFile);
        setUploadSuccess(false);
        setDetectedSkills([]);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const upload = async () => {
    if (!file) return alert("Please select a resume");

    setUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await uploadResume(formData);

      setUploadSuccess(true);
      setDetectedSkills(response.skills || []);

      setTimeout(() => {
        alert(`Resume uploaded successfully! ${response.skillsDetected || 0} skills detected.`);
      }, 500);
    } catch (error) {
      alert("Error uploading resume: " + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: "800px" }}>
        <h2 style={{
          marginBottom: "24px",
          color: "#2d3748",
          fontWeight: "700",
          textAlign: "center"
        }}>
          Upload Your Resume
        </h2>

        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          border: "1px solid #e2e8f0"
        }}>
          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
              border: dragActive
                ? "3px dashed #667eea"
                : "3px dashed #cbd5e0",
              borderRadius: "12px",
              padding: "40px",
              textAlign: "center",
              background: dragActive
                ? "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)"
                : "#f8f9fa",
              transition: "all 0.3s ease",
              cursor: "pointer",
              marginBottom: "24px"
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>
              📄
            </div>
            <p style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#2d3748",
              marginBottom: "8px"
            }}>
              {file ? file.name : "Drop your resume here or click to browse"}
            </p>
            <p style={{ fontSize: "14px", color: "#718096" }}>
              Supports PDF files only
            </p>
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {/* File Preview */}
          {file && (
            <div style={{
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px"
                }}>
                  📄
                </div>
                <div>
                  <p style={{
                    margin: 0,
                    fontWeight: "600",
                    color: "#2d3748",
                    fontSize: "16px"
                  }}>
                    {file.name}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#718096"
                  }}>
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setUploadSuccess(false);
                  setDetectedSkills([]);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#e53e3e",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "8px"
                }}
              >
                ✕
              </button>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={upload}
            disabled={!file || uploading}
            style={{
              width: "100%",
              padding: "16px",
              background: uploading
                ? "#cbd5e0"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: uploading || !file ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: !uploading && file ? "0 4px 12px rgba(102, 126, 234, 0.3)" : "none"
            }}
            onMouseOver={(e) => {
              if (!uploading && file) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = !uploading && file ? "0 4px 12px rgba(102, 126, 234, 0.3)" : "none";
            }}
          >
            {uploading ? "Uploading & Analyzing..." : "Upload Resume"}
          </button>

          {/* Success Message with Skills */}
          {uploadSuccess && detectedSkills.length > 0 && (
            <div style={{
              marginTop: "24px",
              background: "linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(56, 161, 105, 0.1) 100%)",
              borderRadius: "12px",
              padding: "20px",
              border: "2px solid #48bb78"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px"
              }}>
                <div style={{ fontSize: "32px" }}>✅</div>
                <div>
                  <p style={{
                    margin: 0,
                    fontWeight: "700",
                    color: "#2d3748",
                    fontSize: "18px"
                  }}>
                    Resume Uploaded Successfully!
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#718096"
                  }}>
                    {detectedSkills.length} skills detected from your resume
                  </p>
                </div>
              </div>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px"
              }}>
                {detectedSkills.slice(0, 15).map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "16px",
                      fontSize: "13px",
                      fontWeight: "600",
                      boxShadow: "0 2px 4px rgba(72, 187, 120, 0.3)"
                    }}
                  >
                    {skill}
                  </span>
                ))}
                {detectedSkills.length > 15 && (
                  <span style={{
                    padding: "6px 14px",
                    fontSize: "13px",
                    color: "#718096",
                    fontWeight: "600"
                  }}>
                    +{detectedSkills.length - 15} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeUpload;

