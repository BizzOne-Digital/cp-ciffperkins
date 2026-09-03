import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import { api } from '../../utils/api'

const FALLBACK = {
  title: 'Ready to Bring Cliff Perkins to Your Stage?',
  subtitle: 'Books to read. Songs to feel. A story worth booking.',
}

export default function FinalCTA() {
  const [content, setContent] = useState(FALLBACK)

  useEffect(() => {
    let mounted = true
    api
      .get('/content/finalCta')
      .then((res) => {
        const data = res.data?.data
        if (mounted && data) setContent({ ...FALLBACK, ...data })
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="relative bg-darkbg section-py overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,#C58A32_0,transparent_55%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative container-px mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-ivory mb-4">{content.title}</h2>
        <p className="text-cream/70 mb-8">{content.subtitle}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button to="/products" variant="primary" size="lg">Shop Now</Button>
          <Button to="/booking" variant="outline" size="lg" className="!text-ivory !border-ivory/50 hover:!bg-ivory hover:!text-espresso">
            Book Cliff
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
