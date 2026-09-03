import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Loader from '../common/Loader'
import ErrorState from '../common/ErrorState'
import useApiData from '../../hooks/useApiData'

export default function Testimonials() {
  const { data, loading, error, retry } = useApiData('/testimonials')
  const items = data || []
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

  if (!loading && !error && items.length === 0) return null

  return (
    <section className="bg-espresso section-py">
      <div className="container-px mx-auto max-w-3xl text-center">
        <SectionTitle eyebrow="What People Say" title="Testimonials" dark />

        {loading && <Loader rows={3} />}
        {!loading && error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && items.length > 0 && (
          <div className="relative">
            <Quote className="mx-auto text-gold/40 mb-4" size={40} aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-ivory text-lg md:text-xl italic leading-relaxed mb-6">
                  &ldquo;{items[index].review || items[index].quote}&rdquo;
                </p>
                <span className="block text-softgold font-semibold">{items[index].name}</span>
                {items[index].role && (
                  <span className="block text-cream/60 text-sm">{items[index].role}</span>
                )}
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <div className="flex justify-center gap-4 mt-8">
                <button aria-label="Previous testimonial" onClick={prev} className="text-gold hover:text-softgold">
                  <ChevronLeft size={24} />
                </button>
                <button aria-label="Next testimonial" onClick={next} className="text-gold hover:text-softgold">
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
