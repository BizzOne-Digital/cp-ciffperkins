import React from 'react'

export default function StatCard({ icon: Icon, label, value, trend }) {
  return (
    <div className="bg-ivory border border-gold/20 rounded-md p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
        {Icon && <Icon size={20} className="text-gold" aria-hidden="true" />}
      </div>
      <div className="min-w-0">
        <span className="block text-2xl font-heading font-bold text-espresso">{value ?? '—'}</span>
        <span className="block text-xs uppercase tracking-wide text-charcoal/50 font-semibold truncate">{label}</span>
        {trend && <span className="text-xs text-warmbrown">{trend}</span>}
      </div>
    </div>
  )
}
