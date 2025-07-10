import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addExpenseAPI,
  getExpensesAPI,
  deleteExpenseAPI,
  updateExpenseAPI,
} from "./expenseAPI";

// Async thunks
export const addExpense = createAsyncThunk(
  "expenses/add",
  async (expenseData, thunkAPI) => {
    try {
      const { data } = await addExpenseAPI(expenseData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Adding expense failed"
      );
    }
  }
);

export const getExpenses = createAsyncThunk(
  "expenses/get",
  async (query, thunkAPI) => {
    try {
      const { data } = await getExpensesAPI(query);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Fetching expenses failed"
      );
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id, thunkAPI) => {
    try {
      await deleteExpenseAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Deleting expense failed"
      );
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const { data } = await updateExpenseAPI(id, updatedData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Updating expense failed"
      );
    }
  }
);

// Slice
const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    total: 0,
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
        state.expenses.unshift(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Expenses
      .addCase(getExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.total = action.payload.total;
      })
      .addCase(getExpenses.rejected, (state, action) => {
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
          (exp) => exp._id !== action.payload
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
        state.expenses = state.expenses.map((exp) =>
          exp._id === action.payload._id ? action.payload : exp
        );
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;
