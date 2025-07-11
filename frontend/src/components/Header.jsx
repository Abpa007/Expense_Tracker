import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
      <Link to="/" className="flex items-center gap-2">
        <span role="img" aria-label="money" className="text-2xl">
          💰
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Expense Tracker
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Abhay Panchal
          </span>
        </div>
      </Link>

      <nav className="flex flex-wrap justify-center sm:justify-end mt-3 sm:mt-0 gap-3 text-sm sm:text-base">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/expenses"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Expenses
            </Link>
            <Link
              to="/add-expense"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Add Expense
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
