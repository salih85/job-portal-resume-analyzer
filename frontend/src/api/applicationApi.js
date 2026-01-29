import API from "../utils/axios"; // ✅ correct path

// 🔐 helper to get token
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ✅ Apply for a job
export const applyJob = async (jobId) => {
  const res = await API.post(
    `/applications/apply/${jobId}`,
    {},
    authHeader()
  );
  return res.data;
};

// ✅ Get logged-in user's applications
export const getMyApplications = async () => {
  const res = await API.get(
    `/applications/my`,
    authHeader()
  );
  return res.data;
};

export default API;
