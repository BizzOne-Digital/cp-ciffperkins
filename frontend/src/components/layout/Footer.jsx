import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, Phone, Globe } from 'lucide-react'
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

  const email = settings?.email || 'soulg192@aol.com'
  const phone = settings?.phone || '201-920-1021'
  const website = settings?.websiteUrl || ''

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
              <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-gold">{phone}</a>
            </li>
            {website && (
              <li className="flex items-center gap-2">
                <Globe size={16} className="text-gold shrink-0" aria-hidden="true" />
                <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-gold break-all">
                  {website.replace(/^https?:\/\//, '')}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-warmbrown mb-4">
            Follow
          </h4>
          <div className="flex gap-4">
            <a href={settings?.facebook || '#'} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-espresso hover:text-gold">
              <Facebook size={20} />
            </a>
            <a href={settings?.instagram || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-espresso hover:text-gold">
              <Instagram size={20} />
            </a>
            <a href={settings?.youtube || '#'} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-espresso hover:text-gold">
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
