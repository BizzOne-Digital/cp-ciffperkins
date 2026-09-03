import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useToast } from '../../context/ToastContext'

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { logout } = useAdminAuth()
  const { success } = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    success('Logged out of admin panel.')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <aside className="hidden lg:block w-64 shrink-0">
        <AdminSidebar onLogout={handleLogout} />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-espresso/60" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72">
            <AdminSidebar
              onNavigate={() => setDrawerOpen(false)}
              onLogout={handleLogout}
              showClose
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuClick={() => setDrawerOpen(true)} />
        <main className="flex-1 p-4 sm:p-8 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
