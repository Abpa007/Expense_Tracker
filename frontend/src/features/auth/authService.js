import { registerUserAPI, loginUserAPI } from "./authAPI";

// ✅ Handles localStorage and API for auth
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
};

export default authService;
