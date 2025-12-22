# 🩸 Blood Donation Application DropLinks

## 📖 Project Description

The **Blood Donation Application** is a full-stack MERN-based platform that connects blood donors with recipients in need.  
It provides role-based dashboards for **Donors**, **Volunteers**, and **Admins**, enabling secure blood request management, donor searching, and funding support.

This project focuses on:

- Clean UI/UX
- Secure authentication & authorization
- Real-world dashboard functionality
- Scalable backend architecture

---

## 🎯 Project Objective

- Create a centralized blood donation system
- Allow donors to request and donate blood easily
- Enable admins to manage users and requests efficiently
- Implement funding support with Stripe
- Ensure secure and smooth production deployment

---

## 🌐 Live Site

- **Frontend Live Link:** [DropLinks](https://droplinks.pages.dev/)

---

## 👥 User Roles & Features

### 🩸 Donor

- Register & login
- Update profile information
- Create, edit & delete blood donation requests
- View personal donation requests
- Search donors by blood group & location
- Confirm donation (status update)

### 🤝 Volunteer

- View all donation requests
- Filter donation requests
- Update donation status only

### 🌐 Admin

- Manage all users (block / unblock)
- Assign roles (donor → volunteer / admin)
- Manage all donation requests
- View total users, total requests & total funding
- Access funding history

---

## 🧩 Core Features

- Email & password authentication
- JWT protected private routes & APIs
- Role-based dashboard access
- Responsive sidebar dashboard
- Donation request lifecycle  
  `pending → inprogress → done / canceled`
- Public donor search
- Stripe payment integration
- Pagination & filtering where required
- Fully responsive design

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- React Router
- Tailwind CSS
- Firebase Authentication
- TanStack React Query
- Axios
- React Hook Form
- Framer Motion
- Headless UI
- React Toast & Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- Stripe Payment Gateway
- JWT Authentication
- CORS

---

## 📦 NPM Packages Used

### 📁 Client Side

```json
{
  "@headlessui/react": "^2.2.9",
  "@tailwindcss/vite": "^4.1.18",
  "@tanstack/react-query": "^5.90.12",
  "axios": "^1.13.2",
  "firebase": "^12.6.0",
  "framer-motion": "^12.23.26",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.68.0",
  "react-hot-toast": "^2.6.0",
  "react-router": "^7.10.1",
  "react-toastify": "^11.0.5",
  "tailwindcss": "^4.1.18"
}
```
