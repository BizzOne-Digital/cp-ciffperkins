import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Save } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/common/Modal'
import ImageUploader from '../../components/admin/ImageUploader'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

const emptyTestimonial = { name: '', role: '', review: '', photo: '' }

function TestimonialForm({ testimonial, onSaved, onCancel }) {
  const [form, setForm] = useState({
    ...emptyTestimonial,
    ...testimonial,
    photo: testimonial?.photo?.url || '',
  })
  const [submitting, setSubmitting] = useState(false)
  const { success, error: toastError } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => formData.append(key, value ?? ''))
      if (testimonial?._id) {
        await adminApi.put(`/testimonials/${testimonial._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await adminApi.post('/testimonials', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      success('Testimonial saved.')
      onSaved?.()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not save this testimonial.'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ImageUploader value={form.photo} onChange={(url) => setForm((f) => ({ ...f, photo: url }))} folder="testimonials" label="Photo" />
      <div>
        <label htmlFor="name" className={labelClass}>Name *</label>
        <input id="name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor="role" className={labelClass}>Role / Organization</label>
        <input id="role" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor="review" className={labelClass}>Quote *</label>
        <textarea id="review" required rows={4} value={form.review} onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))} className={inputClass} />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60">
          <Save size={16} aria-hidden="true" />
          {submitting ? 'Saving...' : 'Save Testimonial'}
        </button>
        {onCancel && <button type="button" onClick={onCancel} className="text-sm font-semibold text-charcoal/60 hover:text-espresso px-4">Cancel</button>}
      </div>
    </form>
  )
}

export default function Testimonials() {
  useDocumentMeta('Manage Testimonials', 'Manage testimonials shown on the site.')
  const { data, loading, error, retry } = useAdminApiData('/testimonials')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { success, error: toastError } = useToast()

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete testimonial from "${t.name}"?`)) return
    try {
      await adminApi.delete(`/testimonials/${t._id}`)
      success('Testimonial deleted.')
      retry()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not delete this testimonial.'))
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-espresso">Testimonials</h1>
        <button onClick={() => { setEditing(null); setModalOpen(true) }} className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-5 py-2.5 rounded-sm hover:bg-softgold">
          <Plus size={16} aria-hidden="true" /> Add Testimonial
        </button>
      </div>

      <DataTable
        loading={loading}
        error={error}
        onRetry={retry}
        rows={data}
        emptyMessage="Add your first testimonial."
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'role', label: 'Role' },
          { key: 'review', label: 'Quote', render: (r) => <span className="line-clamp-1 max-w-xs inline-block">{r.review}</span> },
          {
            key: 'actions',
            label: 'Actions',
            render: (r) => (
              <div className="flex gap-3">
                <button aria-label="Edit testimonial" onClick={() => { setEditing(r); setModalOpen(true) }} className="text-gold hover:text-warmbrown"><Pencil size={16} /></button>
                <button aria-label="Delete testimonial" onClick={() => handleDelete(r)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
              </div>
            ),
          },
        ]}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <TestimonialForm testimonial={editing} onSaved={() => { setModalOpen(false); retry() }} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}
