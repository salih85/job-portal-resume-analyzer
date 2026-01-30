import API from "../utils/axios"; // ✅ correct path

// 🔐 helper to get token
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const applyJob = async (jobId) => {
  const res = await API.post(
    `/applications/apply/${jobId}`
  );
  return res.data;
};

export const getMyApplications = async () => {
  const res = await API.get("/applications/my");
  return res.data;
};

export default API;
