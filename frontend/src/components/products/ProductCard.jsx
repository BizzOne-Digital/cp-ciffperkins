import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, ExternalLink } from 'lucide-react'
import PlaceholderImage from '../common/PlaceholderImage'

export default function ProductCard({ product }) {
  const {
    title,
    name,
    type,
    price,
    image: imageObj,
    coverImage,
    imageUrl,
    amazonUrl,
    cdBabyUrl,
    externalUrl,
    description,
  } = product || {}

  const displayName = title || name || 'Untitled'
  const image = imageObj?.url || coverImage || imageUrl
  const buyUrl = amazonUrl || cdBabyUrl || externalUrl

  const buyLabel = amazonUrl ? 'Buy on Amazon' : cdBabyUrl ? 'Buy on CD Baby' : 'View Product'

  return (
    <motion.div
      className="group flex flex-col bg-ivory border border-gold/20 rounded-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      whileHover={{ scale: 1.01 }}
    >
      <div className="aspect-[3/4.6] overflow-hidden">
        <PlaceholderImage
          src={image}
          alt={displayName}
          label={type === 'cd' ? 'Album Art' : 'Book Cover'}
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 flex flex-col p-5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-warmbrown mb-1">
          {type === 'cd' ? 'Music' : type === 'book' ? 'Book' : type || 'Product'}
        </span>
        <h3 className="text-lg font-heading font-semibold text-espresso mb-2">{displayName}</h3>
        {description && (
          <p className="text-sm text-charcoal/60 line-clamp-2 mb-4">{description}</p>
        )}
        <div className="mt-auto pt-3 border-t border-gold/10 space-y-2">
          {price != null && (
            <span className="block text-gold font-semibold">${Number(price).toFixed(2)}</span>
          )}
          {buyUrl ? (
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-espresso hover:text-gold leading-snug"
            >
              <ShoppingBag size={14} className="shrink-0" aria-hidden="true" />
              <span>{buyLabel}</span>
              <ExternalLink size={12} className="shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <span className="text-xs text-charcoal/40">Coming soon</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
