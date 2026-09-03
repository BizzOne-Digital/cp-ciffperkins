import React from 'react'

const TYPES = [
  { value: '', label: 'All' },
  { value: 'book', label: 'Books' },
  { value: 'cd', label: 'Music (CDs)' },
]

export default function ProductFilters({ activeType, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-10 justify-center" role="tablist" aria-label="Filter products by type">
      {TYPES.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={activeType === t.value}
          onClick={() => onChange(t.value)}
          className={`px-5 py-2 rounded-sm text-sm font-semibold uppercase tracking-wide border transition-colors ${
            activeType === t.value
              ? 'bg-gold text-espresso border-gold'
              : 'bg-transparent text-espresso border-gold/30 hover:border-gold'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
