
# 🧾 **EXPENSE TRACKER**

## 🛠️ Made by Abhay Panchal

A **clean, production-level Expense Tracker** built using the **MERN Stack + Redux Toolkit**, enabling you to **track, analyze, and manage your expenses efficiently**. Features include secure JWT authentication, insightful graphs, dynamic filtering, and a fully responsive UI for **real-world deployment, interviews, and your portfolio**.

---

## 🌐 Live Demo

- **Frontend:** [View Live Frontend](https://expense-tracker-frontend-nu-seven.vercel.app)
- **Backend:** [View Live Backend](https://expense-tracker-backend-x0zj.onrender.com)

---

## 📂 Folder Structure

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

```

---

## ✨ Features

✅ **Secure Authentication:**
- JWT-based Register/Login
- Password encryption using bcrypt

✅ **Dashboard:**
- Total expense overview
- Date range filtering
- Category-wise and monthly expense trends using **Recharts**
- Clear filters functionality

✅ **Expense Management:**
- Add, edit, and delete expenses
- View expenses with details (title, amount, date, category, notes)
- Filter by year and month

✅ **Responsive UI:**
- Mobile-first design with Tailwind CSS

✅ **Notifications:**
- Toast notifications for add, update, delete, login actions

✅ **API & Backend:**
- RESTful APIs for expenses and users
- JWT-protected routes
- MongoDB with Mongoose schemas for data structure

✅ **Clean State Management:**
- Redux Toolkit for predictable state management
- Clear folder/component structure following industry practices

✅ **Future Ready:**
- Easy to extend with multi-user support
- Export to CSV/PDF
- Email notifications
- Light/Dark theme toggle

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Axios, Recharts, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```

MONGO\_URI=your\_mongodb\_connection\_string
JWT\_SECRET=your\_secret\_key

```

### Frontend (`frontend/.env`)
```

REACT\_APP\_BACKEND\_URL=[http://localhost:5000](http://localhost:5000)

```
For production:
```

REACT\_APP\_BACKEND\_URL=[https://expense-tracker-backend-x0zj.onrender.com](https://expense-tracker-backend-x0zj.onrender.com)

````

---

## 🖥️ Local Setup Instructions

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

Create a `.env` file in the `backend` folder using the environment variables above.

Start the backend server:

```bash
npm start
```

> Server will run on: `http://localhost:5000`

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` folder using the environment variables above.

Start the frontend app:

```bash
npm start
```

> App will run on: `http://localhost:3000`

---

## 📊 Screenshots

### 📌 Dashboard

* Category-wise visualization
* Date range filtering
* Monthly and category graphs

### 📌 Expenses Page

* View, filter, edit, and delete expenses

### 📌 Add Expense Page

* Easily add expenses with detailed fields

---

## 🚀 Future Enhancements

* Email notifications for reminders and summaries
* Export data to CSV/PDF
* Multi-user authentication & management
* Light/Dark mode toggle
* Monthly budget goal tracking
* Recurring expense setup

---

## 🤝 Contributions

Contributions, suggestions, and improvements are welcome!
To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

---

## 📩 Contact

For **questions, collaboration, or freelance opportunities:**

* **Email:** [abhaypanchal095@gmail.com](mailto:abhaypanchal095@gmail.com)
* **GitHub:** [Abpa007](https://github.com/Abpa007)

---

## ⭐ If you found this project helpful, please give it a ⭐ on GitHub!

---

*Made with ❤️ by Abhay Panchal*

```

---

### Why this version is **highly job-ready:**

✅ **Large, clear “EXPENSE TRACKER” heading for repo impact**  
✅ All **tech stack, features, and structure aligned for real-world interviews**  
✅ Clear instructions for **recruiters to test locally**  
✅ **Future enhancements** showing product thinking  
✅ Consistent professional tone, easy to read, and clean formatting  
✅ **Plug-and-play into your GitHub for immediate push**

---

If you want, I can now prepare:

✅ A **LinkedIn post draft** to showcase this project professionally  
✅ A **project banner for GitHub repo**  
✅ A **resume bullet point** for your CV with impact

to further strengthen your **10+ LPA job portfolio push**. Let me know if you would like them next.
```
