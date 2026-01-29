import { useState } from "react";
import { uploadResume } from "../../api/resumeApi";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return alert("Please select a resume");

    const formData = new FormData();
    formData.append("resume", file);

    await uploadResume(formData);
    alert("Resume uploaded successfully");
  };

  return (
    <div className="container mt-4">
      <h2>Upload Resume</h2>
      <input
        type="file"
        className="form-control mb-2"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={upload} className="btn btn-primary">
        Upload Resume
      </button>
    </div>
  );
};

export default ResumeUpload;
