# 🏸 Sports Club Management System (SCMS)

A full-stack web application designed for managing a single sports club’s operations, including user registration, court booking, membership, payments, and admin control—all under one seamless platform.

🔗 **Live Site:** https://sports-club-sabrh.netlify.app/ 
🛠️ **Admin Login:**  
**Email:** admin@sportsclub.com  
**Password:** admin123  

---

## 📌 Key Features

- ✅ **Authentication & Authorization:**  
  Role-based auth for `Users`, `Members`, and `Admins`

- 🎫 **Court/Session Booking System:**  
  Multi-slot selection, dynamic pricing, and booking status

- 💳 **Integrated Payment Workflow:**  
  Coupon support, price update on apply, and transaction history

- 📊 **User, Member, and Admin Dashboards**  
  Personalized dashboard views with relevant routes and actions

- 🔔 **Announcement System:**  
  Admins can manage and broadcast announcements

- 🧾 **CRUD Operations Everywhere:**  
  Courts, Bookings, Users, Payments, Members, Announcements, Coupons

- 💻 **Tech Stack:**
  - Frontend: React.js + Tailwind CSS + DaisyUI
  - Backend: Node.js + Express.js
  - Database: MongoDB
  - State Management: TanStack Query
  - Auth: Firebase Authentication
  - Payment: Stripe
  - Environment: Vite

- 🔒 **Secure Credentials:**  
  All sensitive data managed through `.env` environment variables

- 📱 **Responsive Design:**  
  Mobile-first UI with adaptive dashboards

- 🔁 **After reload → stays on current route**  
  No unwanted redirects to login for authorized users

- 🔥 **Notifications Everywhere:**  
  Toasts and sweet alerts for every CRUD + Auth event

- 🧠 **Bonus Features:**
  - Toggle between Table/Card view in Payment History
  - Pagination in Court page
  - Axios interceptor for secured API communication
  - TanStack mutation used for POST/PUT/DELETE

---

## 🗂️ Pages Overview

### 🏠 Home Page
- Rotating banner with club/courts/activities
- About section with history and mission
- Location section with map integration
- Promotions section with various coupon codes
- Footer with contact and social links

### 🏟 Courts Page
- Court image, type, slot dropdown, price, book now
- Modal booking form with dynamic slot/price
- Booking status: Pending → Approved → Paid → Confirmed

### 👤 User Dashboard
- Profile details
- View & cancel pending bookings
- View announcements

### 👤 Member Dashboard
- Shows member since date
- Pending, approved, and confirmed bookings
- Integrated Stripe payment system with coupon apply
- Payment history with layout toggle
- Announcement section

### 👨‍💼 Admin Dashboard
- Profile stats: total courts, users, members
- Booking requests: approve/reject
- Manage members, users, and courts
- CRUD for coupons
- Announcement system

---

## 🛠️ Project Setup

### Frontend

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-sabrh
cd b11a12-client-side-sabrh
npm install
npm run dev
