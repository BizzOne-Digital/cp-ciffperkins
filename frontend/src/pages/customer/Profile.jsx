import React, { useState } from 'react'
import { Save, User } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import PlaceholderImage from '../../components/common/PlaceholderImage'

export default function Profile() {
  useDocumentMeta('Profile', 'Manage your Cliff Perkins profile.')
  const { user, updateProfile, getErrorMessage } = useAuth()
  const { success, error: toastError } = useToast()

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '')
  const [submitting, setSubmitting] = useState(false)

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => formData.append(key, value))
      if (avatarFile) formData.append('avatar', avatarFile)
      await updateProfile(formData)
      success('Profile updated successfully.')
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not update your profile.'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Profile</h1>

      <form onSubmit={handleSubmit} className="bg-ivory border border-gold/20 rounded-md p-6 space-y-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
            <PlaceholderImage src={avatarPreview} alt="Profile avatar" label="Avatar" ratio="aspect-square" />
          </div>
          <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold border border-gold px-4 py-2 rounded-sm cursor-pointer hover:bg-gold hover:text-espresso">
            <User size={14} aria-hidden="true" />
            Change Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className={labelClass}>First Name</label>
            <input id="firstName" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>Last Name</label>
            <input id="lastName" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input id="email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone</label>
            <input id="phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputClass} />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60"
        >
          <Save size={16} aria-hidden="true" />
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
