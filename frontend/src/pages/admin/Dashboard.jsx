import React from 'react'
import { Package, CalendarDays, Users, Mail } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import StatCard from '../../components/admin/StatCard'
import DataTable from '../../components/admin/DataTable'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'

export default function Dashboard() {
  useDocumentMeta('Admin Dashboard', 'Cliff Perkins admin dashboard overview.')
  const { data: stats, loading: statsLoading, error: statsError, retry: retryStats } = useAdminApiData('/admin/stats')
  const { data: dashboard, loading, error, retry } = useAdminApiData('/admin/dashboard')

  const recentBookings = dashboard?.recentBookings || []
  const recentMessages = dashboard?.recentMessages || []

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Dashboard</h1>

      {statsLoading && <Loader rows={2} className="mb-8" />}
      {!statsLoading && statsError && <ErrorState message={statsError} onRetry={retryStats} />}
      {!statsLoading && !statsError && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={Package} label="Products" value={stats?.products?.total ?? stats?.totalProducts} />
          <StatCard icon={CalendarDays} label="Bookings" value={stats?.bookings?.total ?? stats?.totalBookings} />
          <StatCard icon={Users} label="Customers" value={stats?.customers ?? stats?.totalCustomers} />
          <StatCard icon={Mail} label="Messages" value={stats?.messages?.total ?? stats?.totalMessages} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-espresso mb-4">Recent Bookings</h2>
          <DataTable
            loading={loading}
            error={error}
            onRetry={retry}
            emptyMessage="No bookings have come in yet."
            rows={recentBookings}
            columns={[
              { key: 'firstName', label: 'Name', render: (r) => `${r.firstName || ''} ${r.lastName || ''}`.trim() || '—' },
              { key: 'eventType', label: 'Event' },
              { key: 'status', label: 'Status', render: (r) => <span className="text-xs uppercase font-semibold text-warmbrown">{r.status || 'pending'}</span> },
            ]}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-espresso mb-4">Recent Messages</h2>
          <DataTable
            loading={loading}
            error={error}
            onRetry={retry}
            emptyMessage="No contact messages yet."
            rows={recentMessages}
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'subject', label: 'Subject' },
              { key: 'read', label: 'Status', render: (r) => (r.read ? 'Read' : 'Unread') },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
