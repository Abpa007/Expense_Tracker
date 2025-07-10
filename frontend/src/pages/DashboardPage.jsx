import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../features/expenses/expenseSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../components/Loader";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  // Calculate totals
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Prepare category-wise data for PieChart
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A020F0",
    "#FF6666",
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}

      <p className="text-lg font-semibold mb-4 text-center">
        Total Expenses:{" "}
        <span className="text-blue-600">₹{totalExpenses.toFixed(2)}</span>
      </p>

      <div className="h-80">
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No expenses to display.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
