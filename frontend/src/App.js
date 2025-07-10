import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../features/expenses/expenseSlice";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Loader from "../components/Loader";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6384",
  "#8884D8",
];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Group expenses by category for PieChart
  const data = Object.values(
    expenses.reduce((acc, curr) => {
      acc[curr.category] = acc[curr.category] || {
        name: curr.category,
        value: 0,
      };
      acc[curr.category].value += curr.amount;
      return acc;
    }, {})
  );

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-xl mb-6">Total Expenses: ₹{total}</p>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ₹${value}`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
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
