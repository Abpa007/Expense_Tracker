import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA66CC",
  "#FF4444",
  "#0099CC",
];

const ExpenseCharts = ({ expenses }) => {
  const categoryData = expenses.reduce((acc, expense) => {
    const found = acc.find((item) => item.name === expense.category);
    if (found) {
      found.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
    const found = acc.find((item) => item.name === monthYear);
    if (found) {
      found.value += expense.amount;
    } else {
      acc.push({ name: monthYear, value: expense.amount });
    }
    return acc;
  }, []);

  monthlyData.sort((a, b) => {
    const [aMonth, aYear] = a.name.split("-").map(Number);
    const [bMonth, bYear] = b.name.split("-").map(Number);
    return aYear !== bYear ? aYear - bYear : aMonth - bMonth;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-center text-xl font-semibold mb-4">
          Category-wise Expense Distribution
        </h2>
        {categoryData.length === 0 ? (
          <p className="text-center text-gray-500">No data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-center text-xl font-semibold mb-4">
          Monthly Expense Trend
        </h2>
        {monthlyData.length === 0 ? (
          <p className="text-center text-gray-500">No data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExpenseCharts;
