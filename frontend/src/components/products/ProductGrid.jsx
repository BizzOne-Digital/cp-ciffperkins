import React from 'react'
import ProductCard from './ProductCard'
import { CardSkeletonGrid } from '../common/Loader'
import EmptyState from '../common/EmptyState'
import ErrorState from '../common/ErrorState'
import { PackageSearch } from 'lucide-react'

export default function ProductGrid({ products, loading, error, onRetry }) {
  if (loading) return <CardSkeletonGrid count={6} />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        message="Check back soon — new books and music are on the way."
      />
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  )
}
