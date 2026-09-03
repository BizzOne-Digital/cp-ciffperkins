import React from 'react'
import { Routes, Route } from 'react-router-dom'

import PublicLayout from './components/layout/PublicLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminProtectedRoute from './components/common/AdminProtectedRoute'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Products from './pages/Products'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'

import CustomerLayout from './pages/customer/CustomerLayout'
import CustomerDashboard from './pages/customer/Dashboard'
import MyBookings from './pages/customer/MyBookings'
import BookingDetail from './pages/customer/BookingDetail'
import Profile from './pages/customer/Profile'
import AccountSettings from './pages/customer/AccountSettings'

import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminServices from './pages/admin/Services'
import AdminBookings from './pages/admin/Bookings'
import AdminCustomers from './pages/admin/Customers'
import AdminGallery from './pages/admin/Gallery'
import AdminTestimonials from './pages/admin/Testimonials'
import AdminWebsiteContent from './pages/admin/WebsiteContent'
import AdminContactMessages from './pages/admin/ContactMessages'
import AdminSettings from './pages/admin/Settings'
import AdminProfile from './pages/admin/AdminProfile'

export default function App() {
  return (
    <Routes>
      {/* Public site + auth pages share the Navbar/Footer layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Customer portal */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="bookings/:id" element={<BookingDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<AccountSettings />} />
      </Route>

      {/* Admin login is standalone, not nested in AdminLayout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin dashboard */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="content" element={<AdminWebsiteContent />} />
        <Route path="messages" element={<AdminContactMessages />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
