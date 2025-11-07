import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const { login, useCookieAuth } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form)
      toast.success('Logged in successfully')
      navigate('/')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6">Log in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" name="email" value={form.email} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" name="password" value={form.password} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <button disabled={loading} className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 disabled:opacity-50">
          {loading ? 'Signing in...' : 'Log in'}
        </button>
      </form>
      <div className="mt-4 text-sm flex justify-between">
        <Link to="/forgot-password" className="text-primary-600">Forgot password?</Link>
        <Link to="/register" className="text-primary-600">Create account</Link>
      </div>
      <div className="mt-6 text-xs text-gray-600">
        <p><strong>Auth mode</strong>: {useCookieAuth ? 'httpOnly cookie (recommended)' : 'Bearer token in localStorage'}</p>
        {!useCookieAuth && (
          <p className="mt-1">Your token will be stored in localStorage. For best security, set VITE_USE_COOKIE_AUTH=true and enable CORS credentials on the API.</p>
        )}
      </div>
    </div>
  )
}


