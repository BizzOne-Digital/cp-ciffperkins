import React from 'react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import DataTable from '../../components/admin/DataTable'

export default function Customers() {
  useDocumentMeta('Customers', 'Registered customer accounts.')
  const { data, loading, error, retry } = useAdminApiData('/admin/customers', {
    transform: (raw) => raw || [],
  })

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Customers</h1>
      <DataTable
        loading={loading}
        error={error}
        onRetry={retry}
        rows={data}
        emptyMessage="No registered customers to show yet."
        columns={[
          { key: 'name', label: 'Name', render: (r) => r.name || '—' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'createdAt', label: 'Joined', render: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—') },
        ]}
      />
    </div>
  )
}
