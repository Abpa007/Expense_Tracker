Here is your **fully professional, clean `README.md`** for your **MERN Expense Tracker**, including:

✅ Big heading “Made by Abhay Panchal”
✅ Clear structure, deployment links
✅ Features, tech stack
✅ Local setup instructions
✅ **Folder structure section** for clarity
✅ Clean, readable Markdown for GitHub

---

```markdown
# 🚀 Expense Tracker (MERN + Redux)

## 🛠️ Made by Abhay Panchal

A clean, responsive, and user-friendly **Expense Tracker** built with **MERN Stack + Redux**, allowing you to **track, analyze, and manage expenses** with graphs, filters, and secure JWT authentication.

---

## 🌐 Live Demo

- **Frontend:** [https://expense-tracker-frontend-nu-seven.vercel.app](https://expense-tracker-frontend-nu-seven.vercel.app)
- **Backend:** [https://expense-tracker-backend-x0zj.onrender.com](https://expense-tracker-backend-x0zj.onrender.com)

---

## 📁 Folder Structure

```

Expense\_Tracker/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
├── public/
├── src/
│   ├── components/
│   ├── features/      # Redux slices
│   ├── pages/         # Dashboard, Login, Register, Expenses, AddExpense
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── tailwind.config.js

````

---

## 📈 Features

✅ **Authentication** (Register & Login with JWT)  
✅ **Dashboard:**
- Total expense overview
- Category-wise expense data
- Start date to end date filtering
- Clear filters
- **Recharts graphs:**
  - Category-wise expense distribution
  - Monthly expense trends

✅ **Expenses Page:**
- Filter expenses by year and month (default: all)
- View expense list with **date, title, category, amount, notes**
- Edit and delete expenses

✅ **Add Expense Page:**
- Add expense with:
  - Title
  - Amount
  - Category
  - Notes

✅ Fully responsive (mobile-friendly)  
✅ Styled with **Tailwind CSS**

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Axios, Recharts, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abpa007/Expense_Tracker.git
cd Expense_Tracker
````

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

The backend will run on:

```
http://localhost:5000
```

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend`:

```
REACT_APP_BACKEND_URL=http://localhost:5000
```

For production deployment on Vercel, update:

```
REACT_APP_BACKEND_URL=https://expense-tracker-backend-x0zj.onrender.com
```

Start the frontend:

```bash
npm start
```

The frontend will run on:

```
http://localhost:3000
```

---

## 📊 Screenshots

### Dashboard

* View total expenses
* Filter by date range
* Category-wise and monthly graphs

### Expenses Page

* Filter by year and month
* Edit and delete expenses

### Add Expense Page

* Add expenses with title, amount, category, notes

---

## 🤝 Contributions

PRs are welcome for bug fixes, refactors, and feature enhancements.

---

## 📩 Contact

For questions, collaboration, or freelance requests:

* **Email:** [abhaypanchal095@gmail.com](mailto:abhaypanchal095@gmail.com)
* **GitHub:** [Abpa007](https://github.com/Abpa007)

---

## ⭐ If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

*Made with ❤️ by Abhay Panchal*

```

