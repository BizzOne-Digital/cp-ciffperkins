import React from 'react'
import { Inbox } from 'lucide-react'

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  message = 'Check back soon.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-gold/20 rounded-md bg-espresso/5">
      <Icon size={36} className="text-gold mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-espresso mb-1">{title}</h3>
      <p className="text-sm text-charcoal/60 max-w-sm">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
