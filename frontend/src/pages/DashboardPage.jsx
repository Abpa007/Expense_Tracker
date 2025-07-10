import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses } from "../features/expenses/expenseSlice";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Loader from "../components/Loader";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  if (loading) return <Loader />;

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const categories = {};
  expenses.forEach((expense) => {
    categories[expense.category] =
      (categories[expense.category] || 0) + expense.amount;
  });

  const data = Object.keys(categories).map((key) => ({
    name: key,
    value: categories[key],
  }));

  const COLORS = [
    "#0284c7",
    "#22c55e",
    "#facc15",
    "#ef4444",
    "#8b5cf6",
    "#f97316",
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-6">Total Expenses: ₹{total.toFixed(2)}</p>
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
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
