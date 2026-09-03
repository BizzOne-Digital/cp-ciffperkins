import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, User, Settings, LogOut, Menu, X } from 'lucide-react'
import Logo from '../../components/common/Logo'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

const NAV = [
  { to: '/customer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customer/bookings', label: 'My Bookings', icon: CalendarDays },
  { to: '/customer/profile', label: 'Profile', icon: User },
  { to: '/customer/settings', label: 'Account Settings', icon: Settings },
]

export default function CustomerLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { logout, user } = useAuth()
  const { success } = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    success('Logged out successfully.')
    navigate('/login')
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-6 py-6 border-b border-gold/10">
        <Logo variant="light" className="h-8 w-auto" />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setDrawerOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                isActive ? 'bg-gold/20 text-softgold' : 'text-cream/70 hover:bg-espresso/60 hover:text-ivory'
              }`
            }
          >
            <item.icon size={18} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium text-cream/70 hover:bg-espresso/60 hover:text-ivory transition-colors"
        >
          <LogOut size={18} aria-hidden="true" />
          Logout
        </button>
      </nav>
      {user && (
        <div className="px-6 py-4 border-t border-gold/10 text-xs text-cream/50">
          Signed in as <span className="text-cream/80">{user.email}</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-ivory flex">
      <aside className="hidden lg:block w-64 bg-espresso shrink-0">{SidebarContent}</aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-espresso/60" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-espresso">
            <div className="flex justify-end p-4">
              <button aria-label="Close menu" onClick={() => setDrawerOpen(false)} className="text-ivory">
                <X size={22} />
              </button>
            </div>
            {SidebarContent}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between px-4 py-4 bg-espresso">
          <Logo variant="light" className="h-7 w-auto" />
          <button aria-label="Open menu" onClick={() => setDrawerOpen(true)} className="text-ivory">
            <Menu size={24} />
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-8 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
