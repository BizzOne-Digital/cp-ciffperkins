import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import Loader from '../common/Loader'
import EmptyState from '../common/EmptyState'
import ErrorState from '../common/ErrorState'
import useApiData from '../../hooks/useApiData'

export default function JourneyPreview() {
  const { data, loading, error, retry } = useApiData('/timeline')
  const events = (data || []).slice(0, 4)

  return (
    <section className="bg-cream section-py">
      <div className="container-px mx-auto max-w-5xl">
        <SectionTitle eyebrow="The Journey" title="Milestones Along the Way" />

        {loading && <Loader rows={4} />}
        {!loading && error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && events.length === 0 && (
          <EmptyState title="Timeline coming soon" message="The story is still being written here." />
        )}
        {!loading && !error && events.length > 0 && (
          <ol className="relative border-l-2 border-gold/40 pl-8 space-y-10">
            {events.map((event, i) => (
              <motion.li
                key={event._id || i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gold border-4 border-cream" />
                <span className="text-sm font-semibold text-warmbrown uppercase tracking-wide">
                  {event.year || event.date}
                </span>
                <h3 className="text-lg font-heading font-semibold text-espresso mt-1 mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-charcoal/70">{event.description}</p>
              </motion.li>
            ))}
          </ol>
        )}

        <div className="flex justify-center mt-12">
          <Button to="/about" variant="outline" icon={ArrowRight} iconPosition="right">
            Explore the Full Journey
          </Button>
        </div>
      </div>
    </section>
  )
}
