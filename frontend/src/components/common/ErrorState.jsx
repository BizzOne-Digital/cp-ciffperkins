import React from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content. Please try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-red-300/40 rounded-md bg-red-500/5">
      <AlertTriangle size={36} className="text-red-500 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-espresso mb-1">{title}</h3>
      <p className="text-sm text-charcoal/60 max-w-sm mb-5">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-warmbrown border border-gold px-4 py-2 rounded-sm"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  )
}
