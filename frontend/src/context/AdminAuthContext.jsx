import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { adminApi, ADMIN_TOKEN_KEY, getErrorMessage } from '../utils/api'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadMe = useCallback(async () => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY)
    if (!token) {
      setAdmin(null)
      setLoading(false)
      return
    }
    try {
      const res = await adminApi.get('/auth/admin/me')
      setAdmin(res.data?.data || null)
    } catch (err) {
      localStorage.removeItem(ADMIN_TOKEN_KEY)
      setAdmin(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMe()
  }, [loadMe])

  const login = async (email, password) => {
    const res = await adminApi.post('/auth/admin/login', { email, password })
    const { token, data } = res.data
    localStorage.setItem(ADMIN_TOKEN_KEY, token)
    setAdmin(data)
    return data
  }

  const logout = async () => {
    try {
      await adminApi.post('/auth/logout')
    } catch (err) {
      // ignore
    }
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    setAdmin(null)
  }

  const value = {
    admin,
    loading,
    isAuthenticated: !!admin,
    login,
    logout,
    refresh: loadMe,
    getErrorMessage,
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
