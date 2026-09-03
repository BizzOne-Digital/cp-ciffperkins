import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import Logo from '../common/Logo'
import { api } from '../../utils/api'

const QUICK_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/booking', label: 'Booking' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    let mounted = true
    api
      .get('/settings')
      .then((res) => {
        if (mounted) setSettings(res.data?.data || null)
      })
      .catch(() => {
        if (mounted) setSettings(null)
      })
    return () => {
      mounted = false
    }
  }, [])

  const email = settings?.contactEmail || 'booking@cliffperkins.com'
  const phone = settings?.contactPhone || '(555) 010-2024'
  const address = settings?.address || 'Nashville, Tennessee'

  return (
    <footer className="bg-cream border-t border-gold/20">
      <div className="container-px mx-auto max-w-7xl py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Logo className="h-9 w-auto mb-4" />
          <p className="text-sm text-charcoal/70 max-w-xs">
            Author. Musician. Speaker. Building a legacy of soul, story, and song.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-warmbrown mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-charcoal/70 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-warmbrown mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-charcoal/70">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold shrink-0" aria-hidden="true" />
              <a href={`mailto:${email}`} className="hover:text-gold">{email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold shrink-0" aria-hidden="true" />
              <a href={`tel:${phone}`} className="hover:text-gold">{phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-gold shrink-0" aria-hidden="true" />
              <span>{address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-warmbrown mb-4">
            Follow
          </h4>
          <div className="flex gap-4">
            <a href={settings?.facebookUrl || '#'} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-espresso hover:text-gold">
              <Facebook size={20} />
            </a>
            <a href={settings?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-espresso hover:text-gold">
              <Instagram size={20} />
            </a>
            <a href={settings?.youtubeUrl || '#'} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-espresso hover:text-gold">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/20 py-6 container-px mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-charcoal/60">© 2026 Cliff Perkins. All Rights Reserved.</p>
        <p className="font-script text-xl text-warmbrown">Made with Soul.</p>
      </div>
    </footer>
  )
}
