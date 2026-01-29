import API from "../utils/axios"; // ✅ correct path

export const getAdminDashboard = async () => {
  const res = await API.get("/admin/dashboard");
  return res.data;
};
