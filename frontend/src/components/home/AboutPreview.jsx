import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import PlaceholderImage from '../common/PlaceholderImage'
import { api } from '../../utils/api'

const FALLBACK = {
  body:
    'Cliff Perkins has spent a lifetime turning hard-won wisdom into words and melodies that heal. Raised on gospel harmonies and hometown grit, he built a career that spans the page and the stage — a rare voice that speaks equally through story and song. Today, Cliff continues to write, record, and perform, carrying a message of resilience, faith, and legacy to every audience he meets.',
}

export default function AboutPreview() {
  const [content, setContent] = useState(FALLBACK)

  useEffect(() => {
    let mounted = true
    api
      .get('/content/about')
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
    <section className="bg-ivory section-py">
      <div className="container-px mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <PlaceholderImage src="/who.png" alt="Cliff Perkins" label="Cliff in the Studio" ratio="aspect-[4/3]" className="rounded-md" />
        </motion.div>

        <div>
          <SectionTitle eyebrow="Who Is Cliff Perkins" title="A Life Written In Story &amp; Song" align="left" />
          <p className="text-charcoal/70 text-base md:text-lg leading-relaxed mb-8">{content.body}</p>
          <Button to="/about" variant="dark" icon={ArrowRight} iconPosition="right">
            Read Full Story
          </Button>
        </div>
      </div>
    </section>
  )
}
