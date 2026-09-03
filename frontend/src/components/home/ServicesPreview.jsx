import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import { CardSkeletonGrid } from '../common/Loader'
import EmptyState from '../common/EmptyState'
import ErrorState from '../common/ErrorState'
import useApiData from '../../hooks/useApiData'
import getIcon from '../../utils/iconMap'

export default function ServicesPreview() {
  const { data, loading, error, retry } = useApiData('/services')
  const services = (data || []).slice(0, 3)

  return (
    <section className="bg-espresso section-py">
      <div className="container-px mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="What Cliff Offers"
          title="Services &amp; Engagements"
          dark
          subtitle="From intimate house concerts to full auditorium keynotes, Cliff brings story and song to every stage."
        />

        {loading && <CardSkeletonGrid count={3} />}
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
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border border-gold/20 rounded-md p-8 bg-espresso/40 hover:bg-espresso/60 transition-colors"
                >
                  <Icon size={32} className="text-gold mb-5" aria-hidden="true" />
                  <h3 className="text-xl font-heading font-semibold text-ivory mb-3">
                    {service.title || service.name}
                  </h3>
                  <p className="text-cream/70 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Button to="/services" variant="outline" icon={ArrowRight} iconPosition="right" className="!text-ivory !border-ivory/50 hover:!bg-ivory hover:!text-espresso">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  )
}
