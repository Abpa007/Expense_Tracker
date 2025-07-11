const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS configuration for frontend access
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://expense-tracker-frontend-nu-seven.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

// Error handling middleware
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
