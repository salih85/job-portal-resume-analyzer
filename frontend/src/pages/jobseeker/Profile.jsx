import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileApi";
import JobSeekerLayout from "../../components/layouts/JobSeekerLayout";
import "./jobseeker.css";

const Profile = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  useEffect(() => {
    getProfile().then(data => {
      if (data) {
        setForm({
          ...data,
          skills: data.skills?.join(", "),
        });
      }
    });
  }, []);

  const submit = async () => {
    await updateProfile({
      ...form,
      skills: form.skills.split(",").map(s => s.trim()),
    });
    alert("Profile updated");
  };

  return (
    <JobSeekerLayout>
      <h2 className="page-title">My Profile</h2>

      <div className="form-card">
        {["fullName", "phone", "education", "experience", "skills"].map(field => (
          <input
            key={field}
            className="input"
            placeholder={field.toUpperCase()}
            value={form[field]}
            onChange={e =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}

        <button className="btn primary" onClick={submit}>
          Save Profile
        </button>
      </div>
    </JobSeekerLayout>
  );
};

export default Profile;
