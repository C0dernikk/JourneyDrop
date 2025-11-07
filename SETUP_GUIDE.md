# Quick Setup Guide - Just Add Your MongoDB Key!

## ✅ What You Need

**Only 1 thing required:** A valid MongoDB connection string

## 🔧 Setup Steps

### Step 1: Get Your MongoDB Connection String

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/courierconnect`

**Option B: Local MongoDB**
- If MongoDB is installed locally:
  - Format: `mongodb://localhost:27017/courierconnect`

### Step 2: Update .env File

Open the `.env` file in the root directory and update:

```env
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
JWT_SECRET=any_random_string_for_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Example for MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/courierconnect?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=my_secret_key_12345
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 3: Start the Servers

**Terminal 1 - Backend:**
```bash
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 4: Test It!

1. Open `http://localhost:3000`
2. Go to **Send Parcel** - Create a parcel ✅
3. Go to **Post Trip** - Create a trip ✅
4. Go to **Matches** - See matching trips ✅
5. Go to **Bookings** - Create and manage bookings ✅

## 🎯 That's It!

Once you add your MongoDB connection string, **everything will work**:
- ✅ Send Parcel
- ✅ Post Trip  
- ✅ Find Matches
- ✅ Manage Bookings

## 🔍 Verify Connection

Check the backend terminal - you should see:
```
MongoDB connected successfully
Server running on port 5000
```

If you see an error, check:
- MongoDB connection string is correct
- Username/password are correct
- Network allows connections (for Atlas, check IP whitelist)

## 💡 Optional: Add Sample Data

After connecting, you can add sample data:
```bash
node seed.js
```

This creates 3 sample parcels and 3 trips for testing.

