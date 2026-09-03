import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  useDocumentMeta('Login', 'Log in to your Cliff Perkins account.')
  const { login, getErrorMessage } = useAuth()
  const { success } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(form.email, form.password)
      success('Welcome back!')
      navigate(location.state?.from?.pathname || '/customer/dashboard', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, 'Invalid email or password.'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <section className="bg-cream min-h-[calc(100vh-80px)] flex items-center section-py">
      <div className="container-px mx-auto max-w-md w-full">
        <div className="bg-ivory border border-gold/20 rounded-md p-8 shadow-sm">
          <h1 className="text-2xl font-heading font-bold text-espresso mb-2 text-center">Welcome Back</h1>
          <p className="text-sm text-charcoal/60 text-center mb-8">Log in to manage your bookings and profile.</p>

          {error && (
            <div role="alert" className="mb-5 rounded-sm border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="password" className={labelClass}>Password</label>
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs font-semibold text-warmbrown hover:text-gold">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60 transition-colors"
            >
              <LogIn size={18} aria-hidden="true" />
              {submitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="text-sm text-center text-charcoal/60 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-gold hover:text-warmbrown">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
