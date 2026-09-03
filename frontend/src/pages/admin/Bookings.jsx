import React, { useState } from 'react'
import { Search, Eye } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled']

function BookingDetailModal({ booking, onClose, onUpdated }) {
  const [status, setStatus] = useState(booking?.status || 'pending')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { success, error: toastError } = useToast()

  const handleStatusUpdate = async () => {
    setSubmitting(true)
    try {
      await adminApi.put(`/bookings/${booking._id}/status`, { status })
      success('Status updated.')
      onUpdated?.()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not update status.'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddNote = async () => {
    if (!note.trim()) return
    setSubmitting(true)
    try {
      await adminApi.post(`/bookings/${booking._id}/notes`, { note })
      setNote('')
      success('Note added.')
      onUpdated?.()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not add note.'))
    } finally {
      setSubmitting(false)
    }
  }

  if (!booking) return null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="block text-xs font-semibold text-warmbrown uppercase">Name</span>{booking.firstName} {booking.lastName}</div>
        <div><span className="block text-xs font-semibold text-warmbrown uppercase">Email</span>{booking.email}</div>
        <div><span className="block text-xs font-semibold text-warmbrown uppercase">Phone</span>{booking.phone || '—'}</div>
        <div><span className="block text-xs font-semibold text-warmbrown uppercase">Event Type</span>{booking.eventType}</div>
        <div><span className="block text-xs font-semibold text-warmbrown uppercase">Event Date</span>{booking.eventDate ? new Date(booking.eventDate).toLocaleDateString() : '—'}</div>
        <div><span className="block text-xs font-semibold text-warmbrown uppercase">Venue</span>{booking.venueName || '—'}</div>
      </div>
      {booking.message && (
        <div>
          <span className="block text-xs font-semibold text-warmbrown uppercase mb-1">Message</span>
          <p className="text-sm text-charcoal/80 whitespace-pre-line">{booking.message}</p>
        </div>
      )}

      <div className="border-t border-gold/20 pt-5">
        <label htmlFor="status" className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5">
          Update Status
        </label>
        <div className="flex gap-3">
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="flex-1 rounded-sm border border-espresso/20 bg-ivory px-4 py-2.5 text-sm">
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button onClick={handleStatusUpdate} disabled={submitting} className="bg-gold text-espresso font-semibold uppercase text-xs px-4 rounded-sm hover:bg-softgold disabled:opacity-60">
            Update
          </button>
        </div>
      </div>

      <div className="border-t border-gold/20 pt-5">
        <label htmlFor="note" className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5">
          Add Internal Note
        </label>
        <div className="flex gap-3">
          <input id="note" value={note} onChange={(e) => setNote(e.target.value)} className="flex-1 rounded-sm border border-espresso/20 bg-ivory px-4 py-2.5 text-sm" />
          <button onClick={handleAddNote} disabled={submitting} className="bg-espresso text-ivory font-semibold uppercase text-xs px-4 rounded-sm hover:bg-brown disabled:opacity-60">
            Add
          </button>
        </div>
        {booking.notes?.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
            {booking.notes.map((n, i) => (
              <li key={i} className="border-b border-gold/10 pb-2">{typeof n === 'string' ? n : n.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function Bookings() {
  useDocumentMeta('Manage Bookings', 'Manage booking requests.')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const query = new URLSearchParams()
  if (status) query.set('status', status)
  if (search) query.set('search', search)
  const { data, loading, error, retry } = useAdminApiData(`/bookings?${query.toString()}`, { deps: [status, search] })
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Bookings</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-sm border border-espresso/20 bg-ivory text-sm"
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-sm border border-espresso/20 bg-ivory px-4 py-2.5 text-sm">
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <DataTable
        loading={loading}
        error={error}
        onRetry={retry}
        rows={data}
        emptyMessage="No booking requests match your filters."
        columns={[
          { key: 'firstName', label: 'Name', render: (r) => `${r.firstName || ''} ${r.lastName || ''}`.trim() || '—' },
          { key: 'eventType', label: 'Event Type' },
          { key: 'eventDate', label: 'Date', render: (r) => (r.eventDate ? new Date(r.eventDate).toLocaleDateString() : '—') },
          { key: 'status', label: 'Status', render: (r) => <span className="text-xs uppercase font-semibold text-warmbrown">{r.status || 'pending'}</span> },
          {
            key: 'actions',
            label: 'Actions',
            render: (r) => (
              <button aria-label="View booking" onClick={() => setSelected(r)} className="text-gold hover:text-warmbrown">
                <Eye size={16} />
              </button>
            ),
          },
        ]}
      />

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Booking Details" maxWidth="max-w-2xl">
        <BookingDetailModal booking={selected} onClose={() => setSelected(null)} onUpdated={retry} />
      </Modal>
    </div>
  )
}
