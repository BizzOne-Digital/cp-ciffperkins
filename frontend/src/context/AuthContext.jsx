import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, CUSTOMER_TOKEN_KEY, getErrorMessage } from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadMe = useCallback(async () => {
    const token = localStorage.getItem(CUSTOMER_TOKEN_KEY)
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const res = await api.get('/auth/me')
      setUser(res.data?.data || null)
    } catch (err) {
      localStorage.removeItem(CUSTOMER_TOKEN_KEY)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMe()
  }, [loadMe])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token, data } = res.data
    localStorage.setItem(CUSTOMER_TOKEN_KEY, token)
    setUser(data)
    return data
  }

  const register = async (payload) => {
    const res = await api.post('/auth/register', payload)
    const { token, data } = res.data
    if (token) localStorage.setItem(CUSTOMER_TOKEN_KEY, token)
    setUser(data)
    return data
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      // ignore network errors on logout
    }
    localStorage.removeItem(CUSTOMER_TOKEN_KEY)
    setUser(null)
  }

  const updateProfile = async (formData) => {
    const res = await api.put('/auth/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    setUser(res.data?.data)
    return res.data?.data
  }

  const changePassword = async (payload) => {
    const res = await api.put('/auth/change-password', payload)
    return res.data
  }

  const forgotPassword = async (email) => {
    const res = await api.post('/auth/forgot-password', { email })
    return res.data
  }

  const resetPassword = async (tokenParam, password) => {
    const res = await api.post(`/auth/reset-password/${tokenParam}`, { password })
    return res.data
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    refresh: loadMe,
    getErrorMessage,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
