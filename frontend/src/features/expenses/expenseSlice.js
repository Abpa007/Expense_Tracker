import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addExpense as apiAddExpense,
  getExpenses as apiGetExpenses,
  deleteExpense as apiDeleteExpense,
  updateExpense as apiUpdateExpense,
} from "./expenseAPI";

// Get user token from state
const getToken = (thunkAPI) =>
  thunkAPI.getState().auth.user?.token ||
  (localStorage.getItem("userInfo") &&
    JSON.parse(localStorage.getItem("userInfo")).token);

// Add Expense
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseData, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      return await apiAddExpense(expenseData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get Expenses
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (_, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      return await apiGetExpenses(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Delete Expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      await apiDeleteExpense(id, token);
      return id; // Return ID to filter locally
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Update Expense
export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);
      return await apiUpdateExpense(id, updatedData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Slice
const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Expense
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Expense
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Expense
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.expenses.findIndex(
          (expense) => expense._id === action.payload._id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;
