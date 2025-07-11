import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

// Lazy load pages for performance
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ExpensesPage = lazy(() => import("./pages/ExpensesPage"));
const AddExpensePage = lazy(() => import("./pages/AddExpensePage"));

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <main className="container mx-auto p-4">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <ExpensesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-expense"
              element={
                <ProtectedRoute>
                  <AddExpensePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
