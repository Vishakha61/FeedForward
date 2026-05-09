# 🍲 FeedForward - Food Donation Platform

**FeedForward** is a full-stack MERN (MongoDB, Express, React, Node.js) application that connects food donors with NGOs and people in need. The platform helps reduce food waste while fighting hunger by making surplus food donation simple and efficient.

## 🚀 Features

### For Donors
- 📦 List surplus food with details (type, quantity, servings, dietary info)
- 📊 Track donation history and impact statistics
- 📍 Specify pickup locations for easy collection
- 🏆 View your total impact (meals donated, people fed, CO₂ saved)

### For NGOs & Recipients
- 🔍 Browse available food donations near you
- 🗺️ Filter by city, category, and dietary preferences
- 📋 Request food pickups with one click
- 📈 Track received donations and distribution stats

### General
- 🔐 Secure JWT-based authentication
- 👤 Role-based access (Donor, NGO, Recipient)
- 📱 Fully responsive design
- 🎨 Modern, professional UI with Tailwind CSS
- 🔎 Advanced search and filtering

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for blazing-fast builds
- **Tailwind CSS v4** for styling
- **React Router v7** for navigation
- **Lucide React** for icons
- **clsx + tailwind-merge** for utility classes

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

## 📁 Project Structure

```
feedforward/
├── src/                    # Frontend source
│   ├── components/         # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/            # React contexts
│   │   └── AuthContext.tsx
│   ├── pages/              # Page components
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── DonorDashboard.tsx
│   │   ├── RecipientDashboard.tsx
│   │   ├── DonateFood.tsx
│   │   └── BrowseDonations.tsx
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── cn.ts
│   ├── App.tsx             # Main app with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── server/                 # Backend source
│   ├── models/             # MongoDB models
│   │   ├── User.js
│   │   └── Donation.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── donations.js
│   │   └── users.js
│   ├── middleware/         # Express middleware
│   │   └── auth.js
│   ├── index.js            # Server entry point
│   └── package.json
├── public/                 # Static assets
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/feedforward.git
   cd feedforward
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your MongoDB URI and JWT secret
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The API will be available at `http://localhost:5000/api`

6. **Start the frontend (separate terminal)**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Demo Credentials (Frontend Demo Mode)

| Role | Email | Password |
|------|-------|----------|
| Donor | rahul@demo.com | demo123 |
| NGO | hope@demo.com | demo123 |
| Recipient | priya@demo.com | demo123 |

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

### Donations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/donations` | Create donation | Donor |
| GET | `/api/donations` | Get all donations | No |
| GET | `/api/donations/my` | Get user's donations | Yes |
| GET | `/api/donations/:id` | Get single donation | No |
| PUT | `/api/donations/:id/claim` | Claim donation | Recipient/NGO |
| PUT | `/api/donations/:id/collect` | Mark as collected | Yes |
| DELETE | `/api/donations/:id` | Delete donation | Owner |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/stats` | Platform stats | No |
| GET | `/api/users/donors` | List donors | No |
| GET | `/api/users/ngos` | List NGOs | No |
| GET | `/api/users/profile/:id` | Public profile | No |

## 🎯 Future Enhancements

- 📱 Mobile app with React Native
- 🔔 Real-time notifications
- 📍 GPS-based location tracking
- ⭐ Rating and review system
- 📊 Advanced analytics dashboard
- 💬 In-app messaging
- 📸 Image upload for donations
- 🗺️ Map view of available donations
- 🌐 Multi-language support
- 💳 Integration with food banks

## 📄 License

This project is created as a final year engineering project. All rights reserved.

## 👨‍💻 Author

Created with ❤️ as a final year project demonstrating the power of MERN stack for social impact.
