# 🍔 Food Delivery Web App (Next.js)

- 🔗 Live Demo: https://food-d-elivery-app.vercel.app/restaurant

A full-stack multi-role food delivery platform built with Next.js, supporting real-time order flow between Users, Hotel Owners, and Delivery Partners.

## 🚀 Features

### 👥 Multi-Role System

- User
- Browse restaurants
- Add food items to cart
- Place orders
- Track order status
- View order history
- Hotel Owner
- Manage incoming orders
- Update order status (picked up)
- Delivery Partner
- Accept orders (accept)
- Deliver orders (delivered)

### 🔐 Authentication

- JWT-based authentication
- Secure login/signup for all roles
- Protected routes

### 📍 Location & Distance Calculation

- User can set location via map
- Distance calculated dynamically
- Delivery charges added based on distance

### 🛒 Cart & Ordering System

- Add/remove items from cart
- Dynamic billing system
- Includes:
- Food price
- Delivery charge (based on distance)

### 📦 Order Workflow (Real-Time Style)

- User places order
- Delivery Partner types → accept
- Hotel Owner updates → picked up
- Delivery Partner updates → delivered

### ➡️ Status is reflected to the user for order tracking

### 📜 Order History

- Users can view past orders
- Includes order details and status

## 🛠️ Tech Stack

- Frontend: Next.js, React
- Backend: Node.js (API routes / server)
- Authentication: JWT
- Database: (Add your DB here e.g. MongoDB)
- Maps Integration: Location selection & distance calculation
- Deployment: Vercel

## 💡 Key Highlights

- Real-world multi-role system
- Practical order lifecycle handling
- Distance-based billing logic
- Clean separation of roles and responsibilities
- Great for internship + hackathon showcase

## 📌 Future Improvements

- Real-time updates using WebSockets
- Payment gateway integration
- Push notifications
- Admin dashboard
