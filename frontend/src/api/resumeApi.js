import API from "../utils/axios";

export const uploadResume = async (formData) => {
  const res = await API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
