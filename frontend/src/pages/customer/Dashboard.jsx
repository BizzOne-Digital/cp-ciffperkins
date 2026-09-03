import React from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, ArrowRight } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useApiData from '../../hooks/useApiData'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import ErrorState from '../../components/common/ErrorState'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  useDocumentMeta('Dashboard', 'Your Cliff Perkins account dashboard.')
  const { user } = useAuth()
  const { data, loading, error, retry } = useApiData('/bookings/mine')
  const bookings = data || []

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-heading font-bold text-espresso mb-1">
        Welcome{user?.firstName ? `, ${user.firstName}` : ''}
      </h1>
      <p className="text-sm text-charcoal/60 mb-8">Here's an overview of your account.</p>

      <div className="bg-ivory border border-gold/20 rounded-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-espresso flex items-center gap-2">
            <CalendarDays size={20} className="text-gold" aria-hidden="true" />
            Recent Bookings
          </h2>
          <Link to="/customer/bookings" className="text-xs font-semibold text-warmbrown hover:text-gold inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading && <Loader rows={3} />}
        {!loading && error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && bookings.length === 0 && (
          <EmptyState title="No bookings yet" message="Once you submit a booking request, it will appear here." />
        )}
        {!loading && !error && bookings.length > 0 && (
          <ul className="divide-y divide-gold/10">
            {bookings.slice(0, 5).map((b) => (
              <li key={b._id || b.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-espresso">{b.eventType}</p>
                  <p className="text-charcoal/50">{b.eventDate ? new Date(b.eventDate).toLocaleDateString() : '—'}</p>
                </div>
                <span className="text-xs uppercase font-semibold tracking-wide text-warmbrown">
                  {b.status || 'pending'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
