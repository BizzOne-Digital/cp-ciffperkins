import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../../utils/api'

const FALLBACK = [
  { label: '40+ Years of Experience', value: '40+' },
  { label: 'Books Published', value: '6' },
  { label: 'Albums Released', value: '5' },
  { label: 'Lives Touched', value: '100K+' },
]

export default function LegacyIntro() {
  const [stats, setStats] = useState(FALLBACK)

  useEffect(() => {
    let mounted = true
    api
      .get('/content/stats')
      .then((res) => {
        const data = res.data?.data
        if (mounted && Array.isArray(data) && data.length) setStats(data)
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="bg-cream section-py">
      <div className="container-px mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className="block text-4xl md:text-5xl font-heading font-bold text-brown mb-2">
              {stat.value}
            </span>
            <span className="block h-[2px] w-10 bg-gold mx-auto mb-3" />
            <span className="text-xs md:text-sm uppercase tracking-wide text-warmbrown font-semibold">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
