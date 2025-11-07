# 🚀 Deployment Checklist - Registration Fix

## ✅ Frontend Deployment (Vercel/Netlify)

### 1. Environment Variables (Set in your deployment platform)
```env
VITE_API_BASE_URL=https://journeydrop.onrender.com
VITE_USE_COOKIE_AUTH=true
```

### 2. Rebuild & Redeploy Frontend
```bash
cd client
npm install
npm run build:prod
```

### 3. Verify Build Output
- Check that the built files contain the correct API URL
- Deploy the new build to your hosting platform

---

## ✅ Backend Deployment (Render/Railway)

### 1. Environment Variables (Set in your deployment platform)
```env
NODE_ENV=production
JWT_SECRET=38e5821f062c6768653b8f6956b642bdbd9ae0556cc8ce9d0f38310243f6641f215ce18dc40ee91513359a914d1e2c19cfef9b3d2296045609f16779795f208f
CLIENT_URL=https://your-frontend-domain.vercel.app
MONGO_URI=mongodb+srv://codernikk:nikk%401974@cluster0.nskn2hi.mongodb.net/JourneyDrop?retryWrites=true&w=majority
PORT=5000
```

### 2. Redeploy Backend
- Push your code changes to your repository
- Trigger a new deployment in your hosting platform
- Check deployment logs for any errors

---

## 🔍 Verification Steps

### 1. Test Health Endpoint
```bash
curl https://your-backend-domain.com/api/health
```

### 2. Check Environment (Backend)
```bash
curl https://your-backend-domain.com/api/health
# Should show server running in production mode
```

### 3. Test Registration
- Open browser dev tools (F12)
- Go to Network tab
- Try to register
- Check if API calls go to `https://journeydrop.onrender.com/api/auth/register` (NOT localhost)

### 4. Check for CORS Errors
- Look for CORS errors in browser console
- If CORS errors, verify `CLIENT_URL` matches your frontend domain exactly

---

## 🚨 Common Issues

### Still calling localhost?
1. **Frontend not rebuilt** - Redeploy frontend with new env vars
2. **Browser cache** - Clear cache or try incognito mode
3. **CDN cache** - Purge cache on your hosting platform

### CORS errors?
1. **CLIENT_URL mismatch** - Ensure backend CLIENT_URL exactly matches frontend domain
2. **Missing protocol** - Include `https://` (not just domain.com)
3. **Trailing slash** - Don't include trailing slash in CLIENT_URL

### Registration fails?
1. **Check backend logs** - Look for JWT or database errors
2. **Verify MongoDB** - Ensure connection string works
3. **Test manually** - Use curl or Postman to test `/api/auth/register` directly

---

## 🎯 Success Criteria
- [ ] Registration API calls go to deployed backend (not localhost)
- [ ] No CORS errors in browser console
- [ ] User can successfully register
- [ ] JWT token is stored in httpOnly cookie
- [ ] Login works after registration