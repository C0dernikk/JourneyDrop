# 🚀 Render Backend Deployment Guide

## ✅ Environment Variables Setup

### Method 1: Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Select your JourneyDrop web service

2. **Navigate to Environment**
   - Click on "Environment" tab
   - Go to "Environment Variables" section

3. **Add These Variables**

**Required Variables:**
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://codernikk:nikk%401974@cluster0.nskn2hi.mongodb.net/JourneyDrop?retryWrites=true&w=majority
JWT_SECRET=38e5821f062c6768653b8f6956b642bdbd9ae0556cc8ce9d0f38310243f6641f215ce18dc40ee91513359a914d1e2c19cfef9b3d2296045609f16779795f208f
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-domain.vercel.app
AUTH_COOKIE=auth_token
RESET_TOKEN_EXPIRES=3600000
```

**Optional Email Variables (for password reset):**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

4. **Save and Redeploy**
   - Click "Save Changes"
   - Render will automatically restart your service

### Method 2: Render Blueprint (render.yaml)

Create `render.yaml` in your project root:

```yaml
services:
  - type: web
    name: journeydrop-backend
    env: node
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: MONGO_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: JWT_EXPIRE
        value: 7d
      - key: CLIENT_URL
        sync: false
      - key: AUTH_COOKIE
        value: auth_token
      - key: RESET_TOKEN_EXPIRES
        value: 3600000
```

---

## 🔍 Verification Steps

### 1. Check Deployment Logs
After setting variables:
1. Go to Render Dashboard
2. Click on your service
3. Check the "Logs" tab
4. Look for startup messages

### 2. Test Health Endpoint
```bash
curl https://your-backend-domain.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "CourierConnect API is running"
}
```

### 3. Verify Environment
Check logs for these startup messages:
- `🚀 Server running on port 5000 in production mode`
- `🔒 Production mode: Security headers and rate limiting enabled`
- `MongoDB connected successfully`

---

## 🚨 Common Issues

### Server crashes on startup?
1. **Missing JWT_SECRET** - Ensure it's set and long enough (64+ characters)
2. **Invalid MONGO_URI** - Check connection string format
3. **CLIENT_URL format** - Must include protocol (https://)

### CORS errors from frontend?
1. **CLIENT_URL mismatch** - Must exactly match your frontend domain
2. **Missing protocol** - Include `https://` (not just domain.com)
3. **Trailing slash** - Don't include trailing slash in CLIENT_URL

### Registration still fails?
1. **Check backend logs** - Look for JWT or database errors
2. **Verify environment** - Ensure all required variables are set
3. **Test manually** - Use curl or Postman to test `/api/auth/register` directly

---

## 🎯 Success Criteria
- [ ] All environment variables are set in Render
- [ ] Server starts without errors
- [ ] Health endpoint returns success
- [ ] No environment warnings in logs
- [ ] Frontend can successfully call backend APIs

---

## 📞 Need Help?
If issues persist after Render setup:
1. Check Render deployment logs
2. Verify all environment variables are set correctly
3. Test backend health endpoint
4. Let me know what errors you see in the logs