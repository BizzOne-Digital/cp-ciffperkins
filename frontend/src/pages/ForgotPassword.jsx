import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle2 } from 'lucide-react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { useAuth } from '../context/AuthContext'

export default function ForgotPassword() {
  useDocumentMeta('Forgot Password', 'Reset your Cliff Perkins account password.')
  const { forgotPassword, getErrorMessage } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await forgotPassword(email)
      setSubmitted(true)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not process your request.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-cream min-h-[calc(100vh-80px)] flex items-center section-py">
      <div className="container-px mx-auto max-w-md w-full">
        <div className="bg-ivory border border-gold/20 rounded-md p-8 shadow-sm">
          <h1 className="text-2xl font-heading font-bold text-espresso mb-2 text-center">Reset Password</h1>
          <p className="text-sm text-charcoal/60 text-center mb-8">
            Enter your email and we'll send you a reset link.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center text-center py-6">
              <CheckCircle2 size={40} className="text-gold mb-3" aria-hidden="true" />
              <p className="text-charcoal/70 text-sm">
                If an account exists for that email, a reset link is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {error && (
                <div role="alert" className="rounded-sm border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60 transition-colors"
              >
                <Mail size={18} aria-hidden="true" />
                {submitting ? 'Sending...' : 'Send Reset Link'}
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
