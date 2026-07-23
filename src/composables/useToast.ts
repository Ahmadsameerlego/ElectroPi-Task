import { ref } from 'vue'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

// Global shared state for active toast notifications
const toasts = ref<ToastMessage[]>([])

/**
 * Composable for triggering toast notifications across the application.
 * Shares reactive state globally.
 */
export function useToast() {
  const addToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration = 4000
  ) => {
    const id = `toast-${Math.random().toString(36).substring(2, 9)}`
    toasts.value.push({ id, message, type, duration })

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration),
    remove: removeToast
  }
}
