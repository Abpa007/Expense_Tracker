import axiosInstance from "../../api/axiosInstance";

// ✅ API calls for authentication
export const registerUserAPI = (data) =>
  axiosInstance.post("/auth/register", data);

export const loginUserAPI = (data) => axiosInstance.post("/auth/login", data);

export const getUserProfileAPI = () => axiosInstance.get("/auth/profile");
