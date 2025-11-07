# JourneyDrop Deployment Troubleshooting Guide

## Registration Failed Issue - Production Deployment

### Quick Diagnostic Steps

1. **Check Deployment Logs**
   ```bash
   # On Render
   View logs in Render dashboard
   
   # On Heroku
   heroku logs --tail
   
   # On Vercel
   Check Functions logs in Vercel dashboard
   ```

2. **Test API Health**
   ```bash
   curl https://your-backend-domain.com/api/health
   ```

### Common Issues and Solutions

#### 1. Environment Variables (Most Common)

**Backend Environment Variables Required:**
```bash
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/courierconnect

# Authentication
JWT_SECRET=your_very_long_random_string_at_least_32_characters

# Deployment
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.vercel.app
PORT=5000

# Email (Optional but recommended)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
```

**Frontend Environment Variables Required:**
```bash
VITE_API_BASE_URL=https://your-backend-domain.onrender.com
VITE_USE_COOKIE_AUTH=true
```

#### 2. CORS Issues

**Symptoms:** 
- Registration works locally but fails when deployed
- Browser shows CORS errors in console

**Solution:** 
✅ **Fixed in your code** - I've updated the CORS configuration in <mcfile name="server.js" path="c:\JourneyDrop\server.js"></mcfile>

#### 3. MongoDB Connection Issues

**Symptoms:**
- "Registration failed" error
- Database connection errors in logs
- Server crashes on startup

**Check:**
- MongoDB Atlas whitelist includes your deployment IP
- Connection string is correct (use `MONGO_URI`)
- Database user has proper permissions
- ✅ **Fixed**: Now supports both `MONGO_URI` and `MONGODB_URI`

#### 4. Authentication Issues

**JWT Configuration:**
- Ensure `JWT_SECRET` is set and is at least 32 characters
- Check token expiration settings
- ✅ **Enhanced**: Server now validates JWT_SECRET on startup

**Cookie Issues:**
- For cross-domain deployment, cookies might not work
- Consider using Authorization header instead

**Security Headers:**
- ✅ **Added**: Helmet.js for security headers in production
- ✅ **Added**: Rate limiting to prevent abuse

### Manual Testing Steps

1. **Test Registration Endpoint:**
   ```bash
   curl -X POST https://your-backend-domain.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123",
       "phone": "1234567890"
     }'
   ```

2. **Check Server Logs:**
   - Look for "Registration attempt" logs
   - Check for specific error messages
   - Verify MongoDB connection status

3. **Browser Network Tab:**
   - Check if request is reaching the server
   - Look for CORS errors
   - Verify response status codes

### Deployment Checklist

**Before Deploying:**
- [ ] Set all required environment variables
- [ ] Update CORS configuration (✅ Done)
- [ ] Add logging to auth controller (✅ Done)
- [ ] Test MongoDB connection
- [ ] Verify JWT secret length
- [ ] Check frontend API URL configuration
- [ ] ✅ **NEW**: Install new dependencies (`npm install`)
- [ ] ✅ **NEW**: Configure email settings (optional)

**After Deploying:**
- [ ] Test health endpoint: `/api/health`
- [ ] Test registration manually
- [ ] Check server logs for errors
- [ ] Verify CORS is working
- [ ] Test login functionality
- [ ] ✅ **NEW**: Check startup logs for environment warnings
- [ ] ✅ **NEW**: Verify security headers are active (production mode)

### Emergency Fallback

If registration still fails:

1. **Switch to Header-Based Auth:**
   - Set `VITE_USE_COOKIE_AUTH=false` in frontend
   - Update auth logic to use Authorization headers

2. **Add More Logging:**
   - Enable verbose logging in production temporarily
   - Check each step of registration process

3. **Database Direct Test:**
   - Try connecting to MongoDB directly from deployment
   - Run the diagnostic script: `node deployment-debug.js`

### Need More Help?

Run the diagnostic script I created:
```bash
node deployment-debug.js
```

Check your deployment logs for these new log messages:
- "Registration attempt:"
- "Missing required fields:"
- "User already exists:"
- "User created successfully:"
- "Registration error:"

This will help identify exactly where the registration is failing.