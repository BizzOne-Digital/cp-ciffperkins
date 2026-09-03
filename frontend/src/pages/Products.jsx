import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta'
import SectionTitle from '../components/common/SectionTitle'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilters from '../components/products/ProductFilters'
import { api, getErrorMessage } from '../utils/api'

export default function Products() {
  useDocumentMeta('Products', 'Shop books and music by Cliff Perkins.')
  const [searchParams, setSearchParams] = useSearchParams()
  const activeType = searchParams.get('type') || ''

  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const query = activeType ? `?type=${activeType}` : ''
      const res = await api.get(`/products${query}`)
      setProducts(res.data?.data || [])
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to load products right now.'))
    } finally {
      setLoading(false)
    }
  }, [activeType])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <>
      <section className="bg-espresso py-20">
        <div className="container-px mx-auto max-w-5xl text-center">
          <span className="text-softgold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            The Collection
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ivory">
            Books &amp; Music
          </h1>
        </div>
      </section>

      <section className="bg-cream section-py">
        <div className="container-px mx-auto max-w-[100rem]">
          <SectionTitle
            eyebrow="Shop"
            title="Every Book. Every Album."
            subtitle="All purchases are completed securely through Amazon and CD Baby."
          />
          <ProductFilters activeType={activeType} onChange={(type) => setSearchParams(type ? { type } : {})} />
          <ProductGrid products={products} loading={loading} error={error} onRetry={fetchProducts} />
        </div>
      </section>
    </>
  )
}
