import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const initialState = { firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' }

export default function Register() {
  useDocumentMeta('Register', 'Create your Cliff Perkins account.')
  const { register, getErrorMessage } = useAuth()
  const { success } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setSubmitting(true)
    try {
      const { confirmPassword, ...payload } = form
      await register(payload)
      success('Account created! Welcome.')
      navigate('/customer/dashboard', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, 'Could not create your account.'))
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
          <h1 className="text-2xl font-heading font-bold text-espresso mb-2 text-center">Create Account</h1>
          <p className="text-sm text-charcoal/60 text-center mb-8">Join to track your bookings and profile.</p>

          {error && (
            <div role="alert" className="mb-5 rounded-sm border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelClass}>First Name</label>
                <input id="firstName" name="firstName" required value={form.firstName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Last Name</label>
                <input id="lastName" name="lastName" required value={form.lastName} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="password" className={labelClass}>Password</label>
              <input id="password" type="password" name="password" required value={form.password} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
              <input id="confirmPassword" type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} className={inputClass} />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60 transition-colors"
            >
              <UserPlus size={18} aria-hidden="true" />
              {submitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-center text-charcoal/60 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-gold hover:text-warmbrown">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
