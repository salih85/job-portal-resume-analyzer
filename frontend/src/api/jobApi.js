import API from "../utils/axios";

// ✅ public
export const getJobs = async () => {
  const res = await API.get("/jobs");
  return res.data;
};

// ✅ recruiter
export const postJob = async (jobData) => {
  const res = await API.post("/jobs", jobData);
  return res.data;
};
