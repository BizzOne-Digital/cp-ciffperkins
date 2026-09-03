import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Music } from 'lucide-react'
import Button from '../common/Button'
import { api } from '../../utils/api'

const FALLBACK = {
  eyebrow: 'THIS IS A GREAT PLACE TO BE!',
  title: 'Cliff Perkins',
  subtitle: 'Author. Musician. Inspiration.',
  description:
    'For over four decades, Cliff Perkins has turned lived experience into stories, songs, and sermons that move rooms and change lives. Explore the books, the music, and the man behind the legacy.',
  quote: 'Every story worth telling starts with a soul willing to be honest.',
  signature: 'Cliff Perkins',
}

function HeroText({ content, fullWidthButtons }) {
  return (
    <>
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-block text-softgold text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-6"
      >
        {content.eyebrow}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl sm:text-6xl md:text-7xl font-bold text-ivory leading-[1.05] mb-4"
      >
        {content.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="font-script text-3xl sm:text-4xl text-softgold mb-6"
      >
        {content.subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-cream/80 text-base sm:text-lg max-w-lg mb-10"
      >
        {content.description}
      </motion.p>

      <motion.div
        className={`flex flex-wrap gap-4 ${fullWidthButtons ? 'flex-col sm:flex-row' : ''}`}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
        }}
      >
        <motion.div
          className={fullWidthButtons ? 'w-full' : ''}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
        >
          <Button
            to="/products?type=book"
            icon={BookOpen}
            variant="primary"
            size="lg"
            className={fullWidthButtons ? 'w-full' : ''}
          >
            Shop Books
          </Button>
        </motion.div>
        <motion.div
          className={fullWidthButtons ? 'w-full' : ''}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
        >
          <Button
            to="/products?type=cd"
            icon={Music}
            variant="outline"
            size="lg"
            className={`!text-ivory !border-ivory/50 hover:!bg-ivory hover:!text-espresso ${fullWidthButtons ? 'w-full' : ''}`}
          >
            Buy CDs
          </Button>
        </motion.div>
      </motion.div>
    </>
  )
}

export default function Hero() {
  const [content, setContent] = useState(FALLBACK)

  useEffect(() => {
    let mounted = true
    api
      .get('/content/hero')
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
    <section className="relative bg-espresso overflow-hidden">
      {/* Mobile: full-bleed image up top, text overlapping into the fade below */}
      <div className="sm:hidden relative">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative h-[52vh] min-h-[320px] overflow-hidden"
        >
          <img
            src="/hero.png"
            alt="Cliff Perkins performing on stage"
            className="w-full h-full object-cover object-[58%_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-espresso/10 to-espresso" />
        </motion.div>
        <div className="relative -mt-16 px-6 pb-14">
          <HeroText content={content} fullWidthButtons />
        </div>
      </div>

      {/* Desktop / tablet: cinematic full-bleed background */}
      <div className="hidden sm:block relative min-h-[85vh]">
        <div
          className="absolute inset-0 bg-cover bg-[position:75%_center]"
          style={{ backgroundImage: "url('/hero.png')" }}
          role="img"
          aria-label="Cliff Perkins performing on stage"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/70 to-transparent" />
        <div className="relative w-full h-full flex items-center px-12 lg:px-20 py-20">
          <div className="max-w-xl">
            <HeroText content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}
