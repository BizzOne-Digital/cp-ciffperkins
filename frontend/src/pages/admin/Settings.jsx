import React, { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'

const FIELDS = [
  ['businessName', 'Business Name'],
  ['email', 'Contact Email'],
  ['phone', 'Contact Phone'],
  ['amazonStoreUrl', 'Amazon Store URL'],
  ['cdBabyUrl', 'CD Baby URL'],
  ['websiteUrl', 'Website URL'],
  ['facebook', 'Facebook URL'],
  ['instagram', 'Instagram URL'],
  ['youtube', 'YouTube URL'],
  ['spotify', 'Spotify URL'],
]

const SEO_FIELDS = [
  ['siteTitle', 'Site Title'],
  ['metaDescription', 'Meta Description'],
  ['keywords', 'Keywords'],
]

export default function Settings() {
  useDocumentMeta('Settings', 'Manage global site settings.')
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const { success, error: toastError } = useToast()

  useEffect(() => {
    let mounted = true
    adminApi
      .get('/settings')
      .then((res) => {
        if (mounted) setForm(res.data?.data || {})
      })
      .catch((err) => {
        if (mounted) setError(getErrorMessage(err, 'Could not load settings.'))
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await adminApi.put('/settings', form)
      success('Settings updated.')
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not save settings.'))
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none'
  const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Settings</h1>

      {loading && <Loader rows={5} />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && (
        <form onSubmit={handleSubmit} className="bg-ivory border border-gold/20 rounded-md p-6 max-w-xl space-y-5">
          {FIELDS.map(([key, label]) => (
            <div key={key}>
              <label htmlFor={key} className={labelClass}>{label}</label>
              <input id={key} value={form[key] || ''} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className={inputClass} />
            </div>
          ))}

          <div className="pt-4 border-t border-gold/20">
            <span className="block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-4">SEO</span>
            <div className="space-y-5">
              {SEO_FIELDS.map(([key, label]) => (
                <div key={key}>
                  <label htmlFor={`seo-${key}`} className={labelClass}>{label}</label>
                  <input
                    id={`seo-${key}`}
                    value={form.seo?.[key] || ''}
                    onChange={(e) => setForm((f) => ({ ...f, seo: { ...f.seo, [key]: e.target.value } }))}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60"
          >
            <Save size={16} aria-hidden="true" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      )}
    </div>
  )
}
