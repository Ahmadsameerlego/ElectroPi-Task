/**
 * Composable for triggering toast notifications.
 * Placeholder for future UI feedback notifications.
 */
export function useToast() {
  return {
    show: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      console.log(`[Toast ${type}]: ${message}`)
    }
  }
}
