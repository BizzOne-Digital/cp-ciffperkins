import React from 'react'
import { ImageOff } from 'lucide-react'

/**
 * When `src` is provided, renders the real image (e.g. an admin-uploaded
 * photo). Otherwise renders a clearly-labeled gold-framed placeholder so the
 * layout communicates exactly where real photography will go, and that it is
 * trivially replaceable via the admin dashboard.
 */
export default function PlaceholderImage({ src, alt, label = 'Photo', className = '', ratio = 'aspect-[4/5]' }) {
  if (src) {
    return <img src={src} alt={alt || label} className={`object-cover w-full h-full ${className}`} />
  }

  return (
    <div className={`placeholder-frame ${ratio} w-full ${className}`} role="img" aria-label={`${label} placeholder image`}>
      <ImageOff size={28} className="text-gold/70 mb-2" aria-hidden="true" />
      <span className="text-xs uppercase tracking-widest font-semibold text-warmbrown/80">{label}</span>
      <span className="text-[10px] mt-1 text-warmbrown/50">Replace via Admin</span>
    </div>
  )
}
