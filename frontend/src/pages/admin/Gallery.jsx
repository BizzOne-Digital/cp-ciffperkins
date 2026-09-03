import React, { useState } from 'react'
import { Trash2, Save } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import useAdminApiData from '../../hooks/useAdminApiData'
import ImageUploader from '../../components/admin/ImageUploader'
import PlaceholderImage from '../../components/common/PlaceholderImage'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import ErrorState from '../../components/common/ErrorState'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'

export default function Gallery() {
  useDocumentMeta('Manage Gallery', 'Upload and manage gallery photos.')
  const [category, setCategory] = useState('')
  const { data, loading, error, retry } = useAdminApiData(`/gallery${category ? `?category=${category}` : ''}`, {
    deps: [category],
  })
  const { success, error: toastError } = useToast()
  const [uploadCategory, setUploadCategory] = useState('')

  const handleUploaded = () => {
    success('Photos uploaded.')
    retry()
  }

  const handleDelete = async (item) => {
    if (!window.confirm('Delete this photo?')) return
    try {
      await adminApi.delete(`/gallery/${item._id}`)
      success('Photo deleted.')
      retry()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not delete this photo.'))
    }
  }

  const handleOrderChange = async (item, value) => {
    try {
      await adminApi.put(`/gallery/${item._id}`, { displayOrder: Number(value) })
      retry()
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not update display order.'))
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Gallery</h1>

      <div className="bg-ivory border border-gold/20 rounded-md p-6 mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-warmbrown mb-4">Upload New Photos</h2>
        <div className="mb-4 max-w-xs">
          <label htmlFor="uploadCategory" className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5">
            Category
          </label>
          <input
            id="uploadCategory"
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            placeholder="e.g. concerts, studio, events"
            className="w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-2.5 text-sm"
          />
        </div>
        <ImageUploader
          multiple
          label="Gallery Photos"
          folder={`gallery/${uploadCategory || 'general'}`}
          endpoint="/gallery"
          onUploadMultiple={handleUploaded}
        />
      </div>

      <div className="flex gap-3 mb-6">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Filter by category..."
          className="rounded-sm border border-espresso/20 bg-ivory px-4 py-2.5 text-sm max-w-xs"
        />
      </div>

      {loading && <Loader rows={4} />}
      {!loading && error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && (!data || data.length === 0) && (
        <EmptyState title="No photos yet" message="Upload photos above to build your gallery." />
      )}
      {!loading && !error && data && data.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.map((item) => (
            <div key={item._id} className="bg-ivory border border-gold/20 rounded-md overflow-hidden">
              <PlaceholderImage src={item.image?.url} alt={item.caption || 'Gallery photo'} label="Gallery Photo" ratio="aspect-square" />
              <div className="p-3 space-y-2">
                <span className="block text-xs text-charcoal/60 truncate">{item.category || 'uncategorized'}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={item.displayOrder ?? 0}
                    onBlur={(e) => handleOrderChange(item, e.target.value)}
                    aria-label="Display order"
                    className="w-16 rounded-sm border border-espresso/20 px-2 py-1 text-xs"
                  />
                  <button aria-label="Delete photo" onClick={() => handleDelete(item)} className="ml-auto text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
