import React from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import BookingForm from '../components/booking/BookingForm'

export default function Booking() {
  useDocumentMeta('Booking', 'Request to book Cliff Perkins for your next event.')

  return (
    <>
      <section className="bg-espresso py-20">
        <div className="container-px mx-auto max-w-5xl text-center">
          <span className="text-softgold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            Let's Work Together
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ivory mb-4">
            Book Cliff Perkins
          </h1>
          <p className="text-cream/70 max-w-xl mx-auto">
            Tell us about your event and our team will follow up with availability and pricing.
          </p>
        </div>
      </section>

      <section className="bg-ivory section-py">
        <div className="container-px mx-auto max-w-3xl">
          <BookingForm />

          <div className="mt-14 border-t border-gold/20 pt-10 text-center">
            <span className="block text-softgold text-xs font-semibold tracking-[0.25em] uppercase mb-2">
              Booking Contact
            </span>
            <p className="text-lg font-heading font-semibold text-espresso mb-1">Cliff Perkins</p>
            <p className="text-sm text-charcoal/60 mb-3">ITP Management (In The Pocket Management)</p>
            <p className="text-sm text-charcoal/70">
              <a href="mailto:soulg192@aol.com" className="hover:text-gold">soulg192@aol.com</a>
              <span className="mx-2 text-charcoal/30">·</span>
              <a href="tel:2019201021" className="hover:text-gold">201-920-1021</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
