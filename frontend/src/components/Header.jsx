import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">
          💸 Expense Tracker
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline">Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
