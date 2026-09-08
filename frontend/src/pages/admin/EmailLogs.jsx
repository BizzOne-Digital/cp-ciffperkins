import React, { useState } from 'react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import DataTable from '../../components/admin/DataTable'

const STATUS_STYLES = {
  sent: 'text-green-700 bg-green-50 border-green-200',
  failed: 'text-red-700 bg-red-50 border-red-200',
  skipped: 'text-warmbrown bg-cream border-gold/30',
}

export default function EmailLogs() {
  useDocumentMeta('Email Logs', 'History of every email the site has tried to send.')
  const [status, setStatus] = useState('')
  const { data, loading, error, retry } = useAdminApiData(`/admin/email-logs${status ? `?status=${status}` : ''}`, {
    deps: [status],
  })

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Email Logs</h1>

      <div className="flex gap-3 mb-6">
        {[
          { value: '', label: 'All' },
          { value: 'sent', label: 'Sent' },
          { value: 'failed', label: 'Failed' },
          { value: 'skipped', label: 'Skipped' },
        ].map((t) => (
          <button
            key={t.value}
            onClick={() => setStatus(t.value)}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wide border ${
              status === t.value ? 'bg-gold text-espresso border-gold' : 'bg-ivory text-espresso border-gold/30'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <DataTable
        loading={loading}
        error={error}
        onRetry={retry}
        rows={data}
        emptyMessage="No email activity yet."
        columns={[
          { key: 'createdAt', label: 'When', render: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString() : '—') },
          { key: 'to', label: 'To' },
          { key: 'subject', label: 'Subject' },
          {
            key: 'status',
            label: 'Status',
            render: (r) => (
              <span className={`inline-block text-xs font-semibold uppercase px-2 py-0.5 rounded-sm border ${STATUS_STYLES[r.status] || ''}`}>
                {r.status}
              </span>
            ),
          },
          { key: 'error', label: 'Error', render: (r) => r.error || '—' },
        ]}
      />
    </div>
  )
}
