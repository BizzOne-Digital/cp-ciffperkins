import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Save } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import ImageUploader from '../../components/admin/ImageUploader'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

const emptyEvent = { year: '', title: '', description: '', image: '' }

function TimelineForm({ event, onSaved, onCancel }) {
  const [form, setForm] = useState({
    ...emptyEvent,
    ...event,
    image: event?.image?.url || '',
  })
  const [submitting, setSubmitting] = useState(false)
  const { success, error: toastError } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => formData.append(key, value ?? ''))
      if (event?._id) {
        await adminApi.put(`/timeline/${event._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await adminApi.post('/timeline', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      success('Timeline event saved.')
      onSaved?.()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not save this event.'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ImageUploader value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} folder="timeline" label="Photo (optional)" />
      <div>
        <label htmlFor="year" className={labelClass}>Year *</label>
        <input id="year" required value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor="title" className={labelClass}>Title *</label>
        <input id="title" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" rows={4} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inputClass} />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60">
          <Save size={16} aria-hidden="true" />
          {submitting ? 'Saving...' : 'Save Event'}
        </button>
        {onCancel && <button type="button" onClick={onCancel} className="text-sm font-semibold text-charcoal/60 hover:text-espresso px-4">Cancel</button>}
      </div>
    </form>
  )
}

export default function Timeline() {
  useDocumentMeta('Manage Timeline', 'Manage the Cliff Perkins journey timeline.')
  const { data, loading, error, retry } = useAdminApiData('/timeline')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { success, error: toastError } = useToast()

  const handleDelete = async (evt) => {
    if (!window.confirm(`Delete "${evt.title}"?`)) return
    try {
      await adminApi.delete(`/timeline/${evt._id}`)
      success('Event deleted.')
      retry()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not delete this event.'))
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-espresso">Journey / Timeline</h1>
        <button onClick={() => { setEditing(null); setModalOpen(true) }} className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-5 py-2.5 rounded-sm hover:bg-softgold">
          <Plus size={16} aria-hidden="true" /> Add Event
        </button>
      </div>

      <DataTable
        loading={loading}
        error={error}
        onRetry={retry}
        rows={data}
        emptyMessage="Add your first milestone."
        columns={[
          { key: 'year', label: 'Year', sortable: true },
          { key: 'title', label: 'Title' },
          {
            key: 'actions',
            label: 'Actions',
            render: (r) => (
              <div className="flex gap-3">
                <button aria-label="Edit event" onClick={() => { setEditing(r); setModalOpen(true) }} className="text-gold hover:text-warmbrown"><Pencil size={16} /></button>
                <button aria-label="Delete event" onClick={() => handleDelete(r)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
            ),
          },
        ]}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Event' : 'Add Event'}>
        <TimelineForm event={editing} onSaved={() => { setModalOpen(false); retry() }} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}
