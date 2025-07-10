import axiosInstance from "../../api/axiosInstance";

export const addExpenseAPI = (data) => axiosInstance.post("/expenses", data);
export const getExpensesAPI = (params) =>
  axiosInstance.get("/expenses", { params });
export const deleteExpenseAPI = (id) => axiosInstance.delete(`/expenses/${id}`);
export const updateExpenseAPI = (id, data) =>
  axiosInstance.put(`/expenses/${id}`, data);
