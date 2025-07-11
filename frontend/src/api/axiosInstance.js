import axios from "axios";

// Create an axios instance with baseURL
const axiosInstance = axios.create({
  baseURL: "https://expense-tracker-backend-x0zj.onrender.com/api",
  withCredentials: true, // optional if using cookies
});

// Automatically attach token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handling for 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
