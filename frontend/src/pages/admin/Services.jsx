import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Save } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

const emptyService = { title: '', description: '', icon: '', priceRange: '' }

function ServiceForm({ service, onSaved, onCancel }) {
  const [form, setForm] = useState({ ...emptyService, ...service })
  const [submitting, setSubmitting] = useState(false)
  const { success, error: toastError } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (service?._id) {
        await adminApi.put(`/services/${service._id}`, form)
      } else {
        await adminApi.post('/services', form)
      }
      success('Service saved.')
      onSaved?.()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not save this service.'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className={labelClass}>Title *</label>
        <input id="title" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" rows={4} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor="icon" className={labelClass}>Icon Keyword (e.g. mic, book, music, church)</label>
        <input id="icon" value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor="priceRange" className={labelClass}>Price Range</label>
        <input id="priceRange" value={form.priceRange} onChange={(e) => setForm((f) => ({ ...f, priceRange: e.target.value }))} className={inputClass} />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60">
          <Save size={16} aria-hidden="true" />
          {submitting ? 'Saving...' : 'Save Service'}
        </button>
        {onCancel && <button type="button" onClick={onCancel} className="text-sm font-semibold text-charcoal/60 hover:text-espresso px-4">Cancel</button>}
      </div>
    </form>
  )
}

export default function Services() {
  useDocumentMeta('Manage Services', 'Manage booking services and engagement types.')
  const { data, loading, error, retry } = useAdminApiData('/services')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { success, error: toastError } = useToast()

  const handleDelete = async (svc) => {
    if (!window.confirm(`Delete "${svc.title}"?`)) return
    try {
      await adminApi.delete(`/services/${svc._id}`)
      success('Service deleted.')
      retry()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not delete this service.'))
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-espresso">Services</h1>
        <button
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
          className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-5 py-2.5 rounded-sm hover:bg-softgold"
        >
          <Plus size={16} aria-hidden="true" /> Add Service
        </button>
      </div>

      <DataTable
        loading={loading}
        error={error}
        onRetry={retry}
        rows={data}
        emptyMessage="Add your first service offering."
        columns={[
          { key: 'title', label: 'Title', sortable: true },
          { key: 'priceRange', label: 'Price Range' },
          {
            key: 'actions',
            label: 'Actions',
            render: (r) => (
              <div className="flex gap-3">
                <button aria-label="Edit service" onClick={() => { setEditing(r); setModalOpen(true) }} className="text-gold hover:text-warmbrown">
                  <Pencil size={16} />
                </button>
                <button aria-label="Delete service" onClick={() => handleDelete(r)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
            ),
          },
        ]}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'}>
        <ServiceForm service={editing} onSaved={() => { setModalOpen(false); retry() }} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}
