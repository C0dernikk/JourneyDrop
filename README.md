# CourierConnect

A modern platform that connects parcel senders with travelers going to the same destination. Send parcels securely and efficiently by matching them with verified travelers.

## 🚀 Features

- **Send Parcel**: Create parcel requests with destination, weight, and delivery date
- **Post Trip**: Travelers can post their trips and available capacity
- **Find Matches**: Automatically match parcels with trips going to the same destination
- **Manage Bookings**: Create and manage bookings with status updates (Requested, Accepted, Completed)

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication (optional)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🔧 Installation & Setup

### Backend Setup

1. Navigate to the project root directory:
```bash
cd JourneyDrop
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb+srv://<your-db-url>
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Seed the database (optional):
```bash
node seed.js
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
JourneyDrop/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utilities (axios config)
│   │   └── App.jsx        # Main app component
│   ├── package.json
│   └── vite.config.js
├── config/                # Configuration files
├── controllers/           # Route controllers
├── models/                # Mongoose models
├── routes/                # Express routes
├── middleware/            # Custom middleware
├── utils/                 # Utility functions
├── server.js              # Express server entry point
├── seed.js                # Database seeder
└── package.json
```

## 🌐 API Endpoints

### Parcels
- `GET /api/parcels` - Get all parcels
- `POST /api/parcels` - Create a new parcel

### Trips
- `GET /api/trips` - Get all trips
- `POST /api/trips` - Create a new trip

### Matches
- `GET /api/matches?parcelId=<id>` - Find matching trips for a parcel

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id` - Update booking status

## 🚀 Deployment

### Backend Deployment (Render)

1. **Create a Render Account**
   - Go to [render.com](https://render.com)
   - Sign up or log in

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository and branch

3. **Configure Build Settings**
   - **Name**: `courierconnect-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `/` (root of repository)

4. **Environment Variables**
   Add the following in Render dashboard:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend
   - Note the service URL (e.g., `https://courierconnect-backend.onrender.com`)

### Frontend Deployment (Vercel)

1. **Update API Base URL**
   - Update `client/src/utils/axios.js`:
   ```javascript
   const api = axios.create({
     baseURL: process.env.VITE_API_URL || 'http://localhost:3000',
     // ...
   })
   ```

2. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with GitHub

3. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository

4. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://courierconnect-backend.onrender.com
   ```

6. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend
   - You'll get a URL like `https://courierconnect.vercel.app`

### Post-Deployment

1. **Update CORS in Backend**
   - Update `server.js` to allow your Vercel domain:
   ```javascript
   app.use(cors({
     origin: ['https://your-app.vercel.app', 'http://localhost:3000'],
     credentials: true
   }))
   ```

2. **Test the Deployment**
   - Visit your Vercel URL
   - Test all features (send parcel, post trip, find matches, manage bookings)

## 🧪 Testing

### Seed Sample Data
```bash
node seed.js
```

This will create:
- 3 sample parcels
- 3 sample trips

## 📝 Scripts

### Backend
- `npm start` - Start the server with nodemon
- `npm run dev` - Start the server with nodemon (same as start)
- `node seed.js` - Seed the database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔒 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://<your-db-url>
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (Vercel Environment Variables)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

CourierConnect Team

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for scalability and performance
- User-friendly interface with smooth animations
