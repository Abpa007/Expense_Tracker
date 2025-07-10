import axios from "../../api/axiosInstance";

// Create a new expense
export const addExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post("/api/expenses", expenseData, config);
  return data;
};

// Get all expenses for the logged-in user
export const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get("/api/expenses", config);
  return data;
};

// Delete an expense by ID
export const deleteExpense = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.delete(`/api/expenses/${id}`, config);
  return data;
};

// Update an expense by ID
export const updateExpense = async (id, updatedData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(`/api/expenses/${id}`, updatedData, config);
  return data;
};
