import axios from 'axios'

// Base URL from env; fallback to localhost
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// If using httpOnly cookie auth, ensure credentials are sent
const useCookieAuth = (import.meta.env.VITE_USE_COOKIE_AUTH || 'true') === 'true'

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: useCookieAuth,
})

export default api


