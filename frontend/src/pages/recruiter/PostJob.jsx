import { useState } from "react";
import { postJob } from "../../api/jobApi";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await postJob(form);
    alert("Job posted");
  };

  return (
    <div className="container mt-4">
      <h2>Post Job</h2>

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Location"
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <button className="btn btn-primary">Post</button>
      </form>
    </div>
  );
};

export default PostJob;
