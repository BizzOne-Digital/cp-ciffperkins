import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { KeyRound, CheckCircle2 } from 'lucide-react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useAuth } from '../context/AuthContext'

export default function ResetPassword() {
  useDocumentMeta('Reset Password', 'Set a new password for your Cliff Perkins account.')
  const { resetPassword, getErrorMessage } = useAuth()
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setSubmitting(true)
    try {
      await resetPassword(token, password)
      setSubmitted(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not reset your password. The link may have expired.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-cream min-h-[calc(100vh-80px)] flex items-center section-py">
      <div className="container-px mx-auto max-w-md w-full">
        <div className="bg-ivory border border-gold/20 rounded-md p-8 shadow-sm">
          <h1 className="text-2xl font-heading font-bold text-espresso mb-2 text-center">Set New Password</h1>

          {submitted ? (
            <div className="flex flex-col items-center text-center py-6">
              <CheckCircle2 size={40} className="text-gold mb-3" aria-hidden="true" />
              <p className="text-charcoal/70 text-sm">Password updated. Redirecting you to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 mt-6" noValidate>
              {error && (
                <div role="alert" className="rounded-sm border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60 transition-colors"
              >
                <KeyRound size={18} aria-hidden="true" />
                {submitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          <p className="text-sm text-center text-charcoal/60 mt-6">
            <Link to="/login" className="font-semibold text-gold hover:text-warmbrown">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
