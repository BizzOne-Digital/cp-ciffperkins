import React, { useState } from 'react'
import { Save } from 'lucide-react'
import ImageUploader from '../../components/admin/ImageUploader'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

const emptyProduct = {
  name: '',
  type: 'book',
  price: '',
  description: '',
  image: '',
  amazonUrl: '',
  cdBabyUrl: '',
  externalUrl: '',
  featured: false,
  active: true,
}

export default function ProductForm({ product, onSaved, onCancel }) {
  const [form, setForm] = useState({
    ...emptyProduct,
    ...product,
    image: product?.image?.url || '',
  })
  const [submitting, setSubmitting] = useState(false)
  const { success, error: toastError } = useToast()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value)
      })
      if (product?._id) {
        await adminApi.put(`/products/${product._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await adminApi.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }
      success('Product saved successfully.')
      onSaved?.()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not save this product.'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ImageUploader
        value={form.image}
        onChange={(url) => setForm((f) => ({ ...f, image: url }))}
        folder="products"
        label={form.type === 'cd' ? 'Album Art' : 'Book Cover'}
      />

      <div>
        <label htmlFor="name" className={labelClass}>Title *</label>
        <input id="name" name="name" required value={form.name} onChange={handleChange} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className={labelClass}>Type</label>
          <select id="type" name="type" value={form.type} onChange={handleChange} className={inputClass}>
            <option value="book">Book</option>
            <option value="cd">CD / Music</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className={labelClass}>Price ($)</label>
          <input id="price" type="number" step="0.01" name="price" value={form.price} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" name="description" rows={4} value={form.description} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="amazonUrl" className={labelClass}>Amazon URL</label>
        <input id="amazonUrl" name="amazonUrl" value={form.amazonUrl} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cdBabyUrl" className={labelClass}>CD Baby URL</label>
        <input id="cdBabyUrl" name="cdBabyUrl" value={form.cdBabyUrl} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="externalUrl" className={labelClass}>Other External URL</label>
        <input id="externalUrl" name="externalUrl" value={form.externalUrl} onChange={handleChange} className={inputClass} />
      </div>

      <div className="flex gap-6">
        <label className="inline-flex items-center gap-2 text-sm text-espresso">
          <input type="checkbox" name="featured" checked={!!form.featured} onChange={handleChange} className="accent-gold" />
          Featured
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-espresso">
          <input type="checkbox" name="active" checked={!!form.active} onChange={handleChange} className="accent-gold" />
          Active
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60"
        >
          <Save size={16} aria-hidden="true" />
          {submitting ? 'Saving...' : 'Save Product'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-sm font-semibold text-charcoal/60 hover:text-espresso px-4">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
