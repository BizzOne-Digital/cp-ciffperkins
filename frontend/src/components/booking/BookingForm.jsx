import React, { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { api, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

const EVENT_TYPES = [
  'Concert',
  'Book Signing',
  'Speaking Engagement',
  'Corporate Event',
  'Private Party',
  'Church / Ministry Event',
  'Festival',
  'Other',
]

const AUDIENCE_SIZES = ['Under 50', '50-100', '100-300', '300-500', '500-1000', '1000+']

const BUDGET_RANGES = ['Under $1,000', '$1,000-$2,500', '$2,500-$5,000', '$5,000-$10,000', '$10,000+']

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organization: '',
  eventType: '',
  eventDate: '',
  preferredTime: '',
  venueName: '',
  venueAddress: '',
  city: '',
  state: '',
  audienceSize: '',
  budgetRange: '',
  message: '',
}

export default function BookingForm() {
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const { success } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await api.post('/bookings', form)
      setSubmitted(true)
      success('Your booking request has been sent!')
    } catch (err) {
      setError(getErrorMessage(err, 'Could not submit your request. Please try again.'))
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-16 px-6 border border-gold/30 rounded-md bg-espresso/5">
        <CheckCircle2 size={48} className="text-gold mb-4" aria-hidden="true" />
        <h3 className="text-2xl font-heading font-semibold text-espresso mb-2">Request Received</h3>
        <p className="text-charcoal/70 max-w-md">
          Thank you for reaching out. Our team will review your event details and get back to you
          within 2-3 business days.
        </p>
        <button
          onClick={() => {
            setForm(initialState)
            setSubmitted(false)
          }}
          className="mt-6 text-sm font-semibold text-gold border border-gold px-5 py-2 rounded-sm hover:bg-gold hover:text-espresso"
        >
          Submit another request
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso placeholder:text-charcoal/40 focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {error && (
        <div role="alert" className="rounded-sm border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <legend className="sr-only">Contact information</legend>
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name *</label>
          <input id="firstName" name="firstName" required value={form.firstName} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name *</label>
          <input id="lastName" name="lastName" required value={form.lastName} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="organization" className={labelClass}>Organization</label>
          <input id="organization" name="organization" value={form.organization} onChange={handleChange} className={inputClass} />
        </div>
      </fieldset>

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <legend className="sr-only">Event details</legend>
        <div>
          <label htmlFor="eventType" className={labelClass}>Event Type *</label>
          <select id="eventType" name="eventType" required value={form.eventType} onChange={handleChange} className={inputClass}>
            <option value="">Select an event type</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className={labelClass}>Event Date *</label>
          <input id="eventDate" type="date" name="eventDate" required value={form.eventDate} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="preferredTime" className={labelClass}>Preferred Time</label>
          <input id="preferredTime" type="time" name="preferredTime" value={form.preferredTime} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="audienceSize" className={labelClass}>Expected Audience Size</label>
          <select id="audienceSize" name="audienceSize" value={form.audienceSize} onChange={handleChange} className={inputClass}>
            <option value="">Select a range</option>
            {AUDIENCE_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="venueName" className={labelClass}>Venue Name</label>
          <input id="venueName" name="venueName" value={form.venueName} onChange={handleChange} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="venueAddress" className={labelClass}>Venue Address</label>
          <input id="venueAddress" name="venueAddress" value={form.venueAddress} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>City</label>
          <input id="city" name="city" value={form.city} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="state" className={labelClass}>State</label>
          <input id="state" name="state" value={form.state} onChange={handleChange} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="budgetRange" className={labelClass}>Budget Range</label>
          <select id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={handleChange} className={inputClass}>
            <option value="">Select a range</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={labelClass}>Tell us about your event</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={inputClass}
          placeholder="Share any details that will help us prepare a great experience..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-8 py-4 rounded-sm hover:bg-softgold disabled:opacity-60 transition-colors"
      >
        <Send size={18} aria-hidden="true" />
        {submitting ? 'Submitting...' : 'Submit Booking Request'}
      </button>
    </form>
  )
}
