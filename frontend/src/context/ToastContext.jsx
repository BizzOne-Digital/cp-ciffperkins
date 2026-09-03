import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++idRef.current
    setToasts((t) => [...t, { id, message, type }])
    if (duration) {
      setTimeout(() => remove(id), duration)
    }
    return id
  }, [remove])

  const value = {
    showToast,
    success: (msg, d) => showToast(msg, 'success', d),
    error: (msg, d) => showToast(msg, 'error', d),
    info: (msg, d) => showToast(msg, 'info', d),
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-[90vw] max-w-sm">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info
          const colors =
            toast.type === 'success'
              ? 'border-l-4 border-gold bg-espresso text-ivory'
              : toast.type === 'error'
              ? 'border-l-4 border-red-500 bg-espresso text-ivory'
              : 'border-l-4 border-gold bg-espresso text-ivory'
          return (
            <div
              key={toast.id}
              role="status"
              className={`flex items-start gap-3 rounded-md shadow-lg px-4 py-3 ${colors}`}
            >
              <Icon size={18} className="mt-0.5 shrink-0 text-softgold" />
              <p className="text-sm flex-1">{toast.message}</p>
              <button
                aria-label="Dismiss notification"
                onClick={() => remove(toast.id)}
                className="text-ivory/60 hover:text-ivory"
              >
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
