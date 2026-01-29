import API from "../utils/axios";

export const getProfile = async () => {
  const { data } = await API.get("/jobseeker/profile");
  return data;
};

export const updateProfile = async (profile) => {
  const { data } = await API.post("/jobseeker/profile", profile);
  return data;
};
