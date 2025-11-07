import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../utils/api'

const AuthContext = createContext(null)

const useCookieAuth = (import.meta.env.VITE_USE_COOKIE_AUTH || 'true') === 'true'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const tokenKey = 'jd_token'

  const setBearerIfNeeded = (token) => {
    if (!useCookieAuth && token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  const loadUser = async () => {
    try {
      const token = localStorage.getItem(tokenKey)
      setBearerIfNeeded(token)
      const { data } = await api.get('/api/auth/me')
      setUser(data)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signup = async (payload) => {
    const { data } = await api.post('/api/auth/register', payload)
    if (!useCookieAuth && data?.token) {
      localStorage.setItem(tokenKey, data.token)
      setBearerIfNeeded(data.token)
    }
    if (data?.user) setUser(data.user)
    else await loadUser()
    return data
  }

  const login = async (payload) => {
    const { data } = await api.post('/api/auth/login', payload)
    if (!useCookieAuth && data?.token) {
      localStorage.setItem(tokenKey, data.token)
      setBearerIfNeeded(data.token)
    }
    if (data?.user) setUser(data.user)
    else await loadUser()
    return data
  }

  const logout = async () => {
    // Optional: call a logout endpoint to clear cookie on server if implemented
    localStorage.removeItem(tokenKey)
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  const forgotPassword = async (email) => {
    const { data } = await api.post('/api/auth/forgot-password', { email })
    return data
  }

  const resetPassword = async (token, password) => {
    const { data } = await api.post(`/api/auth/reset-password/${token}`, { password })
    return data
  }

  const value = useMemo(() => ({
    user,
    loading,
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    loadUser,
    useCookieAuth,
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


