import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import expenseReducer from "../features/expenses/expenseSlice";

// Add Redux DevTools + immutability/error checks for dev only
const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable if using non-serializable tokens
    }),
});

export default store;
