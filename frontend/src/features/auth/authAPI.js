import axiosInstance from "../../api/axiosInstance";

// Register user
export const registerUserAPI = (userData) =>
  axiosInstance.post("/auth/register", userData);

// Login user
export const loginUserAPI = (userData) =>
  axiosInstance.post("/auth/login", userData);

// Get user profile
export const getUserProfileAPI = () => axiosInstance.get("/auth/profile");
