import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, CalendarCheck } from 'lucide-react'
import Button from '../common/Button'
import PlaceholderImage from '../common/PlaceholderImage'
import useApiData from '../../hooks/useApiData'
import getIcon from '../../utils/iconMap'

const FALLBACK_SERVICES = [
  { title: 'Author & Storyteller', icon: 'BookOpen' },
  { title: 'Recording Artist', icon: 'Disc3' },
  { title: 'Motivational Speaker', icon: 'Mic2' },
  { title: 'Live Performances', icon: 'Music' },
  { title: 'Music & Book Sales', icon: 'ShoppingBag' },
]

const EVENT_TYPES = [
  'Concerts & Shows',
  'Speaking Engagements',
  'Private Events',
  'Book Signings',
]

export default function ServicesBooking() {
  const { data } = useApiData('/services')
  const services = (data && data.length ? data : FALLBACK_SERVICES).slice(0, 5)

  return (
    <section className="relative bg-espresso section-py overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_15%_20%,#C58A32_0,transparent_45%)]" />
      <div className="relative container-px mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1fr] gap-10 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-softgold text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ivory mb-2">What I Offer</h2>
          <span className="block h-px w-14 bg-gold mb-6" />

          <ul className="space-y-3 mb-8">
            {services.map((service, i) => {
              const Icon = getIcon(service.icon)
              return (
                <li key={service._id || i} className="flex items-center gap-3 text-cream/85 text-sm sm:text-base">
                  <Icon size={16} className="text-gold shrink-0" aria-hidden="true" />
                  <span>{service.title || service.name}</span>
                </li>
              )
            })}
          </ul>

          <Button to="/services" variant="primary" icon={ArrowRight} iconPosition="right">
            Learn More
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-gold/30 rounded-md p-2"
        >
          <PlaceholderImage
            src="/offer.png"
            alt="Cliff Perkins performing live"
            label="Cliff Performing"
            ratio="aspect-[3/4]"
            className="rounded-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="block text-softgold text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Book Cliff
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ivory mb-2">Book for Your Event</h2>
          <span className="block h-px w-14 bg-gold mb-6" />

          <p className="text-cream/70 text-sm sm:text-base mb-6">
            Looking for inspiration, music, or an unforgettable experience?
          </p>

          <ul className="space-y-3 mb-8">
            {EVENT_TYPES.map((type) => (
              <li key={type} className="flex items-center gap-3 text-cream/85 text-sm sm:text-base">
                <CheckCircle2 size={16} className="text-gold shrink-0" aria-hidden="true" />
                <span>{type}</span>
              </li>
            ))}
          </ul>

          <Button to="/booking" variant="primary" icon={CalendarCheck}>
            Book Cliff Now
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
