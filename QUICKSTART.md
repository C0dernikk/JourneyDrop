# Quick Start Guide

## 🚀 Running CourierConnect Locally

### Step 1: Check Environment Variables

Make sure you have a `.env` file in the root directory with:

```env
MONGO_URI=mongodb://localhost:27017/courierconnect
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Note:** If using MongoDB Atlas (cloud), use:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/courierconnect
```

### Step 2: Start MongoDB

Make sure MongoDB is running:
- **Local MongoDB**: Start MongoDB service on your system
- **MongoDB Atlas**: No action needed, just use your connection string

### Step 3: Seed Database (Optional)

```bash
node seed.js
```

This creates 3 sample parcels and 3 sample trips for testing.

### Step 4: Start Backend Server

Open a terminal in the project root and run:

```bash
npm start
```

Backend will run on: `http://localhost:5000`

### Step 5: Start Frontend Server

Open a **new terminal** and run:

```bash
cd client
npm run dev
```

Frontend will run on: `http://localhost:3000`

### Step 6: Open in Browser

Visit: `http://localhost:3000`

## ✅ You're All Set!

- Backend API: `http://localhost:5000`
- Frontend App: `http://localhost:3000`
- API Health Check: `http://localhost:5000/api/health`

## 🧪 Test the App

1. **Send a Parcel**: Go to `/send` and create a parcel
2. **Post a Trip**: Go to `/trip` and create a trip
3. **Find Matches**: Go to `/matches` to see matching trips
4. **Manage Bookings**: Go to `/bookings` to manage bookings

## 🛑 Stopping the Servers

- Press `Ctrl + C` in each terminal to stop the servers

