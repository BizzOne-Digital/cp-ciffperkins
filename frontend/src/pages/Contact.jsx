import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { api, getErrorMessage } from '../utils/api'

const initialState = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  useDocumentMeta('Contact', 'Get in touch with the Cliff Perkins team.')
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await api.post('/contact', form)
      setSubmitted(true)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not send your message. Please try again.'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso placeholder:text-charcoal/40 focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <>
      <section className="bg-espresso py-20">
        <div className="container-px mx-auto max-w-5xl text-center">
          <span className="text-softgold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ivory">Contact</h1>
        </div>
      </section>

      <section className="bg-ivory section-py">
        <div className="container-px mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div className="flex gap-4">
              <Mail size={22} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-espresso mb-1">Email</h3>
                <p className="text-sm text-charcoal/70">booking@cliffperkins.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={22} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-espresso mb-1">Phone</h3>
                <p className="text-sm text-charcoal/70">(555) 010-2024</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin size={22} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-espresso mb-1">Based In</h3>
                <p className="text-sm text-charcoal/70">Nashville, Tennessee</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-16 px-6 border border-gold/30 rounded-md bg-espresso/5">
                <CheckCircle2 size={48} className="text-gold mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-heading font-semibold text-espresso mb-2">Message Sent</h3>
                <p className="text-charcoal/70 max-w-md">
                  Thanks for reaching out — we'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {error && (
                  <div role="alert" className="rounded-sm border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>Name *</label>
                    <input id="name" name="name" required value={form.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={labelClass}>Subject</label>
                  <input id="subject" name="subject" value={form.subject} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Message *</label>
                  <textarea id="message" name="message" required rows={6} value={form.message} onChange={handleChange} className={inputClass} />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-8 py-4 rounded-sm hover:bg-softgold disabled:opacity-60 transition-colors"
                >
                  <Send size={18} aria-hidden="true" />
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
