// src/components/ExpenseCharts.jsx

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

// Modern soft color palette
const COLORS = [
  "#60A5FA", // Blue
  "#34D399", // Mint Green
  "#FBBF24", // Amber
  "#F87171", // Soft Red
  "#A78BFA", // Soft Purple
  "#F472B6", // Pink
  "#38BDF8", // Sky Blue
];

// Custom tooltip with full date on hover for BarChart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const today = new Date();
    const fullDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      parseInt(label)
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return (
      <div className="bg-white rounded-md shadow p-2 text-sm text-gray-800">
        <p>{fullDate}</p>
        <p>₹{payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const ExpenseCharts = ({ expenses, filter }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const startDate = filter?.startDate ? new Date(filter.startDate) : null;
  const endDate = filter?.endDate ? new Date(filter.endDate) : null;
  const categoryFilter = filter?.category || "";

  // Filter data for PieChart
  const pieChartExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    if (startDate && expenseDate < startDate) return false;
    if (endDate && expenseDate > endDate) return false;
    if (categoryFilter && expense.category !== categoryFilter) return false;
    if (!startDate && !endDate && !categoryFilter) {
      return (
        expenseDate.getFullYear() === today.getFullYear() &&
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getDate() === today.getDate()
      );
    }
    return true;
  });

  const categoryData = pieChartExpenses.reduce((acc, expense) => {
    const found = acc.find((item) => item.name === expense.category);
    if (found) {
      found.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  // Daily data for BarChart
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1);
    const label = (i + 1).toString();
    const totalForDay = expenses.reduce((sum, expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === currentYear &&
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getDate() === date.getDate()
        ? sum + expense.amount
        : sum;
    }, 0);
    return { name: label, value: totalForDay };
  });
// Dynamic Pie Chart heading logic
let headingText = "";

if (!startDate && !endDate && !categoryFilter) {
  headingText = `Category-wise Distribution for Today (${today.toLocaleDateString()})`;
} else if (!startDate && !endDate && categoryFilter) {
  headingText = `Category-wise Distribution in ${categoryFilter}`;
} else {
  headingText = `Category-wise Distribution`;
  if (startDate && endDate) {
    headingText += ` (${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`;
  } else if (startDate && !endDate) {
    headingText += ` from ${startDate.toLocaleDateString()}`;
  } else if (!startDate && endDate) {
    headingText += ` till ${endDate.toLocaleDateString()}`;
  }
  if (categoryFilter) {
    headingText += ` in ${categoryFilter}`;
  }
}


  const trendHeadingText = `Expense Trend for ${today.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentYear}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Pie Chart Card */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center w-full">
        <h2 className="text-center text-base md:text-lg font-semibold text-gray-800 mb-4">
          {headingText}
        </h2>
        {categoryData.length === 0 ? (
          <p className="text-center text-gray-500">No data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
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

      {/* Bar Chart Card */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center w-full">
        <h2 className="text-center text-base md:text-lg font-semibold text-gray-800 mb-4">
          {trendHeadingText}
        </h2>
        {dailyData.every((item) => item.value === 0) ? (
          <p className="text-center text-gray-500">No data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={dailyData}
              margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
                interval={4}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="url(#gradient)"
                radius={[6, 6, 0, 0]}
                barSize={16}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExpenseCharts;
