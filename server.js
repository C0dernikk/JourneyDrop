const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// Trust proxy for Render deployment
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // Trust first proxy
}

// Security middleware (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));
  
  // Rate limiting - Fixed for Render proxy environment
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    // Trust proxy headers from Render
    trustProxy: true,
    // Disable IP validation for proxy environments
    validate: { 
      ip: false, 
      xForwardedForHeader: false,
      forwardedHeader: false 
    },
    // Use a custom key generator that works with proxies
    keyGenerator: (req) => {
      return req.ip || req.connection.remoteAddress || 'unknown';
    }
  });
  app.use('/api/', limiter);
}

// Middleware
app.use(cookieParser());
app.use(express.json());

// CORS configuration - Fixed for production
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      process.env.CLIENT_URL,
      "https://journey-drop-nwlo.vercel.app", // Your actual Vercel domain
      "https://journeydrop.onrender.com", // Add Render domain if needed
    ].filter(Boolean); // Remove undefined/null values
    
    console.log(`CORS check - Origin: ${origin}, Allowed: ${allowedOrigins.join(', ')}`);
    
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS rejected - Origin: ${origin} not in allowed list`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/parcels", require("./routes/parcels"));
app.use("/api/trips", require("./routes/trips"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/matches", require("./routes/matches"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "CourierConnect API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Environment validation
const requiredEnvVars = ['JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn('⚠️  Missing environment variables:', missingEnvVars.join(', '));
  console.warn('   This may cause issues in production. Please check your deployment configuration.');
}

// Email configuration check
const emailVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missingEmailVars = emailVars.filter(varName => !process.env[varName]);
if (missingEmailVars.length > 0 && missingEmailVars.length < 3) {
  console.warn('📧 Partial email configuration missing:', missingEmailVars.join(', '));
  console.warn('   Email features (password reset, verification) may not work properly.');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  if (process.env.NODE_ENV === 'production') {
    console.log('🔒 Production mode: Security headers and rate limiting enabled');
  }
});
