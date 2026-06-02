import { useState, useEffect, useCallback } from 'react'
import { X, AlertCircle, CheckCircle } from 'lucide-react'

type ToastType = 'error' | 'success'

interface ToastMessage {
  id: number
  type: ToastType
  message: string
}

let addToastFn: ((type: ToastType, message: string) => void) | null = null

export function toast(type: ToastType, message: string) {
  addToastFn?.(type, message)
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }, [])

  useEffect(() => {
    addToastFn = addToast
    return () => { addToastFn = null }
  }, [addToast])

  const remove = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm" role="alert" aria-live="polite">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border text-sm ${
            t.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-green-50 border-green-200 text-green-800'
          }`}
        >
          {t.type === 'error'
            ? <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
            : <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" />
          }
          <p className="flex-1">{t.message}</p>
          <button
            onClick={() => remove(t.id)}
            className="p-0.5 hover:opacity-70 flex-shrink-0"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
