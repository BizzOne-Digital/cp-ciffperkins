import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import Logo from '../common/Logo'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/booking', label: 'Booking' },
  { to: '/contact', label: 'Contact' },
]

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[998] bg-espresso/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 z-[999] h-full w-[80vw] max-w-sm bg-ivory shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
              <Logo className="h-8 w-auto" />
              <button aria-label="Close menu" onClick={onClose} className="text-espresso">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-8 gap-6">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `text-lg font-semibold ${isActive ? 'text-gold' : 'text-espresso'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/booking"
                onClick={onClose}
                className="mt-4 text-center bg-gold text-espresso font-semibold uppercase tracking-wide text-sm py-3 rounded-sm"
              >
                Book Cliff
              </NavLink>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
