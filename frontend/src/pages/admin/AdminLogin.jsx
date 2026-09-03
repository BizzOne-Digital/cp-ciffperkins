import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, ShieldCheck } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useToast } from '../../context/ToastContext'
import Logo from '../../components/common/Logo'

export default function AdminLogin() {
  useDocumentMeta('Admin Login', 'Log in to the Cliff Perkins admin dashboard.')
  const { login, getErrorMessage } = useAdminAuth()
  const { success } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(form.email, form.password)
      success('Welcome back.')
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, 'Invalid credentials.'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-sm border border-cream/20 bg-espresso/60 px-4 py-3 text-sm text-ivory placeholder:text-cream/40 focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-softgold mb-1.5'

  return (
    <section className="min-h-screen bg-darkbg flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo variant="light" className="h-10 w-auto" />
        </div>
        <div className="bg-espresso border border-gold/20 rounded-md p-8 shadow-2xl">
          <div className="flex justify-center mb-4">
            <ShieldCheck size={32} className="text-gold" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-heading font-bold text-ivory text-center mb-1">Admin Access</h1>
          <p className="text-sm text-cream/60 text-center mb-8">Sign in to manage the site.</p>

          {error && (
            <div role="alert" className="mb-5 rounded-sm border border-red-400/40 bg-red-900/30 text-red-200 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label htmlFor="password" className={labelClass}>Password</label>
              <input id="password" type="password" required value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className={inputClass} />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60 transition-colors"
            >
              <LogIn size={18} aria-hidden="true" />
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
