import API from "../utils/axios";

export const getDashboardStats = async () => {
  const { data } = await API.get("/jobseeker/dashboard");
  return data;
};
