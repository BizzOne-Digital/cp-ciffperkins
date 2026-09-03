import React from 'react'
import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-gold text-espresso hover:bg-softgold border border-gold',
  outline: 'bg-transparent text-gold border border-gold hover:bg-gold hover:text-espresso',
  dark: 'bg-espresso text-ivory border border-espresso hover:bg-brown',
  ghost: 'bg-transparent text-current border border-current/30 hover:border-gold hover:text-gold',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm md:text-base',
  lg: 'px-8 py-4 text-base md:text-lg',
}

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase text-xs md:text-sm transition-colors duration-200 rounded-sm ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={18} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {content}
      </a>
    )
  }

  const Comp = as || 'button'
  return (
    <Comp className={classes} {...props}>
      {content}
    </Comp>
  )
}
