import React, { useState } from 'react'
import { KeyRound } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function AccountSettings() {
  useDocumentMeta('Account Settings', 'Manage your Cliff Perkins account security.')
  const { changePassword, getErrorMessage } = useAuth()
  const { success, error: toastError } = useToast()

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.newPassword !== form.confirmPassword) {
      toastError('New passwords do not match.')
      return
    }
    setSubmitting(true)
    try {
      await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword })
      success('Password updated successfully.')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not update your password.'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Account Settings</h1>

      <form onSubmit={handleSubmit} className="bg-ivory border border-gold/20 rounded-md p-6 space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-warmbrown mb-1">Change Password</h2>
        <div>
          <label htmlFor="currentPassword" className={labelClass}>Current Password</label>
          <input id="currentPassword" type="password" required value={form.currentPassword} onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))} className={inputClass} />
        </div>
        <div>
          <label htmlFor="newPassword" className={labelClass}>New Password</label>
          <input id="newPassword" type="password" required value={form.newPassword} onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))} className={inputClass} />
        </div>
        <div>
          <label htmlFor="confirmPassword" className={labelClass}>Confirm New Password</label>
          <input id="confirmPassword" type="password" required value={form.confirmPassword} onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))} className={inputClass} />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60"
        >
          <KeyRound size={16} aria-hidden="true" />
          {submitting ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}
