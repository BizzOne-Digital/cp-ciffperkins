import React, { useRef, useState } from 'react'
import { UploadCloud, X } from 'lucide-react'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'
import PlaceholderImage from '../common/PlaceholderImage'

/**
 * Drag/drop or click-to-upload image field. Uploads immediately to /upload
 * (or a custom endpoint) and reports the resulting URL back to the parent.
 */
export default function ImageUploader({
  value,
  onChange,
  folder = 'general',
  label = 'Image',
  multiple = false,
  onUploadMultiple,
  endpoint = '/upload',
}) {
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)
  const { error: toastError } = useToast()

  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      if (multiple && onUploadMultiple) {
        const formData = new FormData()
        Array.from(files).forEach((file) => formData.append('images', file))
        formData.append('folder', folder)
        const res = await adminApi.post(endpoint, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        onUploadMultiple(res.data?.data)
      } else {
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('folder', folder)
        const res = await adminApi.post(endpoint, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        onChange?.(res.data?.data?.url || res.data?.url)
      }
    } catch (err) {
      toastError(getErrorMessage(err, 'Image upload failed.'))
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    uploadFiles(e.dataTransfer.files)
  }

  return (
    <div>
      <span className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5">{label}</span>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-md p-6 cursor-pointer transition-colors ${
          dragOver ? 'border-gold bg-gold/5' : 'border-espresso/20 hover:border-gold/60'
        }`}
        role="button"
        tabIndex={0}
        aria-label={`Upload ${label}`}
      >
        {value && !multiple ? (
          <div className="w-full max-w-[180px] aspect-square relative">
            <PlaceholderImage src={value} alt={label} ratio="aspect-square" />
            <button
              type="button"
              aria-label="Remove image"
              onClick={(e) => {
                e.stopPropagation()
                onChange?.('')
              }}
              className="absolute -top-2 -right-2 bg-espresso text-ivory rounded-full p-1"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <UploadCloud size={28} className="text-gold" aria-hidden="true" />
            <p className="text-xs text-charcoal/60 text-center">
              {uploading ? 'Uploading...' : 'Drag & drop or click to upload'}
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => uploadFiles(e.target.files)}
        />
      </div>
    </div>
  )
}
