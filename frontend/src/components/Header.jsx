import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span role="img" aria-label="money" className="text-2xl">
            💰
          </span>
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Expense Tracker
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Abhay Panchal
            </p>
          </div>
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {menuOpen ? (
            <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex gap-4 text-sm font-medium items-center">
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
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="sm:hidden px-4 pb-3 flex flex-col gap-2 animate-fade-in">
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/expenses"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Expenses
              </Link>
              <Link
                to="/add-expense"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Add Expense
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="block text-left rounded px-3 py-2 text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block rounded px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
