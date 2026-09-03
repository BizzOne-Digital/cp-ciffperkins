import React, { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import { adminApi, getErrorMessage } from '../../utils/api'
import { useToast } from '../../context/ToastContext'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'

const TABS = [
  { key: 'hero', label: 'Hero' },
  { key: 'about', label: 'About' },
  { key: 'stats', label: 'Stats' },
  { key: 'footer', label: 'Footer' },
  { key: 'finalCta', label: 'Final CTA' },
]

const inputClass = 'w-full rounded-sm border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso focus:border-gold outline-none'
const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-warmbrown mb-1.5'

function HeroFields({ value, onChange }) {
  return (
    <div className="space-y-5">
      {['eyebrow', 'title', 'subtitle', 'quote', 'signature'].map((field) => (
        <div key={field}>
          <label htmlFor={field} className={labelClass}>{field}</label>
          <input id={field} value={value[field] || ''} onChange={(e) => onChange({ ...value, [field]: e.target.value })} className={inputClass} />
        </div>
      ))}
      <div>
        <label htmlFor="description" className={labelClass}>description</label>
        <textarea id="description" rows={4} value={value.description || ''} onChange={(e) => onChange({ ...value, description: e.target.value })} className={inputClass} />
      </div>
    </div>
  )
}

function AboutFields({ value, onChange }) {
  return (
    <div>
      <label htmlFor="body" className={labelClass}>body</label>
      <textarea id="body" rows={10} value={value.body || ''} onChange={(e) => onChange({ ...value, body: e.target.value })} className={inputClass} />
    </div>
  )
}

function StatsFields({ value, onChange }) {
  const stats = Array.isArray(value) ? value : []
  const update = (i, key, val) => {
    const next = [...stats]
    next[i] = { ...next[i], [key]: val }
    onChange(next)
  }
  const addStat = () => onChange([...stats, { label: '', value: '' }])
  const removeStat = (i) => onChange(stats.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-4">
      {stats.map((stat, i) => (
        <div key={i} className="flex gap-3 items-end">
          <div className="flex-1">
            <label className={labelClass}>Value</label>
            <input value={stat.value || ''} onChange={(e) => update(i, 'value', e.target.value)} className={inputClass} />
          </div>
          <div className="flex-1">
            <label className={labelClass}>Label</label>
            <input value={stat.label || ''} onChange={(e) => update(i, 'label', e.target.value)} className={inputClass} />
          </div>
          <button type="button" onClick={() => removeStat(i)} className="text-red-500 text-xs font-semibold px-3 py-3">Remove</button>
        </div>
      ))}
      <button type="button" onClick={addStat} className="text-xs font-semibold text-gold border border-gold px-4 py-2 rounded-sm hover:bg-gold hover:text-espresso">
        + Add Stat
      </button>
    </div>
  )
}

function FooterFields({ value, onChange }) {
  return (
    <div className="space-y-5">
      {['contactEmail', 'contactPhone', 'address', 'facebookUrl', 'instagramUrl', 'youtubeUrl'].map((field) => (
        <div key={field}>
          <label htmlFor={field} className={labelClass}>{field}</label>
          <input id={field} value={value[field] || ''} onChange={(e) => onChange({ ...value, [field]: e.target.value })} className={inputClass} />
        </div>
      ))}
    </div>
  )
}

function FinalCtaFields({ value, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="title" className={labelClass}>title</label>
        <input id="title" value={value.title || ''} onChange={(e) => onChange({ ...value, title: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label htmlFor="subtitle" className={labelClass}>subtitle</label>
        <input id="subtitle" value={value.subtitle || ''} onChange={(e) => onChange({ ...value, subtitle: e.target.value })} className={inputClass} />
      </div>
    </div>
  )
}

const TAB_COMPONENTS = {
  hero: HeroFields,
  about: AboutFields,
  stats: StatsFields,
  footer: FooterFields,
  finalCta: FinalCtaFields,
}

export default function WebsiteContent() {
  useDocumentMeta('Website Content', 'Edit the content shown across the public site.')
  const [activeTab, setActiveTab] = useState('hero')
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const { success, error: toastError } = useToast()

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError('')
    adminApi
      .get('/content')
      .then((res) => {
        if (mounted) setValues(res.data?.data || {})
      })
      .catch((err) => {
        if (mounted) setError(getErrorMessage(err, 'Could not load website content.'))
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await adminApi.put(`/content/${activeTab}`, { value: values[activeTab] ?? (activeTab === 'stats' ? [] : {}) })
      success('Content updated.')
    } catch (err) {
      toastError(getErrorMessage(err, 'Could not save this content.'))
    } finally {
      setSaving(false)
    }
  }

  const ActiveComponent = TAB_COMPONENTS[activeTab]
  const activeValue = values[activeTab] ?? (activeTab === 'stats' ? [] : {})

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-espresso mb-6">Website Content</h1>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-gold/20">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-semibold uppercase tracking-wide border-b-2 -mb-px ${
              activeTab === tab.key ? 'border-gold text-espresso' : 'border-transparent text-charcoal/50 hover:text-espresso'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && <Loader rows={5} />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && (
        <div className="bg-ivory border border-gold/20 rounded-md p-6 max-w-2xl">
          <ActiveComponent value={activeValue} onChange={(next) => setValues((v) => ({ ...v, [activeTab]: next }))} />
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-3 rounded-sm hover:bg-softgold disabled:opacity-60"
          >
            <Save size={16} aria-hidden="true" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  )
}
