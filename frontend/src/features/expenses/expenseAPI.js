import axiosInstance from "../../api/axiosInstance";

// ✅ Get all expenses
export const getExpenses = () => axiosInstance.get("/expenses");

// ✅ Add a new expense
export const addExpenseAPI = (data) => axiosInstance.post("/expenses", data);

// ✅ Delete an expense
export const deleteExpenseAPI = (id) => axiosInstance.delete(`/expenses/${id}`);

// ✅ Update an expense
export const updateExpenseAPI = (id, data) =>
  axiosInstance.put(`/expenses/${id}`, data);
