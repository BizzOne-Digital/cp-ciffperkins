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
        </div>
      </section>
    </>
  )
}
