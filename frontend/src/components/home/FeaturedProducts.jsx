import React from 'react'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import ProductGrid from '../products/ProductGrid'
import useApiData from '../../hooks/useApiData'
import { ArrowRight } from 'lucide-react'

export default function FeaturedProducts() {
  const { data, loading, error, retry } = useApiData('/products?featured=true')

  return (
    <section className="bg-cream section-py">
      <div className="container-px mx-auto max-w-[100rem]">
        <SectionTitle
          eyebrow="From the Collection"
          title="Featured Books &amp; Music"
          subtitle="A hand-picked selection of the stories and songs that define Cliff's journey."
        />
        <ProductGrid products={data} loading={loading} error={error} onRetry={retry} />
        <div className="flex justify-center mt-12">
          <Button to="/products" variant="outline" icon={ArrowRight} iconPosition="right">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
