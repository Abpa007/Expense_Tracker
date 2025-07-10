import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses } from "../features/expenses/expenseSlice";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchExpenses());
    }
  }, [dispatch, navigate, user]);

  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const data = [
    { name: "Food", value: expenses.filter((e) => e.category === "Food").reduce((a, b) => a + b.amount, 0) },
    { name: "Transport", value: expenses.filter((e) => e.category === "Transport").reduce((a, b) => a + b.amount, 0) },
    { name: "Utilities", value: expenses.filter((e) => e.category === "Utilities").reduce((a, b) => a + b.amount, 0) },
    { name: "Health", value: expenses.filter((e) => e.category === "Health").reduce((a, b) => a + b.amount, 0) },
    { name: "Entertainment", value: expenses.filter((e) => e.category === "Entertainment").reduce((a, b) => a + b.amount, 0) },
    { name: "Other", value: expenses.filter((e) => e.category === "Other").reduce((a, b) => a + b.amount, 0) },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00c49f", "#FFBB28"];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <p className="text-lg font-semibold">Total Expenses: ₹{total.toFixed(2)}</p>

      <div className="h-64 mt-4">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
