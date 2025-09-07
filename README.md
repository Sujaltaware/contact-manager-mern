# Contact Manager App (MERN)

The project is a simple **Contact Manager** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It includes user authentication with JWT and full CRUD functionality for managing contacts.

---

## 🚀 Features

- User signup & login with JWT authentication
- Secure password hashing (bcryptjs)
- Add, edit, delete contacts
- View list of saved contacts (user-specific)
- Frontend (React + Vite) connected with backend API
- **React Hook Form** used for form handling and validation
- **React Icons** used for UI icons
- **Tailwind CSS** for styling
- Clean project structure with environment variables and documentation

---

## 🗂️ Project Structure

```
contact-manager/
├── backend/        # Express + MongoDB API
│   ├── config/     # Database config
│   ├── models/     # Mongoose models (User, Contact)
│   ├── routes/     # Auth & Contact routes
│   ├── middleware/ # JWT auth middleware
│   ├── server.js   # Express server entry
│   └── .env.example
│
├── frontend/       # React (Vite) frontend
│   ├── src/        # Pages, components, API helpers
│   ├── public/     # Static assets
│   └── .env.example
│
└── README.md       # Documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone repository
```bash
git clone <your-repo-url>
cd contact-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Edit `.env` and provide:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:
```bash
npm run dev
```
Server runs on: **http://localhost:5000**

---

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
```
Edit `.env` and provide:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```
App runs on: **http://localhost:5173**

---

## 🎨 Frontend Libraries

- **React Hook Form** → Handles form validation and submission in Signup, Login, and Contacts forms.  
- **React Icons** → Provides icons for buttons and UI elements.  
- **Tailwind CSS** → Used for modern, responsive styling with utility-first classes.  

---

## 🛠️ API Endpoints

### Auth Routes
- `POST /api/auth/signup` → Create user  
- `POST /api/auth/login` → Login user, returns JWT

### Contact Routes (Protected)
- `POST /api/contacts` → Add contact  
- `GET /api/contacts` → Get user contacts  
- `PUT /api/contacts/:id` → Update contact  
- `DELETE /api/contacts/:id` → Delete contact  

👉 Must send `Authorization: Bearer <token>` header.

---

## 🧪 Testing

You can test using Postman, Thunder Client, or cURL.  
Example signup request:

```bash
curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d '{"name":"Test User","email":"test@test.com","password":"123456"}'
```

---
## 📸 Screenshots

### Login Page  
<img width="1858" height="908" alt="Image" src="https://github.com/user-attachments/assets/25d112ce-bac1-44c4-ba4d-8c6be6f4523c"/>

### Signup Page  
<img width="1853" height="897" alt="Image" src="https://github.com/user-attachments/assets/9b2a48e6-6534-47f1-a820-bbdcff013418" />

### Contacts Dashboard  
<img width="1852" height="900" alt="Image" src="https://github.com/user-attachments/assets/af3ec4b2-695a-47f2-9582-25e9d1b991c9" />
