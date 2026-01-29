import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileApi";

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
      skills: form.skills.split(","),
    });
    alert("Profile updated");
  };

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>

      <input
        className="form-control mb-2"
        placeholder="Full Name"
        value={form.fullName}
        onChange={e => setForm({ ...form, fullName: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Phone"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Education"
        value={form.education}
        onChange={e => setForm({ ...form, education: e.target.value })}
      />

      <input
        className="form-control mb-2"
        placeholder="Experience"
        value={form.experience}
        onChange={e => setForm({ ...form, experience: e.target.value })}
      />

      <input
        className="form-control mb-3"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={e => setForm({ ...form, skills: e.target.value })}
      />

      <button className="btn btn-success" onClick={submit}>
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
