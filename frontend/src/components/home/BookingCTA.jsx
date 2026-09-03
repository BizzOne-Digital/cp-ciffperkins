import React from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck } from 'lucide-react'
import Button from '../common/Button'

export default function BookingCTA() {
  return (
    <section className="relative bg-brown section-py overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_30%,#C58A32_0,transparent_50%)]" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative container-px mx-auto max-w-4xl text-center"
      >
        <CalendarCheck size={40} className="text-gold mx-auto mb-6" aria-hidden="true" />
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory mb-4">
          Bring Cliff To Your Next Event
        </h2>
        <p className="text-cream/80 max-w-xl mx-auto mb-8">
          Concerts, book signings, speaking engagements, and ministry events — let's create a moment
          your audience won't forget.
        </p>
        <Button to="/booking" size="lg">Start a Booking Request</Button>
      </motion.div>
    </section>
  )
}
