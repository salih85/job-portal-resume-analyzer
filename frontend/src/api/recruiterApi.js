import API from "../utils/axios"; // your Axios instance

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getRecruiterDashboard = async () => {
  const res = await API.get("/recruiter/dashboard", authHeader());
  return res.data;
};

export const getRecruiterApplications = async () => {
  const res = await API.get("/recruiter/applications", authHeader());
  return res.data;
};

export const updateApplicationStatus = async (id, status) => {
  const res = await API.put(
    `/recruiter/applications/${id}`,
    { status },
    authHeader()
  );
  return res.data;
};
