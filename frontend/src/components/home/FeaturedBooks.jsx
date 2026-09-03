import React from 'react'
import SectionTitle from '../common/SectionTitle'
import ProductGrid from '../products/ProductGrid'
import Button from '../common/Button'
import useApiData from '../../hooks/useApiData'
import { ArrowRight } from 'lucide-react'

export default function FeaturedBooks() {
  const { data, loading, error, retry } = useApiData('/products?type=book')
  const books = (data || []).slice(0, 3)

  return (
    <section className="bg-ivory section-py">
      <div className="container-px mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="The Written Word"
          title="Books by Cliff Perkins"
          subtitle="Memoir, fiction, and reflection — stories built on lived truth."
        />
        <ProductGrid products={books} loading={loading} error={error} onRetry={retry} />
        <div className="flex justify-center mt-12">
          <Button to="/products?type=book" variant="outline" icon={ArrowRight} iconPosition="right">
            View All Books
          </Button>
        </div>
      </div>
    </section>
  )
}
