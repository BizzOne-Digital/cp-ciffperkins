import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import SectionTitle from '../components/common/SectionTitle'
import Button from '../components/common/Button'
import { CardSkeletonGrid } from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'
import ErrorState from '../components/common/ErrorState'
import useApiData from '../hooks/useApiData'
import getIcon from '../utils/iconMap'

export default function Services() {
  useDocumentMeta('Services', 'Booking options for Cliff Perkins — concerts, speaking engagements, and more.')
  const { data, loading, error, retry } = useApiData('/services')
  const services = data || []

  return (
    <>
      <section className="bg-espresso py-20">
        <div className="container-px mx-auto max-w-5xl text-center">
          <span className="text-softgold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            Book Cliff
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ivory">
            Services &amp; Engagements
          </h1>
        </div>
      </section>

      <section className="bg-ivory section-py">
        <div className="container-px mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Bring the Experience"
            title="What Cliff Offers"
            subtitle="Every engagement is tailored to the room — from intimate gatherings to full-scale productions."
          />

          {loading && <CardSkeletonGrid count={6} />}
          {!loading && error && <ErrorState message={error} onRetry={retry} />}
          {!loading && !error && services.length === 0 && (
            <EmptyState title="Services coming soon" message="Check back soon for booking options." />
          )}
          {!loading && !error && services.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = getIcon(service.icon)
                return (
                  <motion.div
                    key={service._id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="border border-gold/20 rounded-md p-8 bg-cream hover:shadow-lg transition-shadow"
                  >
                    <Icon size={32} className="text-gold mb-5" aria-hidden="true" />
                    <h3 className="text-xl font-heading font-semibold text-espresso mb-3">
                      {service.title || service.name}
                    </h3>
                    <p className="text-charcoal/70 text-sm leading-relaxed mb-2">{service.description}</p>
                    {service.priceRange && (
                      <span className="text-xs uppercase tracking-wide font-semibold text-warmbrown">
                        {service.priceRange}
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          )}

          <div className="flex justify-center mt-14">
            <Button to="/booking" icon={ArrowRight} iconPosition="right" size="lg">
              Request a Booking
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
