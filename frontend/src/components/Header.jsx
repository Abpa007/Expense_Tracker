import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">Expense Tracker</Link>
      <nav className="space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/expenses">Expenses</Link>
            <button onClick={handleLogout} className="underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
