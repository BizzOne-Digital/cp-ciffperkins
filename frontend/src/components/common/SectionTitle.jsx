import React from 'react'
import { motion } from 'framer-motion'

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}) {
  const alignClasses = align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <motion.div
      className={`flex flex-col ${alignClasses} mb-10 md:mb-14 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {eyebrow && (
        <span
          className={`text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-3 ${
            dark ? 'text-softgold' : 'text-warmbrown'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${
          dark ? 'text-ivory' : 'text-espresso'
        }`}
      >
        {title}
      </h2>
      <span className={`block h-[2px] w-16 my-5 ${dark ? 'bg-softgold' : 'bg-gold'}`} />
      {subtitle && (
        <p className={`max-w-2xl text-base md:text-lg ${dark ? 'text-cream/80' : 'text-charcoal/70'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
