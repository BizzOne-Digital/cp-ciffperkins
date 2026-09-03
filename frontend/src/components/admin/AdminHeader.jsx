import React from 'react'
import { Menu } from 'lucide-react'
import Logo from '../common/Logo'

export default function AdminHeader({ onMenuClick, title }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-4 bg-ivory border-b border-gold/20 lg:hidden">
      <Logo className="h-7 w-auto" />
      <button aria-label="Open menu" onClick={onMenuClick} className="text-espresso">
        <Menu size={24} />
      </button>
    </header>
  )
}
