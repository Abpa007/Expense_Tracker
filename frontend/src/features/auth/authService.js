import axios from "axios";
import { registerUserAPI, loginUserAPI } from "./authAPI";

// ✅ Create an axios instance for reuse
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // remove if not using cookies
});

const authService = {
  register: async (userData) => {
    const response = await registerUserAPI(userData);
    if (response?.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  login: async (userData) => {
    const response = await loginUserAPI(userData);
    if (response?.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },

  validateToken: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      throw new Error("No user or token found");
    }

    try {
      const response = await api.get("/api/auth/validate", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data; // { success: true, message: "...", user: {...} }
    } catch (error) {
      localStorage.removeItem("user");
      throw new Error("Token is invalid or expired");
    }
  },
};

export default authService;
