import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Images } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import PlaceholderImage from '../common/PlaceholderImage'
import { CardSkeletonGrid } from '../common/Loader'
import EmptyState from '../common/EmptyState'
import ErrorState from '../common/ErrorState'
import useApiData from '../../hooks/useApiData'

export default function GalleryPreview() {
  const { data, loading, error, retry } = useApiData('/gallery')
  const images = (data || []).slice(0, 6)

  return (
    <section className="bg-ivory section-py">
      <div className="container-px mx-auto max-w-7xl">
        <SectionTitle eyebrow="Behind the Scenes" title="Gallery" subtitle="Moments from the stage, the studio, and the road." />

        {loading && <CardSkeletonGrid count={6} />}
        {!loading && error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && images.length === 0 && (
          <EmptyState icon={Images} title="Gallery coming soon" message="Photos from Cliff's events will appear here." />
        )}
        {!loading && !error && images.length > 0 && (
          <div className="columns-2 sm:columns-3 gap-4 space-y-4">
            {images.map((img, i) => (
              <motion.div
                key={img._id || i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="break-inside-avoid rounded-md overflow-hidden"
              >
                <PlaceholderImage
                  src={img.image?.url || img.url || img.imageUrl}
                  alt={img.caption || 'Gallery photo'}
                  label="Gallery Photo"
                  ratio="aspect-square"
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-espresso hover:text-gold"
          >
            View Full Gallery <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
