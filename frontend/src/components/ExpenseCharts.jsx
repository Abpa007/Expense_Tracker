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

  /** ---------------- Pie Chart Data (filter-based) ---------------- */
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

  /** ---------------- Bar Chart Data (always current month) ---------------- */
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1);
    const label = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

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

  /** ---------------- Headings ---------------- */
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

  /** ---------------- Component Return ---------------- */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <h2 className="text-center text-base sm:text-lg font-semibold text-gray-800 mb-4">
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
                outerRadius={90}
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
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-center text-base sm:text-lg font-semibold text-gray-800 mb-4">
          {trendHeadingText}
        </h2>
        {dailyData.every((item) => item.value === 0) ? (
          <p className="text-center text-gray-500">No data to display</p>
        ) : (
          <div className="min-w-[500px] md:min-w-0">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  height={30}
                  interval={4} // Show every 5th label for clarity
                />

                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCharts;
