import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Logo from '../common/Logo'
import MobileMenu from './MobileMenu'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/booking', label: 'Booking' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-ivory/95 backdrop-blur border-b border-gold/20 transition-all duration-300 ${
          scrolled ? 'py-2 shadow-sm' : 'py-4'
        }`}
      >
        <div className="container-px mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" aria-label="Cliff Perkins home">
            <Logo className={`w-auto transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-semibold uppercase tracking-wide transition-colors ${
                    isActive ? 'text-gold' : 'text-espresso hover:text-warmbrown'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/booking"
              className="bg-gold text-espresso font-semibold uppercase tracking-wide text-sm px-6 py-2.5 rounded-sm hover:bg-softgold transition-colors"
            >
              Book Cliff
            </Link>
          </div>

          <button
            className="lg:hidden text-espresso"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
