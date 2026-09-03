import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useApiData from '../../hooks/useApiData'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'

const FIELDS = [
  ['firstName', 'First Name'],
  ['lastName', 'Last Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['organization', 'Organization'],
  ['eventType', 'Event Type'],
  ['eventDate', 'Event Date'],
  ['preferredTime', 'Preferred Time'],
  ['venueName', 'Venue'],
  ['venueAddress', 'Venue Address'],
  ['city', 'City'],
  ['state', 'State'],
  ['audienceSize', 'Audience Size'],
  ['budgetRange', 'Budget Range'],
  ['status', 'Status'],
]

export default function BookingDetail() {
  useDocumentMeta('Booking Details', 'Details for your booking request.')
  const { id } = useParams()
  const { data: booking, loading, error, retry } = useApiData(`/bookings/${id}`)

  return (
    <div className="max-w-3xl">
      <Link to="/customer/bookings" className="inline-flex items-center gap-1.5 text-sm text-warmbrown hover:text-gold mb-6">
        <ArrowLeft size={16} /> Back to bookings
      </Link>

      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Booking Details</h1>

      {loading && <Loader rows={6} />}
      {!loading && error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && booking && (
        <div className="bg-ivory border border-gold/20 rounded-md p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FIELDS.map(([key, label]) => (
            <div key={key}>
              <span className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1">{label}</span>
              <span className="text-sm text-charcoal/80">{booking[key] || '—'}</span>
            </div>
          ))}
          {booking.message && (
            <div className="sm:col-span-2">
              <span className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1">Message</span>
              <p className="text-sm text-charcoal/80 whitespace-pre-line">{booking.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
