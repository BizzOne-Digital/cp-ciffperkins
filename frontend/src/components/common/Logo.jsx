import React from 'react'

/**
 * Inline SVG logo for Cliff Perkins — signature-style wordmark with a small
 * treble-clef accent. Works on light backgrounds ("dark" text) and dark
 * backgrounds ("light" text) via the `variant` prop.
 */
export default function Logo({ variant = 'dark', className = '' }) {
  const textColor = variant === 'light' ? '#F8F2E8' : '#241008'
  const goldColor = '#C58A32'

  return (
    <svg
      viewBox="0 0 220 48"
      className={className}
      role="img"
      aria-label="Cliff Perkins"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8c-3 1-5 4-5 8 0 3 1.5 5 3 7-3 2-6 5-6 10 0 6 5 10 11 10 4 0 7-2 9-5"
        fill="none"
        stroke={goldColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="34" r="2.6" fill={goldColor} />
      <text
        x="34"
        y="31"
        fontFamily="'Playfair Display', serif"
        fontSize="21"
        fontWeight="700"
        fill={textColor}
        letterSpacing="0.5"
      >
        Cliff Perkins
      </text>
      <line x1="34" y1="38" x2="205" y2="38" stroke={goldColor} strokeWidth="1" />
    </svg>
  )
}
