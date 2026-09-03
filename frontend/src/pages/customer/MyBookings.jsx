import React from 'react'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useApiData from '../../hooks/useApiData'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import ErrorState from '../../components/common/ErrorState'

export default function MyBookings() {
  useDocumentMeta('My Bookings', 'Your booking requests with Cliff Perkins.')
  const { data, loading, error, retry } = useApiData('/bookings/mine')
  const bookings = data || []

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">My Bookings</h1>

      {loading && <Loader rows={5} />}
      {!loading && error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && bookings.length === 0 && (
        <EmptyState title="No bookings yet" message="Once you submit a booking request, it will appear here." />
      )}
      {!loading && !error && bookings.length > 0 && (
        <div className="overflow-x-auto border border-gold/20 rounded-md bg-ivory">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left border-b border-gold/20 text-warmbrown text-xs uppercase tracking-wide">
                <th className="px-4 py-3">Event Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Venue</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id || b.id} className="border-b border-gold/10 last:border-0">
                  <td className="px-4 py-3 font-medium text-espresso">{b.eventType}</td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {b.eventDate ? new Date(b.eventDate).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">{b.venueName || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs uppercase font-semibold tracking-wide text-warmbrown">
                      {b.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/customer/bookings/${b._id || b.id}`}
                      aria-label="View booking details"
                      className="text-gold hover:text-warmbrown inline-flex"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
