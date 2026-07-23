import { ref } from 'vue'

interface ConfirmOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'primary' | 'danger'
}

// Global shared state for the confirmation modal
const isOpen = ref<boolean>(false)
const title = ref<string>('Confirm Action')
const message = ref<string>('Are you sure you want to perform this action?')
const confirmText = ref<string>('Confirm')
const cancelText = ref<string>('Cancel')
const variant = ref<'primary' | 'danger'>('primary')
let resolvePromise: ((value: boolean) => void) | null = null

/**
 * Promise-based confirmation dialog composable.
 * Displays a global modal programmatically and resolves true on confirm and false on cancel.
 */
export function useConfirm() {
  const confirm = (options?: ConfirmOptions): Promise<boolean> => {
    title.value = options?.title || 'Confirm Action'
    message.value = options?.message || 'Are you sure you want to perform this action?'
    confirmText.value = options?.confirmText || 'Confirm'
    cancelText.value = options?.cancelText || 'Cancel'
    variant.value = options?.variant || 'primary'
    isOpen.value = true

    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve
    })
  }

  const accept = () => {
    isOpen.value = false
    if (resolvePromise) {
      resolvePromise(true)
      resolvePromise = null
    }
  }

  const cancel = () => {
    isOpen.value = false
    if (resolvePromise) {
      resolvePromise(false)
      resolvePromise = null
    }
  }

  return {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    variant,
    confirm,
    accept,
    cancel
  }
}
