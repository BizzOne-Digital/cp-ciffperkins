import React from 'react'
import SectionTitle from '../common/SectionTitle'
import ProductGrid from '../products/ProductGrid'
import Button from '../common/Button'
import useApiData from '../../hooks/useApiData'
import { ArrowRight } from 'lucide-react'

export default function MusicSection() {
  const { data, loading, error, retry } = useApiData('/products?type=cd')
  const albums = (data || []).slice(0, 3)

  return (
    <section className="bg-darkbg section-py">
      <div className="container-px mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Sound &amp; Soul"
          title="Music by Cliff Perkins"
          dark
          subtitle="Albums rooted in gospel, blues, and soul — songs written from the heart."
        />
        <ProductGrid products={albums} loading={loading} error={error} onRetry={retry} />
        <div className="flex justify-center mt-12">
          <Button to="/products?type=cd" variant="outline" icon={ArrowRight} iconPosition="right" className="!text-ivory !border-ivory/50 hover:!bg-ivory hover:!text-espresso">
            View All Music
          </Button>
        </div>
      </div>
    </section>
  )
}
