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

const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#0EA5E9",
];

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

  let headingText = `Category-wise Expenses for Today (${today.toLocaleDateString()})`;
  if (startDate && endDate) {
    headingText = `Category-wise Expenses (${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`;
  } else if (!startDate && endDate) {
    headingText = `Category-wise Expenses till ${endDate.toLocaleDateString()}`;
  } else if (startDate && !endDate) {
    headingText = `Category-wise Expenses from ${startDate.toLocaleDateString()}`;
  }
  if (categoryFilter) {
    headingText += ` in ${categoryFilter}`;
  }

  const trendHeadingText = `Expense Trend for ${today.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentYear}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
          {headingText}
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

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
          {trendHeadingText}
        </h2>
        {dailyData.every((item) => item.value === 0) ? (
          <p className="text-center text-gray-500">No data to display</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dailyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                tick={{ fontSize: 11 }}
                interval={4}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="#6366F1"
                radius={[8, 8, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExpenseCharts;
