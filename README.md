# 📚 Library Dashboard 

A simple Library Management Dashboard built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This project allows users to **Register / Login**, and perform **CRUD operations** on books:  
- ➕ Add new books  
- 📖 View all books  
- 🔍 Search books  
- ✏️ Update book details  
- ❌ Delete books  

The app is fully deployed:  
- **Frontend (React) on Vercel**  
- **Backend (Node + Express) on Render**  
- **Database on MongoDB Atlas**

---

## 🚀 Live Demo
🔗 **Frontend (Vercel):** [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)  
🔗 **Backend (Render):** [https://your-render-link.onrender.com](https://your-render-link.onrender.com)

---

## ⚙️ Tech Stack
- **Frontend:** React.js (Vercel Deployment)  
- **Backend:** Node.js + Express.js (Render Deployment)  
- **Database:** MongoDB Atlas (Cloud)  
- **Authentication:** JWT (JSON Web Tokens)

---

## 📂 Project Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/library-dashboard.git
cd library-dashboard
```

### 2️⃣ Backend Setup (/backend)
```bash
cd backend
npm install
```

Create a `.env` file in `/backend` with:
```env
MONGO_URI=your-mongo-uri
JWT_SECRET=your-secret-key
PORT=5000
```

Run locally (optional for testing):
```bash
node index.js
```

### 3️⃣ Frontend Setup (/frontend)
```bash
cd frontend
npm install
```

Update `frontend/src/services/api.js` with your **Render backend URL**, e.g.:
```js
const API_URL = "https://your-backend.onrender.com/api";
```

Run locally (optional for testing):
```bash
npm start
```

---

## 📦 Features
- User **Registration & Login**  
- JWT-based **Authentication**  
- Add new books to the library  
- View list of books  
- Search books by title/author  
- Update existing book details  
- Delete books  

---

## 🌐 Deployment
- **Frontend (React)** → deployed to **Vercel**  
- **Backend (Express API)** → deployed to **Render**  
- **MongoDB Atlas** → stores user + book data  

---


## 🙌 Author
👩‍💻 Developed by **Trashika S Karkera**
