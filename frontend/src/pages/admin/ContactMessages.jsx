import React from 'react'
import { Check, Trash2 } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import DataTable from '../../components/admin/DataTable'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

export default function ContactMessages() {
  useDocumentMeta('Contact Messages', 'Messages submitted through the contact form.')
  const { data, loading, error, retry } = useAdminApiData('/contact')
  const { success, error: toastError } = useToast()

  const markRead = async (msg) => {
    try {
      await adminApi.put(`/contact/${msg._id}/read`)
      retry()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not update this message.'))
    }
  }

  const handleDelete = async (msg) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await adminApi.delete(`/contact/${msg._id}`)
      success('Message deleted.')
      retry()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not delete this message.'))
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Contact Messages</h1>

      <DataTable
        loading={loading}
        error={error}
        onRetry={retry}
        rows={data}
        emptyMessage="No contact messages yet."
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email' },
          { key: 'subject', label: 'Subject' },
          { key: 'read', label: 'Status', render: (r) => (r.read ? 'Read' : 'Unread') },
          {
            key: 'actions',
            label: 'Actions',
            render: (r) => (
              <div className="flex gap-3">
                {!r.read && (
                  <button aria-label="Mark as read" onClick={() => markRead(r)} className="text-gold hover:text-warmbrown">
                    <Check size={16} />
                  </button>
                )}
                <button aria-label="Delete message" onClick={() => handleDelete(r)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}
