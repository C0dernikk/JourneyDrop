# 🚀 Vercel Frontend Deployment Guide

## ✅ Environment Variables Setup

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your JourneyDrop project

2. **Navigate to Settings**
   - Click on "Settings" tab
   - Go to "Environment Variables"

3. **Add These Variables**
   ```
   VITE_API_BASE_URL=https://journeydrop.onrender.com
   VITE_USE_COOKIE_AUTH=true
   ```

4. **Save and Redeploy**
   - Click "Save"
   - Vercel will automatically trigger a new deployment

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add VITE_API_BASE_URL production
# Enter: https://journeydrop.onrender.com

vercel env add VITE_USE_COOKIE_AUTH production
# Enter: true

# Redeploy
vercel --prod
```

---

## 🔍 Verification Steps

### 1. Check Build Logs
After redeployment:
1. Go to Vercel Dashboard
2. Click on your project
3. Check the latest deployment logs
4. Look for any build errors

### 2. Test the Frontend
1. Visit your deployed frontend URL
2. Open browser DevTools (F12)
3. Go to Network tab
4. Try to register/signup
5. **IMPORTANT**: Check if API calls go to `https://journeydrop.onrender.com` (NOT localhost)

### 3. Check Environment Variables
Add this to your browser console:
```javascript
console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
console.log('Cookie Auth:', import.meta.env.VITE_USE_COOKIE_AUTH);
```

---

## 🚨 Common Issues

### Still calling localhost?
1. **Environment variables not set** - Double-check Vercel dashboard
2. **Browser cache** - Clear cache or try incognito mode
3. **Build not triggered** - Manually trigger redeployment in Vercel

### Build fails?
1. Check if `client/.env.production` exists locally
2. Ensure `VITE_API_BASE_URL` is set correctly
3. Check build logs in Vercel dashboard

---

## 🎯 Success Criteria
- [ ] Vercel environment variables are set
- [ ] Frontend rebuilds successfully
- [ ] Registration API calls go to `https://journeydrop.onrender.com`
- [ ] No localhost references in Network tab
- [ ] User can successfully register

---

## 📞 Need Help?
If registration still calls localhost after Vercel setup:
1. Check Vercel build logs
2. Verify environment variables are set correctly
3. Test in incognito mode
4. Let me know what you see in the Network tab