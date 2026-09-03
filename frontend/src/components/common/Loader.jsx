import React from 'react'

export function Spinner({ className = '' }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin ${className}`}
    />
  )
}

export function SkeletonLine({ className = '' }) {
  return <div className={`animate-pulse bg-espresso/10 rounded ${className}`} />
}

export default function Loader({ rows = 3, className = '' }) {
  return (
    <div className={`w-full space-y-3 ${className}`} role="status" aria-label="Loading content">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonLine key={i} className="h-4 w-full" />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-md border border-gold/20 p-4 space-y-3">
      <SkeletonLine className="h-40 w-full" />
      <SkeletonLine className="h-4 w-2/3" />
      <SkeletonLine className="h-4 w-1/2" />
    </div>
  )
}

export function CardSkeletonGrid({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
