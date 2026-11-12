
# 🧾 Expense Tracker — Full-Stack Personal Finance & Analytics Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18%2B-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-Responsive%20UI-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

A clean, production-level **Expense Tracker** built using the **MERN Stack + Redux Toolkit**, enabling users to track, analyze, and manage personal expenses efficiently. Engineered with secure JWT authentication, interactive Recharts visualizations, dynamic date/category filtering, and a mobile-first responsive UI.

---

## 🌐 Live Deployments

| Service | Hosting Platform | Live URL |
| :--- | :--- | :--- |
| **Frontend Application** | Vercel | [expense-tracker-frontend-nu-seven.vercel.app](https://expense-tracker-frontend-nu-seven.vercel.app) |
| **Backend REST API** | Render | [expense-tracker-backend-x0zj.onrender.com](https://expense-tracker-backend-x0zj.onrender.com) |

---

## ✨ Key Features

* 🔐 **Secure Authentication:** Stateless JWT-based registration and login flows with `bcrypt` password hashing and protected API routes.
* 📊 **Interactive Analytics Dashboard:** Real-time total expense summaries, custom date-range filtering, and category-wise/monthly trend charts powered by **Recharts**.
* 💸 **Full Expense CRUD & Filtering:** Create, edit, and delete detailed expense records (title, amount, date, category, notes) with instant year/month filtering.
* 🧠 **Predictable State Management:** Centralized global state powered by **Redux Toolkit** slices for clean async API handling and UI synchronization.
* 📱 **Mobile-First Responsive UI:** Styled with **Tailwind CSS** and equipped with instant toast notifications for user actions.

---

## ⚙️ Tech Stack

| Layer | Technologies | Primary Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | React, Redux Toolkit, React Router, Tailwind CSS | Component architecture, global state, routing, & responsive styling |
| **Data Visualization** | Recharts | Category breakdowns and monthly spending trend graphs |
| **HTTP Client** | Axios | Interceptors and RESTful communication with backend endpoints |
| **Backend API** | Node.js, Express.js | REST API routing, controllers, & JWT auth middleware |
| **Database** | MongoDB, Mongoose | Schema modeling and persistent storage for users & transactions |
| **Security** | JSON Web Tokens (JWT), bcryptjs, dotenv | Token verification, password encryption, & environment isolation |

---

## 📂 Project Structure

```text
Expense_Tracker/
├── backend/
│   ├── config/            # Database connection configuration
│   ├── controllers/       # Request handlers for auth & expense CRUD
│   ├── middleware/        # JWT verification & error handling middleware
│   ├── models/            # Mongoose schemas (User, Expense)
│   ├── routes/            # Express API route definitions
│   ├── utils/             # Helper utilities and token generators
│   ├── .env               # Backend environment variables (git-ignored)
│   ├── package.json       # Backend dependency manifest
│   └── server.js          # Express server entry point
└── frontend/
    ├── public/            # Static public assets
    ├── src/
    │   ├── components/    # Reusable UI components, charts, & modals
    │   ├── features/      # Redux Toolkit slices & store configuration
    │   ├── pages/         # Dashboard, Login, Register, Expenses, AddExpense
    │   ├── utils/         # Axios instance & formatting helpers
    │   ├── App.js         # Main application routing
    │   └── index.js       # React DOM entry point
    ├── .env               # Frontend environment variables (git-ignored)
    ├── package.json       # Frontend dependency manifest
    └── tailwind.config.js # Tailwind CSS theme configuration
```

---

## 🚀 Local Installation & Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Abpa007/Expense_Tracker.git
cd Expense_Tracker
```

### 2. Configure & Start Backend (`backend/`)
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server (runs on `http://localhost:5000`):
```bash
npm start
```

### 3. Configure & Start Frontend (`frontend/`)
Open a second terminal window:
```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:
```env
# For local development:
REACT_APP_BACKEND_URL=http://localhost:5000

# For production:
# REACT_APP_BACKEND_URL=https://expense-tracker-backend-x0zj.onrender.com
```

Start the React development server (runs on `http://localhost:3000`):
```bash
npm start
```

---

## 📸 Application Views

* **Dashboard Overview:** Displays total expenditure cards, interactive date-range selectors, and Recharts category/monthly visualizations.
* **Expense Ledger:** Searchable and filterable table view supporting quick edits, deletions, and year/month breakdowns.
* **Add / Edit Expense:** Clean form interface with validation and instant toast feedback.

---

## 🔮 Future Enhancements

* **Export & Reporting:** One-click export of filtered expense ledgers to CSV and PDF formats.
* **Budget Goals & Alerts:** Monthly spending thresholds with automated email reminders.
* **Recurring Expenses:** Scheduled auto-logging for monthly subscriptions and bills.
* **Theme Customization:** Persistent Light/Dark mode toggle across all dashboard views.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 👤 Author & Contact

**Developed by:** Abhay Panchal  
**Role:** Full-Stack MERN & Data Intelligence Developer  

* 📧 **Email:** [abhaypanchal095@gmail.com](mailto:abhaypanchal095@gmail.com)
* 🐙 **GitHub:** [github.com/Abpa007](https://github.com/Abpa007)
* 💼 **LinkedIn:** [linkedin.com/in/abhay-panchal-3b853b376](https://linkedin.com/in/abhay-panchal-3b853b376)
* 🌐 **Portfolio:** [abhay-panchal-port-folio.vercel.app](https://abhay-panchal-port-folio.vercel.app)

---

> ⭐ If you found this project helpful, consider giving it a star on GitHub!
