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

const ExpenseCharts = ({ expenses, filter }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const startDate = filter?.startDate
    ? new Date(filter.startDate)
    : new Date(currentYear, currentMonth, 1);
  const endDate = filter?.endDate
    ? new Date(filter.endDate)
    : new Date(currentYear, currentMonth, daysInMonth);

  // Filter expenses within the range
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= endDate;
  });

  // Build daily data including zero expense days
  const dailyData = [];
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const label = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}`;

    const totalForDay = filteredExpenses.reduce((sum, expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.toDateString() === date.toDateString()
        ? sum + expense.amount
        : sum;
    }, 0);

    dailyData.push({ name: label, value: totalForDay });
  }

  // Build category data for Pie Chart
  const categoryData = filteredExpenses.reduce((acc, expense) => {
    const found = acc.find((item) => item.name === expense.category);
    if (found) {
      found.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  // Heading text logic
  let headingText = `Category-wise Expenses for Today (${today.toLocaleDateString()})`;
  let trendHeadingText = `Expense Trend for ${today.toLocaleString("default", {
    month: "long",
  })} ${currentYear}`;

  if (filter?.startDate && filter?.endDate) {
    headingText = `Category-wise Expenses (${new Date(
      filter.startDate
    ).toLocaleDateString()} - ${new Date(
      filter.endDate
    ).toLocaleDateString()})`;
    trendHeadingText = `Expense Trend (${new Date(
      filter.startDate
    ).toLocaleDateString()} - ${new Date(
      filter.endDate
    ).toLocaleDateString()})`;
  } else if (!filter?.startDate && filter?.endDate) {
    headingText = `Category-wise Expenses till ${new Date(
      filter.endDate
    ).toLocaleDateString()}`;
    trendHeadingText = `Expense Trend till ${new Date(
      filter.endDate
    ).toLocaleDateString()}`;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Pie Chart */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-6">
        <h2 className="text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          {headingText}
        </h2>
        {categoryData.length === 0 ? (
          <p className="text-center text-neutral-500 dark:text-neutral-400">
            No data to display
          </p>
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

      {/* Bar Chart */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-6">
        <h2 className="text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          {trendHeadingText}
        </h2>
        {dailyData.every((item) => item.value === 0) ? (
          <p className="text-center text-neutral-500 dark:text-neutral-400">
            No data to display
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
                interval={0}
                minTickGap={10}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExpenseCharts;
