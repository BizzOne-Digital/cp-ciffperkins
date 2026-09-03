import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Wrench,
  CalendarDays,
  Users,
  Images,
  Star,
  FileText,
  Mail,
  Settings,
  UserCircle,
  LogOut,
  X,
} from 'lucide-react'
import Logo from '../common/Logo'

const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/content', label: 'Website Content', icon: FileText },
  { to: '/admin/messages', label: 'Contact Messages', icon: Mail },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
  { to: '/admin/profile', label: 'Profile', icon: UserCircle },
]

export default function AdminSidebar({ onNavigate, onLogout, showClose, onClose }) {
  return (
    <div className="flex flex-col h-full bg-espresso">
      <div className="px-6 py-6 border-b border-gold/10 flex items-center justify-between">
        <Logo variant="light" className="h-8 w-auto" />
        {showClose && (
          <button aria-label="Close menu" onClick={onClose} className="text-ivory lg:hidden">
            <X size={22} />
          </button>
        )}
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                isActive ? 'bg-gold/20 text-softgold' : 'text-cream/70 hover:bg-brown/60 hover:text-ivory'
              }`
            }
          >
            <item.icon size={17} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium text-cream/70 hover:bg-brown/60 hover:text-ivory transition-colors"
        >
          <LogOut size={17} aria-hidden="true" />
          Logout
        </button>
      </nav>
    </div>
  )
}
