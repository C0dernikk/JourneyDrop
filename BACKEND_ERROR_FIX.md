# 🚨 Backend Error Fix Guide

## Current Issues Identified

### 1. CORS Error: "Not allowed by CORS"
**Root Cause**: The backend is rejecting requests from your frontend domain because the `CLIENT_URL` environment variable is not properly set or the CORS configuration is too restrictive.

### 2. Express Rate Limit Error: `ERR_ERL_UNEXPECTED_X_FORWARDED_FOR`
**Root Cause**: Rate limiting is misconfigured for proxy environments (Render uses proxies).

## ✅ IMMEDIATE FIXES APPLIED

### 1. Fixed Rate Limiting for Proxy Environment
```javascript
// Added to server.js - Production rate limiting now supports proxies
trustProxy: true,
validate: { 
  ip: false, 
  xForwardedForHeader: false,
  forwardedHeader: false 
},
keyGenerator: (req) => {
  return req.ip || req.connection.remoteAddress || 'unknown';
}
```

### 2. Enhanced CORS Configuration
```javascript
// Added explicit domains and better logging
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.CLIENT_URL,
  "https://journeydrop.vercel.app", // Your Vercel domain
  "https://journeydrop.onrender.com", // Your Render domain
];
```

### 3. Added Proxy Trust Settings
```javascript
// Trust proxy for Render deployment
app.set('trust proxy', 1);
```

## 🔧 RENDER DEPLOYMENT STEPS

### Step 1: Update Render Environment Variables
Go to your Render dashboard → Your Web Service → Environment → Add these variables:

```bash
NODE_ENV=production
PORT=5000
CLIENT_URL=https://journey-drop-nwlo.vercel.app
AUTH_COOKIE=__Secure-courierconnect_auth
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
RESET_TOKEN_EXPIRES=10
```

### Step 2: Redeploy Backend
1. Go to Render dashboard
2. Click "Manual Deploy" → "Deploy latest commit"
3. Wait for deployment to complete

### Step 3: Verify Deployment
Test these endpoints:
```bash
# Health check
curl https://journeydrop.onrender.com/api/health

# Test CORS (should work now)
curl -H "Origin: https://journey-drop-nwlo.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://journeydrop.onrender.com/api/auth/register
```

## 🧪 DEBUGGING STEPS

### Check Backend Logs
1. Go to Render dashboard → Your service → Logs
2. Look for these log messages:
   - `CORS check - Origin: https://journey-drop-nwlo.vercel.app, Allowed: ...`
   - `MongoDB connected successfully`
   - `Server running on port 5000 in production mode`

### Test Registration Directly
```bash
# Test registration endpoint
curl -X POST https://journeydrop.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Origin: https://journey-drop-nwlo.vercel.app" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123!@#"
  }'
```

## 🎯 SUCCESS CRITERIA

✅ **Fixed**: CORS errors should be resolved  
✅ **Fixed**: Rate limiting proxy errors should be resolved  
✅ **Working**: Registration API calls should succeed  
✅ **Working**: Frontend should connect to backend without errors  

## 📞 If Issues Persist

1. **Check Render Logs**: Look for specific error messages
2. **Verify Environment Variables**: Ensure all variables are set correctly
3. **Test Direct API Calls**: Use curl to isolate frontend vs backend issues
4. **Check Domain Consistency**: Ensure frontend URL matches `CLIENT_URL`

## 🔄 Next Steps

1. Redeploy backend with these fixes
2. Test registration from frontend
3. Monitor logs for any remaining issues
4. Report back with results!

## Issues Identified

### 1. CORS Error
**Problem**: Frontend domain not properly configured in backend
**Fix**: Update `CLIENT_URL` in your Render environment variables

### 2. 500 Internal Server Error
**Problem**: Multiple potential causes in registration route
**Fix**: Enhanced error handling and validation

## ✅ Immediate Fixes

### Fix 1: Update Render Environment Variables

Go to your Render dashboard and update these environment variables:

```env
CLIENT_URL=https://journeydrop.vercel.app
AUTH_COOKIE=true
NODE_ENV=production
```

### Fix 2: Enhanced Error Handling

I've identified potential issues in the registration route. Here's the enhanced version:

```javascript
// Enhanced registration route with better error handling
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Enhanced validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, email and password are required' 
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide a valid email address' 
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create user with safe defaults
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      role: role && ['sender', 'traveler', 'both'].includes(role) ? role : 'both'
    };

    const user = await User.create(userData);

    // Send token response
    const useCookie = (process.env.AUTH_COOKIE || 'false') === 'true';
    return sendTokenResponse(user, res, useCookie);
    
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: messages.join(', ') 
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: 'Registration failed. Please try again.' 
    });
  }
});
```

### Fix 3: Test the Registration Endpoint

Test your backend directly with curl:

```bash
# Test registration endpoint
curl -X POST https://journeydrop.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "both"
  }'
```

### Fix 4: Check Backend Logs

1. Go to your Render dashboard
2. Click on your service
3. Go to "Logs" tab
4. Look for any error messages during registration

## 🔍 Debugging Steps

### 1. Test Health Endpoint First
```bash
curl https://journeydrop.onrender.com/api/health
```

### 2. Test with Minimal Data
Try registering with just name, email, password:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

### 3. Check Browser Network Tab
- Open DevTools (F12)
- Go to Network tab
- Try registration
- Click on the failed request
- Check "Response" tab for detailed error message

### 4. Verify Environment Variables
Make sure these are set in Render:
```env
MONGO_URI=mongodb+srv://codernikk:nikk%401974@cluster0.nskn2hi.mongodb.net/JourneyDrop?retryWrites=true&w=majority
JWT_SECRET=38e5821f062c6768653b8f6956b642bdbd9ae0556cc8ce9d0f38310243f6641f215ce18dc40ee91513359a914d1e2c19cfef9b3d2296045609f16779795f208f
CLIENT_URL=https://journeydrop.vercel.app
AUTH_COOKIE=true
NODE_ENV=production
PORT=5000
```

## 🎯 Success Criteria
- [ ] CORS errors resolved (frontend can reach backend)
- [ ] Registration returns 200 status
- [ ] User created successfully in database
- [ ] JWT token returned or cookie set
- [ ] No 500 errors in browser Network tab

## 🚨 Common Issues & Solutions

### CORS Still Fails?
1. Check `CLIENT_URL` exactly matches your frontend domain
2. Include protocol: `https://` not just `journeydrop.vercel.app`
3. No trailing slash in URL

### 500 Error Persists?
1. Check backend logs for specific error message
2. Verify MongoDB connection is working
3. Test with minimal registration data
4. Check if user already exists in database

### Database Connection Issues?
1. Verify MongoDB URI is correct
2. Check if MongoDB Atlas allows connections from Render IP
3. Test connection locally first

Let me know what error message you see in the browser console or backend logs!